'use client';
import { useEffect } from 'react';
import { 
  Store, 
  TrendingUp, 
  Package, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Check
} from 'lucide-react';
import { DEMO_USER } from '../../lib/demo/config';
import { sendVisitorAlert } from '../../lib/notify';

interface DemoLoginScreenProps {
  submitting: boolean;
  onStart: () => void;
}

export function DemoLoginScreen({ submitting, onStart }: DemoLoginScreenProps) {
  useEffect(() => {
    sendVisitorAlert({ event: 'page_view', page: '/login', details: 'Vitrin Tanıtım Ekranı' });
  }, []);

  const features = [
    {
      icon: Store,
      title: 'Çok Kanallı Pazaryeri Entegrasyonu',
      desc: 'Amazon, eBay, Trendyol, Shopify, Hepsiburada ve özel ERP sistemleri tek merkezde eşzamanlı çalışır.',
    },
    {
      icon: TrendingUp,
      title: 'Net Kârlılık & Finansal Analitik (P&L)',
      desc: 'Sipariş bazında pazar yeri komisyonu, kargo bedeli, reklam harcaması ve net kâr anlık hesaplanır.',
    },
    {
      icon: Package,
      title: 'Akıllı Stok & Lojistik Optimizasyonu',
      desc: 'Çok depolu canlı stok, emniyet seviyeleri, koli matrisleri ve araç fitment eşleştirmeleri.',
    },
    {
      icon: FileText,
      title: 'Resmi E-Fatura, İrsaliye & Cari Defter',
      desc: 'GİB e-arşiv, e-fatura, e-irsaliye, cari hesap mutabakatları ve tek düzen hesap planı takibi.',
    },
  ];

  const platforms = [
    'Amazon', 'Trendyol', 'Shopify', 'Hepsiburada', 'eBay', 
    'BaseLinker', 'Sentos', 'Logo', 'Mikro', 'WhatsApp'
  ];

  return (
    <main className="min-h-screen w-full bg-[#f6f6f7] text-zinc-900 selection:bg-black selection:text-white dark:bg-[#0b0c0e] dark:text-zinc-100 flex flex-col justify-between">
      
      {/* Shopify Style Top Minimal Nav */}
      <header className="w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md px-6 py-4 dark:border-zinc-800/80 dark:bg-[#121316]/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xs font-black tracking-widest text-white dark:bg-white dark:text-black">
              E
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-zinc-900 dark:text-white">
                EVREKA
              </span>
              <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-extrabold tracking-widest text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                ERP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
              Demo Sürümü
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <div className="mx-auto my-auto w-full max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Platform Narrative */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            
            <div className="space-y-3">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                E-Ticaret &amp; Operasyon Yönetim Sistemi
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-zinc-950 dark:text-white leading-[1.15]">
                Operasyon, stok ve finans tek bir merkezde.
              </h1>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base max-w-xl">
                Evreka ERP; pazaryeri hesaplarınızı, lojistik operasyonlarınızı, e-fatura akışlarınızı ve kârlılık
                analitiklerinizi tek bir çatı altında birleştiren modern kurumsal e-ticaret platformudur.
              </p>
            </div>

            {/* Feature Cards Grid (Monochrome) */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {features.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col gap-2 rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#15171c] dark:hover:border-zinc-700"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                      <item.icon size={15} />
                    </div>
                    <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h2>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Integrated Platform Pills */}
            <div className="space-y-2 border-t border-zinc-200/80 pt-6 dark:border-zinc-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                Desteklenen Entegrasyonlar
              </span>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p, i) => (
                  <span 
                    key={i} 
                    className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Shopify-Style Clean Login Box */}
          <div className="flex justify-center lg:col-span-5">
            <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-[#15171c] sm:p-9">
              <div className="flex flex-col gap-6">
                
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                    Yönetici Girişi
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Demo hesabıyla sistemi canlı simülasyon ortamında test edin.
                  </p>
                </div>

                {/* Account Details Box */}
                <div className="rounded-xl border border-zinc-200/80 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900 flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                    EA
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Evreka Admin</span>
                      <span className="rounded bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-bold text-zinc-700 dark:text-zinc-300">
                        Tam Yetki
                      </span>
                    </div>
                    <span className="truncate text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{DEMO_USER.email}</span>
                  </div>
                </div>

                {/* Primary Button */}
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    sendVisitorAlert({ event: 'demo_login', page: '/login', details: 'Demo Hesabıyla Panele Giriş Yapıldı' });
                    onStart();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  <span>{submitting ? 'Giriş Yapılıyor…' : 'Demo Hesabıyla Giriş Yap'}</span>
                  <ArrowRight size={16} />
                </button>

                {/* Checklist */}
                <div className="space-y-2 border-t border-zinc-200/80 pt-5 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-zinc-900 dark:text-zinc-100 shrink-0" />
                    <span>Backend veya veritabanı kurulumu gerekmez</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-zinc-900 dark:text-zinc-100 shrink-0" />
                    <span>Zengin kurgusal sipariş ve stok veri seti</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-zinc-900 dark:text-zinc-100 shrink-0" />
                    <span>Tek tıkla tüm yetkili modüllere tam erişim</span>
                  </div>
                </div>

                <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 pt-2">
                  Evreka ERP &bull; Bulut Tabanlı E-Ticaret Yönetim Platformu
                </p>

              </div>
            </section>
          </div>

        </div>
      </div>

      {/* Simple Monochrome Footer */}
      <footer className="w-full border-t border-zinc-200/60 bg-white/50 px-6 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800/60 dark:bg-transparent dark:text-zinc-500">
        &copy; {new Date().getFullYear()} Evreka ERP &bull; Yel LLC. Tüm hakları saklıdır.
      </footer>

    </main>
  );
}
