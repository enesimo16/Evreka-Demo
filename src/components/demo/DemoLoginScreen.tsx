'use client';

import { 
  Sparkles, 
  Store, 
  TrendingUp, 
  Package, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { DEMO_USER } from '../../lib/demo/config';

interface DemoLoginScreenProps {
  submitting: boolean;
  onStart: () => void;
}

export function DemoLoginScreen({ submitting, onStart }: DemoLoginScreenProps) {
  const highlights = [
    {
      icon: Store,
      title: 'Çoklu Mağaza & Global Kanallar',
      desc: 'Amazon, eBay, Shopify, Trendyol ve yerel ERP entegrasyonları tek merkezde konsolide.',
    },
    {
      icon: TrendingUp,
      title: 'Uçtan Uca P&L & Kârlılık',
      desc: 'Sipariş bazlı komisyon, kargo maliyeti, reklam harcaması ve net kâr analitiği.',
    },
    {
      icon: Package,
      title: 'Akıllı Stok & Lojistik Takibi',
      desc: 'Gerçek zamanlı stok eşitleme, kritik eşik bildirimleri ve operasyonel iş akışları.',
    },
    {
      icon: Cpu,
      title: 'AI Destekli Analiz & Raporlama',
      desc: 'Özelleştirilebilir KPI panoları, otomatik raporlar ve akıllı karar destek mekanizmaları.',
    },
  ];

  const stats = [
    { label: 'Entegre Modül', value: '25+' },
    { label: 'Satış Kanalı', value: 'Global / TR' },
    { label: 'Veri Modu', value: 'Canlı Simülasyon' },
  ];

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#090b10] px-4 py-8 text-white selection:bg-indigo-500 selection:text-white sm:px-6 lg:px-8">
      {/* Background Gradients & Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        
        {/* Left Side: System Narrative & Value Props */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          
          {/* Badge & Brand */}
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <Sparkles size={14} className="text-indigo-400" />
              <span>Yeni Nesil E-Ticaret İşletim Sistemi</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-xl font-black text-white shadow-lg shadow-indigo-500/25">
                E!
              </span>
              <div>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-white">
                  EVREKA<span className="text-indigo-500">!</span> <span className="font-light text-zinc-300">DASHBOARD</span>
                </h1>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">
                  E-Commerce Intelligence & Operations
                </p>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl text-zinc-100">
              Operasyon, finans ve stok yönetimi <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
                tek ve güçlü bir kontrol merkezinde.
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400 sm:text-base max-w-xl">
              Evreka! Dashboard, dağınık pazaryeri hesaplarınızı, ERP entegrasyonlarınızı ve sipariş süreçlerinizi
              otonom, şeffaf ve yüksek verimli tek bir mimaride bir araya getirir.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {highlights.map((item, idx) => (
              <div 
                key={idx}
                className="group flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-200 hover:border-indigo-500/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                    <item.icon size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-200">{item.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400 pl-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Stats Strip */}
          <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-5 text-xs text-zinc-400">
            {stats.map((st, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span className="font-semibold text-zinc-200">{st.value}</span>
                <span className="text-zinc-500">•</span>
                <span>{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Launch Card */}
        <div className="flex justify-center lg:col-span-5">
          <section className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/80 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-6">
              
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Hazır Demo Ortamı
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">Sistemi Canlı İnceleyin</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Kurulum veya yapılandırma gerekmeden tüm özellikleri kurgusal verilerle keşfedin.
                </p>
              </div>

              {/* Active Profile Info */}
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-md">
                  EA
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-100">Evreka Admin</span>
                    <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300">
                      Tam Yetki
                    </span>
                  </div>
                  <span className="truncate text-xs text-zinc-400 mt-0.5">{DEMO_USER.email}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={submitting}
                onClick={onStart}
                className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:shadow-indigo-600/50 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{submitting ? 'Evreka Yükleniyor…' : 'Panele Giriş Yap & Keşfet'}</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>

              {/* Feature Checklist */}
              <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-indigo-400" />
                  <span>Güvenli & İzole simülasyon ortamı</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-indigo-400" />
                  <span>Gerçekçi sipariş, lojistik ve finans veri seti</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-indigo-400" />
                  <span>Tek tıkla tüm yetkili ekranlara serbest erişim</span>
                </div>
              </div>

              <p className="text-center text-[11px] text-zinc-500">
                Evreka! Dashboard &bull; Bağımsız E-Ticaret Yönetim Platformu
              </p>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}
