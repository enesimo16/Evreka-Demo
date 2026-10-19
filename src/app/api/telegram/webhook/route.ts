import { NextRequest, NextResponse } from 'next/server';
import { 
  getTelemetryReport, 
  getRecentActivity, 
  getDemoVisitors 
} from '../../../../lib/telemetry-store';

interface TelegramMessage {
  message_id: number;
  chat: { id: number | string };
  text?: string;
  from?: { id: number | string; first_name?: string; username?: string };
}

interface TelegramCallbackQuery {
  id: string;
  from: { id: number | string };
  message?: TelegramMessage;
  data?: string;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8229787881:AAH_qsPPtupQim2vNSL5N66DmRWbwj-56p0';
const ALLOWED_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '5904559271';

async function sendTelegramReply(chatId: string | number, text: string, replyMarkup?: unknown) {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        reply_markup: replyMarkup,
      }),
    });
  } catch (err) {
    console.error('Failed to send telegram reply:', err);
  }
}

// Telegram İnteraktif Hızlı Menü Butonları
const MAIN_KEYBOARD = {
  inline_keyboard: [
    [
      { text: '📊 Genel Rapor', callback_data: 'cmd_stats' },
      { text: '🟢 Bugünün Özeti', callback_data: 'cmd_today' },
    ],
    [
      { text: '🚀 Demo Girişleri', callback_data: 'cmd_demo' },
      { text: '👀 Canlı Son Hareketler', callback_data: 'cmd_live' },
    ],
    [
      { text: '📱 Cihaz Dağılımı', callback_data: 'cmd_devices' },
      { text: '🌍 Konumlar', callback_data: 'cmd_geo' },
    ],
    [
      { text: '🏓 Sistem Durumu (Ping)', callback_data: 'cmd_ping' },
    ],
  ],
};

