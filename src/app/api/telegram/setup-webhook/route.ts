import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8229787881:AAH_qsPPtupQim2vNSL5N66DmRWbwj-56p0';

export async function GET(req: NextRequest) {
  try {
    const host = req.headers.get('host') || '';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    
    // Kullanıcı query ile özel URL belirtebilir, yoksa mevcut host'u kullanır
    const customUrl = req.nextUrl.searchParams.get('url');
    const webhookUrl = customUrl || `${protocol}://${host}/api/telegram/webhook`;

    if (webhookUrl.includes('localhost')) {
      return NextResponse.json({
        ok: false,
        message: 'Telegram localhost adreslerine webhook kuramaz. Projeyi Vercel\'e yükledikten sonra bu linki canlı alan adınla çağır veya ?url=https://senin-siten.vercel.app/api/telegram/webhook parametresi ile çalıştır.',
      }, { status: 400 });
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
    const data = await tgRes.json();

    return NextResponse.json({
      ok: true,
      registeredWebhook: webhookUrl,
      telegramResponse: data,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
