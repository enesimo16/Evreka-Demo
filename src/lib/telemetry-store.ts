/**
 * Evreka ERP — Sunucusuz (Serverless) Telemetri ve İstatistik Deposu
 *
 * Upstash Redis / Vercel KV bağlıysa kalıcı depolar;
 * Değilse bellek içi (in-memory) global fall-back ile çalışır.
 * Sıfır hata garantisi, sunucu çökmelerine karşı dayanıklı.
 */

export interface VisitorLogItem {
  id: string;
  event: 'page_view' | 'demo_login' | 'custom';
  page: string;
  details?: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  ip: string;
  timestamp: string; // ISO string
  formattedTime: string; // tr-TR format
}

// In-Memory Global Store (Vercel Cold Start / Local Dev için)
interface MemoryStore {
  events: VisitorLogItem[];
  dailyViews: Record<string, number>;
  dailyDemo: Record<string, number>;
  monthlyViews: Record<string, number>;
  devices: Record<string, number>;
  cities: Record<string, number>;
}

const g = globalThis as unknown as { __evreka_telemetry?: MemoryStore };
if (!g.__evreka_telemetry) {
  g.__evreka_telemetry = {
    events: [],
    dailyViews: {},
    dailyDemo: {},
    monthlyViews: {},
    devices: {},
    cities: {},
  };
}

const mem = g.__evreka_telemetry;

// KV REST Helpers (Upstash / Vercel KV)
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function kvCommand(command: string[]): Promise<unknown> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/${command.map((c) => encodeURIComponent(c)).join('/')}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: 'no-store',
    });
    const json = (await res.json().catch(() => null)) as { result?: unknown } | null;
    return json?.result ?? null;
  } catch {
    return null;
  }
}

/** Yeni bir ziyaret veya eylem kaydeder */
export async function recordTelemetryEvent(item: VisitorLogItem): Promise<void> {
  const dateKey = item.timestamp.slice(0, 10); // YYYY-MM-DD
  const monthKey = item.timestamp.slice(0, 7); // YYYY-MM

  // 1. Bellek içi güncelleme
  mem.events.unshift(item);
  if (mem.events.length > 200) mem.events.pop(); // son 200 kaydı tut

  mem.dailyViews[dateKey] = (mem.dailyViews[dateKey] || 0) + 1;
  mem.monthlyViews[monthKey] = (mem.monthlyViews[monthKey] || 0) + 1;
  mem.devices[item.device] = (mem.devices[item.device] || 0) + 1;

  if (item.city && item.city !== 'Belirtilmedi') {
    const loc = `${item.city}, ${item.country}`;
    mem.cities[loc] = (mem.cities[loc] || 0) + 1;
  }

  if (item.event === 'demo_login') {
    mem.dailyDemo[dateKey] = (mem.dailyDemo[dateKey] || 0) + 1;
  }

  // 2. Vercel KV / Upstash bağlıysa buluta yaz
  if (KV_URL && KV_TOKEN) {
    void Promise.allSettled([
      kvCommand(['INCR', `stats:daily:${dateKey}`]),
      kvCommand(['INCR', `stats:monthly:${monthKey}`]),
      kvCommand(['HINCRBY', 'stats:devices', item.device, '1']),
      item.city && item.city !== 'Belirtilmedi'
        ? kvCommand(['HINCRBY', 'stats:cities', `${item.city}, ${item.country}`, '1'])
        : Promise.resolve(),
      item.event === 'demo_login' ? kvCommand(['INCR', `stats:demo:${dateKey}`]) : Promise.resolve(),
      kvCommand(['LPUSH', 'stats:recent_events', JSON.stringify(item)]),
      kvCommand(['LTRIM', 'stats:recent_events', '0', '199']),
    ]);
  }
}

/** Bugünün ve genel istatistikleri döner */
export async function getTelemetryReport(): Promise<{
  todayViews: number;
  todayDemo: number;
  monthViews: number;
  conversionRate: string;
  topDevices: [string, number][];
  topCities: [string, number][];
  totalLogged: number;
}> {
  const now = new Date();
  const dateKey = now.toISOString().slice(0, 10);
  const monthKey = now.toISOString().slice(0, 7);

  let todayViews = mem.dailyViews[dateKey] || 0;
  let todayDemo = mem.dailyDemo[dateKey] || 0;
  let monthViews = mem.monthlyViews[monthKey] || 0;

  // KV varsa oradan daha doğru veri çek
  if (KV_URL && KV_TOKEN) {
    const [kvToday, kvDemo, kvMonth] = await Promise.all([
      kvCommand(['GET', `stats:daily:${dateKey}`]),
      kvCommand(['GET', `stats:demo:${dateKey}`]),
      kvCommand(['GET', `stats:monthly:${monthKey}`]),
    ]);
    if (typeof kvToday === 'string' || typeof kvToday === 'number') todayViews = Number(kvToday);
    if (typeof kvDemo === 'string' || typeof kvDemo === 'number') todayDemo = Number(kvDemo);
    if (typeof kvMonth === 'string' || typeof kvMonth === 'number') monthViews = Number(kvMonth);
  }

  const rate = todayViews > 0 ? ((todayDemo / todayViews) * 100).toFixed(1) : '0';

  const topDevices = Object.entries(mem.devices)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topCities = Object.entries(mem.cities)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    todayViews,
    todayDemo,
    monthViews,
    conversionRate: `%${rate}`,
    topDevices,
    topCities,
    totalLogged: mem.events.length,
  };
}

/** Son gerçekleşen canlı hareketleri döner */
export async function getRecentActivity(limit = 6): Promise<VisitorLogItem[]> {
  if (KV_URL && KV_TOKEN) {
    const raw = (await kvCommand(['LRANGE', 'stats:recent_events', '0', String(limit - 1)])) as string[] | null;
    if (Array.isArray(raw) && raw.length > 0) {
      try {
        return raw.map((r) => JSON.parse(r) as VisitorLogItem);
      } catch {
        // fallback to memory
      }
    }
  }
  return mem.events.slice(0, limit);
}

/** Sadece demo butonuna basanları filtreler */
export async function getDemoVisitors(limit = 6): Promise<VisitorLogItem[]> {
  const all = await getRecentActivity(50);
  return all.filter((e) => e.event === 'demo_login').slice(0, limit);
}
