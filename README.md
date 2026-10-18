# Evreka! Dashboard

Yeni nesil çoklu mağaza, e-ticaret operasyon, sipariş, stok ve P&L yönetim kontrol paneli.

Next.js 16 (App Router), React 19, TypeScript ve Tailwind CSS ile geliştirilmiş modern, modüler ve yüksek performanslı mimari.

## Öne Çıkan Özellikler

- **Çoklu Mağaza & Global Entegrasyonlar:** Amazon, eBay, Shopify, Trendyol, Hepsiburada ve özel ERP veri kaynaklarını tek merkezde toplar.
- **Finans & P&L Analitiği:** Sipariş ve ürün bazlı net kâr, pazar yeri komisyonları, kargo giderleri ve reklam maliyetlerini anlık hesaplar.
- **Akıllı Stok & Lojistik:** Gerçek zamanlı envanter takibi, kritik stok alarmları ve sevkiyat yönetimi.
- **İzole Demo Desteği:** Gerçek bir sunucu veya backend bağlantısına ihtiyaç duymadan, zengin simülasyon verileriyle tam işlevsellik testi.

## Çalıştırma

Gereksinim: **Node.js 20+**

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açarak Evreka! Dashboard'a erişebilirsiniz.

## Notlar

- `NEXT_PUBLIC_DEMO=true` modunda tüm veriler tarayıcı katmanında simüle edilir (`src/lib/demo`).
- Gerçek ortam bağlantısında ilgili API ve veritabanı uç noktalarıyla tam uyumlu çalışır.
