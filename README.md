<p align="center">
  <img src="public/evreka-banner.svg" alt="EVREKA" width="680" />
</p>

<h1 align="center">EVREKA</h1>

Bu depo, Evreka platformunun arka uç bağımlılığı bulunmayan, tamamen kurgusal simülasyon verileriyle çalışan bağımsız demo sürümüdür. Sistem mimarisi ve kullanıcı arayüzü kabiliyetleri canlı ortam davranışını birebir yansıtacak şekilde istemci katmanında izole olarak modellenmiştir.

---

### Sistem Kapsamı ve Modül Mimarisi

#### 1. Sipariş Operasyonları
- Sipariş Yönetimi: Çok kanallı sipariş akışı, satır bazlı işlem statüleri ve kargo takip süreçleri.
- Müşteri İletişimi: Sipariş ilişkili müşteri e-posta kayıtları ve bildirim geçmişi.
- İade ve Değişim: İade talep kabulü, ürün kabul kontrolleri ve operasyonel iade kararları.
- Hızlı Sipariş Girişi: Harici veya fiziksel kanallar için panel içi manuel sipariş kaydı.

#### 2. Ürün ve Envanter Yönetimi
- Ürün Kataloğu: Merkezi SKU yönetimi, varyant yapıları, görsel ve teknik nitelik eşlemeleri.
- Kategori ve Eşleştirme Motoru: Çok platformlu kategori ağacı, otomatik kural tanımları ve uyuşmazlık denetimi.
- Depo ve Kolileme: Koli matrisleri, hacimsel hesaplamalar ve paketleme optimizasyonu.
- Araç ve Model Uyumluluğu: Model yılı, kasa ve motor tiplerine dayalı parça uyumluluk doğrulaması.
- Lojistik Haritası: Bölgesel sevkiyat yoğunluğu, kargo rotalama ve dağıtım coğrafyası.
- Canlı Stok Takibi: Çok depolu gerçek zamanlı bakiye, rezerve adetler ve kritik stok alarmları.
- Ürün Açığı Analitiği: Satış kanallarındaki eksik listelemelerin ve portföy açıklarının tespiti.

#### 3. Analitik ve Karar Destek
- Ürün Performans Analizi: Hız, devir hızı, satış trendleri ve kanal bazlı performans metrikleri.
- Anomali Tespiti: Ani sipariş düşüşleri, anormal iade oranları ve stok sapma bildirimleri.
- Fiyat ve Stok Tutarlılık Denetimi: Pazaryerleri ile merkez envanter arasındaki uyumsuzlukların tespiti.
- Kohort Analizi: Müşteri edinme dönemlerine göre tekrar satın alma ve yaşam boyu değer davranışları.
- Kanibalizasyon Analizi: Benzer veya muadil ürünlerin birbirinin satışını baskılama oranları.
- Zarar Eden Ürün Tespiti: Negatif marjla çalışan liste fiyatlarının anlık tespiti.
- Rakip Fiyat Karşılaştırması: Hedef ürün gruplarında piyasa fiyatları ve rekabet endeksi.

#### 4. Finans ve Kârlılık
- P&L Analitiği: Sipariş bazlı brüt ciro, pazaryeri komisyonları, kargo maliyeti, reklam payı ve net kâr hesabı.
- Dinamik Gider Yönetimi: Sabit ve değişken genel gider kalemlerinin operasyonlara yansıtılması.
- Ürün Maliyet Kartları: Alış maliyeti, gümrük, ambalaj ve ek yüklerin dinamik maliyet tablosu.
- Kargo ve Taşıma Tarifeleri: Desi ve bölge bazlı kargo anlaşma matrisleri.
- Platform Kesinti Parametreleri: Kanal ve kategori bazlı komisyon ve hizmet bedeli tanımları.
- Yaşlandırma Raporları: Vadesi geçmiş veya yaklaşan nakit akışlarının zaman dilimi analizi.

