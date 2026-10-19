import { NextResponse } from 'next/server';
import { getTelemetryReport } from '../../../../lib/telemetry-store';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8229787881:AAH_qsPPtupQim2vNSL5N66DmRWbwj-56p0';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '5904559271';

export async function GET() {
  try {
    const rep = await getTelemetryReport();
    const dateStr = new Date().toLocaleDateString('tr-TR');

    const text = [
      `🌙 *Evreka ERP — Gün Sonu Otomatik Özeti*`,
      `📅 *Tarih:* ${dateStr}`,
      ``,
      `👥 *Bugünkü Toplam Ziyaretçi:* \`${rep.todayViews}\` kişi`,
      `🚀 *Demo Butonuna Tıklayanlar:* \`${rep.todayDemo}\` kişi`,
      `🎯 *Demo Dönüşüm Oranı:* \`${rep.conversionRate}\``,
      `🗓️ *Bu Ay Toplam Ziyaret:* \`${rep.monthViews}\``,
      ``,
      `📱 *Günün Cihaz Trendi:*`,
      rep.topDevices.length > 0 
        ? rep.topDevices.slice(0, 3).map(([d, c]) => `  • ${d}: ${c}`).join('\n')
        : `  • Veri yok`,
      ``,
      `İyi akşamlar dileriz! 🚀`,
    ].join('\n');

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });

    return NextResponse.json({ ok: true, sentTo: CHAT_ID });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
