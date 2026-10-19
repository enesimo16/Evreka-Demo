import { track } from '@vercel/analytics';

interface VisitorAlertOptions {
  event: 'page_view' | 'demo_login' | 'custom';
  page?: string;
  details?: string;
}

/**
 * Ziyaretçi hareketini Vercel Analytics ve Telegram Webhook'a arka planda sessizce iletir.
 * Kullanıcı arayüzünü asla bekletmez veya hata durumunda kullanıcıyı etkilemez.
 */
export function sendVisitorAlert({ event, page, details }: VisitorAlertOptions): void {
  try {
    const currentPath = page || (typeof window !== 'undefined' ? window.location.pathname : '/');

    // 1. Vercel Web Analytics Custom Event
    track(event, {
      path: currentPath,
      ...(details ? { details } : {}),
    });

    // 2. Telegram Webhook Bildirimi (API Route üzerinden Vercel Edge lokasyon bilgisiyle)
    if (typeof window !== 'undefined') {
      fetch('/api/telemetry/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          page: currentPath,
          details,
        }),
      }).catch(() => {
        // Sessiz hata yakalama (UI etkilenmez)
      });
    }
  } catch {
    // noop
  }
}