#### 5. E-Fatura ve Resmi Süreçler
- Fatura Defteri: Yasal defter standartlarında fatura listesi ve muhasebe dökümü.
- E-Fatura ve E-Arşiv: Fatura oluşturma, iptal, itiraz ve onay süreçleri.
- Çoklu Tüzel Kişilik: Birden fazla şirket ve fatura kesici tüzel unvan yönetimi.
- E-İrsaliye: Mal sevkiyatı öncesi resmi irsaliye düzenleme ve eşleme.
- Seri ve Numara Yönetimi: Yasal fatura seri kodları ve sayaç yapılandırması.
- Ticari Yanıt Yönetimi: Gelen ticari faturalara sistem üzerinden kabul veya ret yanıtı iletimi.
- Alış Faturası Eşleştirme: Satın alma ve irsaliyeler ile gelen e-faturaların otomatik mutabakatı.
- Zarf ve UBL Yönetimi: Gelir İdaresi standartlarında UBL XML paketleme ve durum sorgulama.

#### 6. Satın Alma ve Üretim
- Satın Alma Siparişleri: Tedarikçi sipariş talepleri, onay hiyerarşisi ve mal kabul kontrolü.
- Tedarikçi Yönetimi: Tedarikçi iletişim kartları, vade koşulları ve performans karnesi.
- Hammadde ve Yarı Mamul: Üretim girdilerinin stok, parti ve kalite takibi.
- Ürün Reçeteleri: Mamul ve yarı mamul montaj ağaçları ve fire hesaplamaları.

#### 7. Ön ve Genel Muhasebe
- Cari Hesap Yönetimi: Müşteri borç-alacak bakiyeleri, ekstre üretimi ve mutabakat.
- Hazine ve Kasa Yönetimi: Banka hesapları, çek-senet portföyü ve nakit giriş-çıkışları.
- Tahsilat ve Ödeme Planlaması: Vade takvimine göre nakit akış projeksiyonu.
- Tek Düzen Hesap Planı: Ana hesap, grup ve muavin hesap hiyerarşisi.
- Yevmiye ve Mizan: Çift taraflı kayıt esasına göre yevmiye fişleri ve periyodik mizan tablosu.
- KDV Özeti ve E-Defter: Yasal beyan hazırlığı, berat dosyaları ve aylık kapanış kayıtları.
- Pazaryeri Mutabakatı: Pazaryeri hakediş raporları ile merkez siparişlerinin otomatik karşılaştırılması.

#### 8. Özel Raporlama ve Gösterge Panelleri
- Dinamik Excel Rapor Motoru: Alan, filtre ve gruplama seçimine dayalı özelleştirilebilir veri dışa aktarımı.
- KPI ve Widget Tasarımcısı: Kullanıcı ihtiyaçlarına göre yapılandırılabilen gösterge blokları.

#### 9. Entegre Çalışma Alanları
- Çok Kanallı İletişim Merkezi: Tüm pazaryeri ve web sitesi müşteri mesajlarının tek gelen kutusunda yönetimi.
- Reklam Performans Merkezi: Google, Meta ve pazaryeri reklam harcamaları, ROAS ve bütçe optimizasyonu.
- Satış ve Talep Tahminleme: Geçmiş trendler ve mevsimsellik verisiyle tedarik tahminleme.
- Ürün Görsel Stüdyosu: Katalog görsellerinin standartlaştırılması, arka plan ayrıştırma ve boyut optimizasyonu.
- B2B İş Ortaklığı Portalı: Bayi siparişleri, özel fiyat listeleri ve cari risk sınırları.
- Parça Kod Eşleştirme Motoru: OEM, OES ve üretici referans kodlarının çapraz eşlenmesi.
- Depo Yönetim Sistemi: Barkod ve QR kod destekli raf adresleme, toplama rotalama ve sayım.
- Kanal Entegrasyonları: Amazon, eBay, Shopify, Trendyol, Hepsiburada, Base ve Sentos veri köprüleri.

#### 10. Güvenlik ve Sistem Yönetimi
- Rol ve İzin Matrisi: Granüler sayfa, modül ve işlem bazlı yetkilendirme altyapısı.
- İş Akışı ve Otomasyon: Koşullu tetikleyiciler, webhook bildirimleri ve zamanlanmış görevler.
- İki Faktörlü Doğrulama: Güvenli oturum açma ve kimlik doğrulama katmanı.
- Şifre ve Entegrasyon Kasası: API anahtarları ve gizli anahtarlar için şifreli saklama alanı.
- Dinamik QR Kod Servisi: Ürün ve depo lokasyonları için anlık QR kod üretimi.
