import { NextRequest, NextResponse } from 'next/server';

interface TelemetryPayload {
  event: 'page_view' | 'demo_login' | 'custom';
  page?: string;
  details?: string;
}

function parseDevice(ua: string): string {
  if (/mobile/i.test(ua)) {
    if (/iphone/i.test(ua)) return 'iPhone (iOS)';
    if (/android/i.test(ua)) return 'Android Mobil';
    return 'Mobil Cihaz';
  }
  if (/macintosh|mac os x/i.test(ua)) return 'Mac (macOS)';
  if (/windows/i.test(ua)) return 'PC (Windows)';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Masaüstü / Bilinmiyor';
}

function parseBrowser(ua: string): string {
  if (/edg/i.test(ua)) return 'Microsoft Edge';
  if (/chrome|crios/i.test(ua) && !/opr|opera/i.test(ua)) return 'Google Chrome';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  if (/firefox|fxios/i.test(ua)) return 'Mozilla Firefox';
  if (/opr|opera/i.test(ua)) return 'Opera';
  return 'Tarayıcı';
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as TelemetryPayload;
    const { event = 'page_view', page = '/', details = '' } = body;

    // Vercel Edge / Serverless otomatik coğrafi konum başlıkları
    const country = req.headers.get('x-vercel-ip-country') || 'TR';
    const city = req.headers.get('x-vercel-ip-city') || 'Belirtilmedi';
    const countryRegion = req.headers.get('x-vercel-ip-country-region') || '';
    const userAgent = req.headers.get('user-agent') || '';
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Gizli/Lokal';

    const device = parseDevice(userAgent);
    const browser = parseBrowser(userAgent);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Olay başlığı
    let eventTitle = 'Sayfa Ziyareti';
    let eventIcon = '👀';
    if (event === 'demo_login') {
      eventTitle = 'Demo Hesabıyla Giriş Yapıldı!';
      eventIcon = '🚀';
    } else if (event === 'custom') {
      eventTitle = details || 'Özel Eylem';
      eventIcon = '⚡';
    }

    const now = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
    const locationStr = decodeURIComponent(city) + (countryRegion ? ` (${countryRegion})` : '') + `, ${country}`;

    const text = [
      `${eventIcon} *Evreka ERP — ${eventTitle}*`,
      ``,
      `📍 *Konum:* ${locationStr}`,
      `💻 *Cihaz:* ${device} • ${browser}`,
      `🌐 *Sayfa:* \`${page}\``,
      `⏰ *Saat:* ${now}`,
      ip !== 'Gizli/Lokal' ? `🔍 *IP:* \`${ip}\`` : null,
    ].filter(Boolean).join('\n');

    // Eğer Telegram değişkenleri Vercel ortamında tanımlıysa mesaj gönder
    if (botToken && chatId) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      }).catch((err) => {
        console.error('Telegram notification error:', err);
      });
    }

    return NextResponse.json({ ok: true, location: locationStr });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