export async function POST(req: NextRequest) {
  try {
    const update = (await req.json().catch(() => ({}))) as TelegramUpdate;

    const message = update.message;
    const callback = update.callback_query;

    const chatId = String(message?.chat?.id || callback?.message?.chat?.id || '');
    const userMessage = (message?.text || callback?.data || '').trim().toLowerCase();

    // Güvenlik Kontrolü: Bot yalnızca izin verilen sahibine yanıt verir!
    if (chatId !== String(ALLOWED_CHAT_ID) && chatId !== '5904559271') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 200 });
    }

    // Komut veya Buton Ayrıştırma
    if (userMessage === '/start' || userMessage === '/help' || userMessage === 'menu' || userMessage === 'yardım') {
      const welcome = [
        `👋 *Evreka ERP Asistanına Hoş Geldin Enes!*`,
        ``,
        `Evreka ERP'nin tüm ziyaretçi hareketlerini, demo dönüşümlerini ve cihaz analitiklerini buradan canlı olarak sorgulayabilirsin.`,
        ``,
        `Aşağıdaki butonları kullanarak hemen rapor alabilirsin 👇`,
      ].join('\n');
      await sendTelegramReply(chatId, welcome, MAIN_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    if (userMessage === '/stats' || userMessage === '/rapor' || userMessage === 'cmd_stats' || userMessage.includes('istatistik')) {
      const rep = await getTelemetryReport();
      const text = [
        `📊 *Evreka ERP — Genel Ziyaretçi Raporu*`,
        ``,
        `🟢 *Bugün Ziyaret:* \`${rep.todayViews}\` kişi`,
        `🚀 *Bugün Demo Girişi:* \`${rep.todayDemo}\` kişi`,
        `📈 *Demo Dönüşüm Oranı:* \`${rep.conversionRate}\``,
        `🗓️ *Bu Ay Toplam:* \`${rep.monthViews}\` görüntüleme`,
        ``,
        `📱 *En Çok Kullanılan Cihazlar:*`,
        rep.topDevices.length > 0 
          ? rep.topDevices.map(([d, c]) => `  • ${d}: ${c} ziyaret`).join('\n')
          : `  • Henüz veri birikmedi`,
        ``,
        `🌍 *Öne Çıkan Konumlar:*`,
        rep.topCities.length > 0
          ? rep.topCities.map(([loc, c]) => `  • ${loc}: ${c} kişi`).join('\n')
          : `  • Henüz konum verisi birikmedi`,
      ].join('\n');
      await sendTelegramReply(chatId, text, MAIN_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    if (userMessage === '/today' || userMessage === '/bugun' || userMessage === 'cmd_today' || userMessage.includes('bugün')) {
      const rep = await getTelemetryReport();
      const text = [
        `🟢 *Bugünün Özeti (${new Date().toLocaleDateString('tr-TR')})*`,
        ``,
        `👥 *Toplam Sayfa Girişi:* \`${rep.todayViews}\``,
        `🚀 *Demo Butonuna Basanlar:* \`${rep.todayDemo}\``,
        `🎯 *Dönüşüm Oranı:* \`${rep.conversionRate}\``,
        ``,
        rep.todayViews === 0 
          ? `Bugün henüz yeni bir ziyaretçi kaydı düşmedi.`
          : `Tebrikler! Bugün gelen ziyaretçilerin ${rep.conversionRate} kadarı demoyu deneyimledi.`,
      ].join('\n');
      await sendTelegramReply(chatId, text, MAIN_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    if (userMessage === '/demo' || userMessage === 'cmd_demo' || userMessage.includes('demo')) {
      const demos = await getDemoVisitors(6);
      if (demos.length === 0) {
        await sendTelegramReply(chatId, `🚀 Henüz "Demo Hesabıyla Giriş Yap" butonuna basan kayıt bulunamadı.`, MAIN_KEYBOARD);
        return NextResponse.json({ ok: true });
      }

      const text = [
        `🚀 *Son Demo Girişleri (Yüksek Potansiyelli Kullanıcılar)*`,
        ``,
        ...demos.map((d, i) => 
          `${i + 1}. *${d.city}, ${d.country}*\n   💻 ${d.device} • ${d.browser}\n   ⏰ ${d.formattedTime}`
        ),
      ].join('\n\n');

      await sendTelegramReply(chatId, text, MAIN_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    if (userMessage === '/live' || userMessage === '/canli' || userMessage === 'cmd_live' || userMessage.includes('canlı')) {
      const recent = await getRecentActivity(6);
      if (recent.length === 0) {
        await sendTelegramReply(chatId, `👀 Henüz canlı hareket kaydı bulunamadı.`, MAIN_KEYBOARD);
        return NextResponse.json({ ok: true });
      }

      const text = [
        `👀 *Canlı Ziyaretçi Akışı (Son 6 Hareket)*`,
        ``,
        ...recent.map((r) => {
          const icon = r.event === 'demo_login' ? '🚀' : '👀';
          const name = r.event === 'demo_login' ? 'Demo Girişi' : 'Sayfa Gezintisi';
          return `${icon} *${name}* — ${r.formattedTime}\n   📍 ${r.city}, ${r.country}\n   💻 ${r.device} | ${r.page}`;
        }),
      ].join('\n\n');

      await sendTelegramReply(chatId, text, MAIN_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    if (userMessage === '/devices' || userMessage === '/cihazlar' || userMessage === 'cmd_devices') {
      const rep = await getTelemetryReport();
      const text = [
        `📱 *Cihaz ve Tarayıcı Dağılımı*`,
        ``,
        rep.topDevices.length > 0 
          ? rep.topDevices.map(([d, c]) => `• *${d}:* ${c} oturum`).join('\n')
          : `Henüz cihaz kaydı birikmedi.`,
      ].join('\n');
      await sendTelegramReply(chatId, text, MAIN_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    if (userMessage === '/geo' || userMessage === '/konumlar' || userMessage === 'cmd_geo') {
      const rep = await getTelemetryReport();
      const text = [
        `🌍 *Coğrafi Konum Dağılımı*`,
        ``,
        rep.topCities.length > 0 
          ? rep.topCities.map(([loc, c]) => `• *${loc}:* ${c} ziyaret`).join('\n')
          : `Henüz konum kaydı birikmedi.`,
      ].join('\n');
      await sendTelegramReply(chatId, text, MAIN_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    if (userMessage === '/ping' || userMessage === 'cmd_ping') {
      const nowStr = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
      const text = `🏓 *Pong!*\n\nEvreka ERP Telemetri & Bot Servisi Vercel üzerinde aktif.\n⏰ Sistem Saati: ${nowStr}\n⚡ Durum: Çalışıyor`;
      await sendTelegramReply(chatId, text, MAIN_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    // Bilinmeyen metin gelirse menüyü göster
    await sendTelegramReply(
      chatId,
      `❓ Bu komutu anlayamadım. Aşağıdaki menüden dilediğin sorguyu seçebilirsin:`,
      MAIN_KEYBOARD
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Telegram webhook handler error:', err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
