'use client';

import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { DEMO_USER } from '../../lib/demo/config';
import { sendVisitorAlert } from '../../lib/notify';

interface DemoLoginScreenProps {
  submitting: boolean;
  onStart: () => void;
}

export function DemoLoginScreen({ submitting, onStart }: DemoLoginScreenProps) {
  useEffect(() => {
    sendVisitorAlert({ event: 'page_view', page: '/login', details: 'Vitrin Tanıtım & Login Ekranı' });
  }, []);

  const handleStartDemo = () => {
    sendVisitorAlert({ event: 'demo_login', page: '/login', details: 'Demo Hesabıyla Panele Giriş Yapıldı' });
    onStart();
  };

  const modules = [
    {
      index: '01',
      title: 'Çok Kanallı Entegrasyon',
      desc: 'Amazon, Trendyol, Shopify, Hepsiburada ve eBay siparişleri tek merkezde toplanır ve barkodlanır.',
    },
    {
      index: '02',
      title: 'Net Kârlılık Analitiği (P&L)',
      desc: 'Sipariş satır bazında pazar yeri komisyonu, navlun, kargo ve reklam giderleri düşülerek anlık net marj hesaplanır.',
    },
    {
      index: '03',
      title: 'Akıllı Stok & Lojistik',
      desc: 'Çok depolu anlık stok eşitlemesi, kritik emniyet seviyeleri ve koli matrisleri ile stok kaçaklarını önler.',
    },
    {
      index: '04',
      title: 'Resmi E-Fatura & Cari Defter',
      desc: 'GİB standartlarında e-arşiv, e-fatura, e-irsaliye ve tek düzen hesap planı cari mutabakatları.',
    },
  ];

  const platforms = [
    'Amazon', 'Trendyol', 'Shopify', 'Hepsiburada', 'eBay', 
    'BaseLinker', 'Sentos', 'Logo', 'Mikro', 'WhatsApp'
  ];

  return (
    <main className="min-h-screen w-full bg-[#fbfbfb] text-zinc-900 selection:bg-zinc-950 selection:text-white dark:bg-[#09090b] dark:text-zinc-100 flex flex-col justify-between">
      
      {/* 1. Ultra-Minimal Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md px-6 py-4 dark:border-zinc-800/80 dark:bg-[#09090b]/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          
          {/* Logo & Product Tag */}
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-950 text-xs font-black tracking-widest text-white dark:bg-white dark:text-zinc-950">
              E
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-wider text-zinc-950 dark:text-white">
                EVREKA
              </span>
              <span className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                ERP
              </span>
            </div>
          </div>

          {/* Right Status & Direct Action */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse" />
              Demo Modu
            </span>
            <button
              type="button"
              disabled={submitting}
              onClick={handleStartDemo}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <span>{submitting ? 'Giriş Yapılıyor…' : 'Panele Giriş Yap'}</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Hero & Cockpit Section */}
      <div className="mx-auto my-auto w-full max-w-6xl px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Hero Left Column */}
          <div className="flex flex-col gap-7 lg:col-span-7">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-zinc-700 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                Bulut Tabanlı E-Ticaret İşletim Sistemi
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-zinc-950 dark:text-white leading-[1.14]">
                Operasyon, stok ve finans <br className="hidden sm:inline" />
                <span className="text-zinc-400 dark:text-zinc-500 font-bold">tek bir merkezde.</span>
              </h1>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base max-w-xl">
                Evreka ERP; Amazon, Trendyol, Shopify ve eBay gibi tüm satış kanallarınızı konsolide eden, sipariş bazlı net kârlılık (P&amp;L) analitiği ve akıllı stok optimizasyonu sunan kurumsal yönetim platformudur.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={submitting}
                onClick={handleStartDemo}
                className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <span>{submitting ? 'Giriş Yapılıyor…' : 'Demo Hesabıyla Giriş Yap'}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-400 dark:text-zinc-600">&bull;</span>
                <span>Kurulum gerekmez</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-400 dark:text-zinc-600">&bull;</span>
                <span>Tam yetkili yönetici erişimi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-400 dark:text-zinc-600">&bull;</span>
                <span>Canlı veri simülasyonu</span>
              </div>
            </div>

            {/* Platform Badges */}
            <div className="space-y-2.5 border-t border-zinc-200/80 pt-6 dark:border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
                Desteklenen Entegrasyonlar
              </span>
              <div className="flex flex-wrap gap-1.5">
                {platforms.map((platform, i) => (
                  <span 
                    key={i} 
                    className="rounded-md border border-zinc-200/80 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Hero Right Column: Cockpit Teaser & Login Box */}
          <div className="flex justify-center lg:col-span-5">
            <section className="w-full max-w-md rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#111215] sm:p-7 space-y-5">
              
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse" />
                  <span className="text-xs font-bold tracking-tight text-zinc-950 dark:text-white">Canlı Sistem Telemetrisi</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Simülasyon</span>
              </div>

              {/* KPI Snapshot (Strict Monochrome) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Net Kâr (P&amp;L)</span>
                  <span className="text-base font-extrabold tracking-tight text-zinc-950 dark:text-white mt-1 block">₺842.500</span>
                  <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 inline-block">&uarr; +18.4% bu ay</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Aylık Sipariş</span>
                  <span className="text-base font-extrabold tracking-tight text-zinc-950 dark:text-white mt-1 block">1.420 Adet</span>
                  <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 inline-block">8 aktif kanal</span>
                </div>
              </div>

              {/* Channel Share Monochrome Visual Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                  <span>Kanal Ciro Dağılımı</span>
                  <span className="font-mono text-[10px] text-zinc-500">Amazon %42 &bull; Trendyol %35 &bull; Shopify %23</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 flex overflow-hidden">
                  <div className="bg-zinc-950 dark:bg-white h-full" style={{ width: '42%' }} />
                  <div className="bg-zinc-600 dark:bg-zinc-400 h-full" style={{ width: '35%' }} />
                  <div className="bg-zinc-300 dark:bg-zinc-600 h-full" style={{ width: '23%' }} />
                </div>
              </div>

              {/* Account Details Box */}
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-3.5 dark:border-zinc-800/70 dark:bg-zinc-900/70 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white dark:bg-white dark:text-zinc-950 shrink-0">
                  EA
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Evreka Admin</span>
                    <span className="rounded bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-bold text-zinc-700 dark:text-zinc-300">
                      Tam Yetki
                    </span>
                  </div>
                  <span className="truncate text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">{DEMO_USER.email}</span>
                </div>
              </div>

              {/* Cockpit One-Click Entry */}
              <button
                type="button"
                disabled={submitting}
                onClick={handleStartDemo}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <span>{submitting ? 'Giriş Yapılıyor…' : 'Panele Tek Tıkla Bağlan'}</span>
                <ArrowRight size={14} />
              </button>

              <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-500 pt-1">
                Evreka ERP &bull; Bulut Tabanlı E-Ticaret Yönetim Platformu
              </p>

            </section>
          </div>

        </div>

        {/* 3. Core Architectural Modules (Pure Typography & Numbering) */}
        <div className="mt-16 pt-12 border-t border-zinc-200/80 dark:border-zinc-800 space-y-6">
          <div className="flex flex-col gap-1 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Temel Modüller
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              E-Ticaretin tüm operasyonel aşamaları tek konsolda.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((item, idx) => (
              <div 
                key={idx}
                className="flex flex-col gap-2.5 rounded-xl border border-zinc-200/80 bg-white p-5 shadow-2xs transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#111215] dark:hover:border-zinc-700"
              >
                <div className="flex items-center justify-between pb-1 border-b border-zinc-100 dark:border-zinc-800/80">
                  <span className="font-mono text-xs font-black text-zinc-950 dark:text-white">
                    {item.index}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-1">{item.title}</h3>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Clean Monochrome Footer */}
      <footer className="w-full border-t border-zinc-200/80 bg-white/60 px-6 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800/80 dark:bg-transparent dark:text-zinc-500">
        &copy; {new Date().getFullYear()} Evreka ERP &bull; Yel LLC. Tüm hakları saklıdır.
      </footer>

    </main>
  );
}
