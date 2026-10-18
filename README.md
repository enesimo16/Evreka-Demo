<p align="center">
  <img src="public/evreka-banner.svg" alt="EVREKA" width="700" />
</p>

Bu depo, Evreka E-Ticaret ve Operasyon Yönetim Platformu'nun arka uç bağımsız çalışan, izole simülasyon ve etkileşimli demo sürümüdür. Sistem üzerindeki tüm veri akışları, analitik hesaplamalar, sipariş döngüleri ve modül etkileşimleri istemci tarafında gerçekçi modellerle simüle edilmiştir.

---

### Entegrasyon Ekosistemi

Evreka, e-ticaret şirketlerinin dağınık kanallarını tek bir omurgada toplamak üzere geliştirilmiş geniş bir bağlantı kataloğuna sahiptir.

#### Global ve Yerel Pazaryeri Entegrasyonları
- Amazon (Kuzey Amerika, Avrupa, Birleşik Krallık, Türkiye pazar yerleri; SP-API sipariş, stok ve finans mutabakatı)
- eBay (Çoklu mağaza listeleme, sipariş yönetimi, uluslararası kargo ve vergi takibi)
- Shopify (Özel e-ticaret siteleri, webhook tabanlı canlı sipariş ve sepet eşitlemesi)
- Trendyol (Pazaryeri siparişleri, onay akışları, fatura yükleme ve komisyon kesinti takibi)
- Hepsiburada (Merchant API entegrasyonu, kargo barkod üretimi ve hakediş mutabakatı)
- N11 (Sipariş karşılama, iptal/iade süreçleri ve katalog senkronizasyonu)
- Pazarama (Yurt içi pazar yeri sipariş ve stok operasyonları)
- Çiçeksepeti (Sipariş kabulü, statü güncellemeleri ve ürün eşleme)
- Etsy (El yapımı ve özel tasarım ürünler için global sipariş ve teslimat takibi)
- B&Q ve Temu (Kanal bazlı listeleme ve sipariş besleme köprüleri)

#### Sosyal Ticaret ve Mesajlaşma Kanalları
- WhatsApp (WhatsApp Business API; doğrudan müşteri destek hattı, sipariş onay bildirimleri, kargo takip mesajları ve terk edilmiş sepet geri kazanımı)
- Instagram (Instagram Shop ve Instagram Direct; gönderi ve Reels üzerinden ürün etiketleme, DM müşteri taleplerinin tek merkezden yönetimi ve sipariş kaydı)
- Facebook (Meta Commerce Manager ve Facebook Marketplace; ürün katalog senkronizasyonu, pazar yeri satışları ve sosyal mağaza entegrasyonu)

#### Kurumsal ERP ve Ticari Muhasebe Yazılımları
- Base (BaseLinker): Çok kanallı e-ticaret yönetim motoru, sipariş aktarımı ve kargo etiketleme.
- Sentos: Entegre stok, fatura ve pazar yeri köprüsü.
- Logo Yazılım (Logo Go3, Logo Tiger): Kurumsal muhasebe fişleri, stok kartları ve cari hesap entegrasyonu.
- Mikro Yazılım (Mikro v16, Jump, Fly): Çift yönlü stok ve e-fatura senkronizasyonu.
- Netsis: Üretim, depo ve genel muhasebe veri köprüleri.
- Nebim (Nebim V3): Perakende ve çoklu mağaza stok-satış optimizasyonu.
- Paraşüt ve BizimHesap: KOBİ segmenti bulut ön muhasebe ve e-fatura entegrasyonları.
- Akınsoft (Wolvox): Masaüstü ve SQL tabanlı ERP veri aktarımı.
- Odoo, SAP, Microsoft Dynamics 365, Oracle NetSuite: Global kurumsal kaynak planlama altyapılarına yönelik veri akışları.
- Dia Yazılım, ETA, Luca, Uyumsoft, Xero: Defter kayıtları, beyanname hazırlığı ve mali mutabakat köprüleri.

#### Taşıyıcı ve Kargo Lojistiği Entegrasyonları
- Yurt İçi Taşıyıcılar: Yurtiçi Kargo, Aras Kargo, MNG Kargo, PTT Kargo, Sürat Kargo, HepsiJet, Trendyol Express (TEX), Kolay Gelsin.
- Uluslararası Taşıyıcılar: DHL Express, FedEx, UPS, DX Delivery, Royal Mail.
- Otomatik kargo barkodu basımı, desi ve mesafe bazlı taşıma maliyeti hesaplama ve canlı kargo takip statüsü sorgulama.

#### Reklam ve İletişim Kanalları
- Pazarlama Ağları: Google Ads, Meta Ads (Facebook ve Instagram), TikTok Ads reklam harcaması ve ROAS ölçümü.
- Kurumsal İletişim: Slack bildirim kanalları ve operasyonel Trello pano bağlantıları.

---

### Detaylı Modül Mimarisi

#### 1. Sipariş Yönetimi ve Operasyon
- Çok Kanallı Sipariş Masası: Tüm pazaryerlerinden gelen siparişlerin tek ekranda konsolide edilmesi; filtreleme, etiketleme ve toplu işleme imkanı.
- Satır Bazlı Operasyon Statüleri: Sipariş içindeki her bir ürünün ayrı ayrı hazırlanma, paketlenme, faturalanma ve sevk statüsünün yönetimi.
- Müşteri E-Posta Takibi: Pazaryerleri üzerinden iletilen anonim veya açık müşteri e-posta yazışmalarının siparişle eşleştirilmesi.
- İade ve İnceleme Süreci: Müşteri iadelerinin depo kabulü, hasar/eksik tespiti, ürünün tekrar stoka alınması veya hurdaya ayrılması kararları.
- Manuel ve B2B Sipariş Girişi: Pazar yeri harici doğrudan kurumsal veya toptan satışlar için hızlı sipariş oluşturma paneli.

#### 2. Ürün, Katalog ve Envanter
- Çok Kanallı Ürün Kataloğu: Ana stok kartı (Master SKU), barkod, marka ve varyant (renk, beden, hacim) hiyerarşisi.
- Dinamik Kategori ve Nitelik Eşleme: Her pazaryerinin farklı kategori şemalarına kurallar tanımlayarak tek tıkla toplu eşleme yapabilme; nitelik uyumsuzluklarını otomatik denetleme.
- Depo ve Koli Matrisi (Boxes): Ürünlerin koli içi adetleri, brüt ağırlık ve hacimsel (desi) ölçülerinin sevkiyat öncesi hesaplanması.
- Araç ve Model Uyumluluk Motoru (Fitment): Otomotiv ve aksesuar odaklı marka, model, kasa kodu ve üretim yılı bazında parça uyumluluk doğrulaması.
- Lojistik Haritası: Türkiye ve Birleşik Krallık bölgelerinde sipariş dağılımını gösteren coğrafi harita analizleri.
- Canlı Stok ve Güvenlik Seviyesi: Çok depolu sistemde emniyet stoku, temin süresi ve sipariş eşiği hesaplamaları.
- Ürün Açığı (Gap) Analizi: Bir platformda satılan fakat diğer pazaryerlerinde henüz listelenmemiş karlı ürünlerin belirlenmesi.

#### 3. Analitik ve Karar Destek
- Ürün Satış ve Marj Analitiği: Hangi ürünün ne kadar ciro, brüt kâr ve net marj ürettiğinin zamansal karşılaştırması.
- Anomali ve Kaçak Tespiti: Beklenmeyen satış düşüşleri, aşırı kargo faturası kesintileri veya negatif kârlı siparişlerin anlık uyarısı.
- Fiyat ve Stok Tutarlılık Denetimi: Pazaryerindeki satış fiyatı ile merkez liste fiyatı arasındaki kur veya giriş hatalarını yakalayan güvenlik motoru.
- Müşteri Kohort Analizi: Müşterilerin ilk satın alma dönemlerine göre tekrar sipariş verme sıklığı ve yaşam boyu değeri (LTV).
- Kanibalizasyon Raporu: Yeni açılan ürün listelemelerinin firmanın kendi eski ürünlerinin satışını kesip kesmediğini ölçen analiz.
- Zarar Eden Ürün Tespiti: Komisyon, kargo, reklam ve ürün maliyeti toplamı satış fiyatını aşan zarardaki kalemlerin listelenmesi.
- Rakip Fiyat Karşılaştırması: Rakiplerin pazar fiyatlarının izlenmesi, rekabetçi fiyatlandırma aralıklarının saptanması.

#### 4. Kârlılık ve Finans (P&L)
- Sipariş Bazında Net Kâr (P&L): Her sipariş satırı için brüt tutardan KDV, pazar yeri komisyonu, kargo bedeli, ambalaj payı ve ürün maliyeti düşülerek net kârın hesaplanması.
- Sabit ve Değişken Gider Yönetimi: Personel, depo kirası, yazılım ve ofis masraflarının sipariş maliyetlerine paylaştırılması.
- Ürün Maliyet Kartları (Costing): Dövizli hammadde maliyeti, gümrük vergisi, navlun ve işçilik girdilerinin dinamik maliyet tablosu.
- Kargo ve Taşıma Tarifeleri: Anlaşmalı kargo firmalarının desi ve mesafe bazlı güncel fiyat tabloları.
- Platform Kesinti Parametreleri: Satış kanalına göre değişen stopaj, işlem ücreti ve ceza komisyonlarının parametrik yönetimi.
- Borç ve Alacak Yaşlandırma: Tahsilat vadeleri ve tedarikçi ödeme planlarının 30-60-90 günlük periyotlarda izlenmesi.

#### 5. E-Fatura ve Resmi Süreçler
- Fatura Defteri: Yasal defter standartlarında fatura listesi ve muhasebe dökümü.
- E-Fatura ve E-Arşiv İşlemleri: Fatura taslağı oluşturma, Gelir İdaresi Başkanlığı onay akışı, iptal ve itiraz yönetimi.
- Çoklu Tüzel Kişilik (Multi-Entity): Birden fazla şirket veya vergi kimlik numarası üzerinden farklı fatura serileriyle işlem yapabilme.
- E-İrsaliye: Depodan çıkış anında taşıma irsaliyesinin düzenlenmesi ve kargo firmasıyla eşleştirilmesi.
- Ticari Yanıt Yönetimi: Gelen ticari e-faturalara yasal 8 günlük süre içinde sistem üzerinden kabul veya ret yanıtı verilmesi.
- Alış Faturası Eşleştirme: Tedarikçilerden gelen e-faturaların satın alma irsaliyeleri ve siparişleriyle otomatik örtüştürülmesi.
- UBL ve Zarf İletişimi: GİB entegratörleri üzerinden giden ve gelen UBL formatındaki XML zarf takibi.

#### 6. Satın Alma ve Üretim (BOM)
- Satın Alma Emirleri: Stok kritik seviyeye düştüğünde otomatik veya manuel satın alma emri oluşturma, onay ve teslimat takibi.
- Tedarikçi Kartları: Tedarikçi iletişim bilgileri, banka hesapları, iskonto oranları ve teslimat güvenilirlik puanı.
- Hammadde ve Reçete (BOM): Nihai ürünün imalatında kullanılan parça, ambalaj ve hammaddelerin reçete ağacı ve fire katsayıları.

#### 7. Muhasebe Altyapısı
- Müşteri ve Tedarikçi Carileri: Cari hesap bakiyeleri, hesap ekstreleri, mutabakat mektupları ve borç limitleri.
- Kasa ve Hazine Yönetimi: Şirket banka hesapları, kredi kartı slipleri, çek/senet portföyü ve anlık nakit durumu.
- Tek Düzen Hesap Planı: 100-780 arası hesap kodlarının hiyerarşik yönetimi ve fiş bağlantıları.
- Yevmiye ve Mizan: Borç-alacak eşitliğini sağlayan yevmiye fişleri ve dönemsel genel mizan dökümü.
- KDV Özeti ve E-Defter: 1 no'lu KDV beyannamesi kontrol raporları, yevmiye ve kebir berat dosyalarının hazırlanması.
- Pazaryeri Mutabakatı: Pazaryerlerinin banka hesabına gönderdiği hakediş tutarları ile paneldeki sipariş kesintilerinin kuruşu kuruşuna karşılaştırılması.

#### 8. Özel Çalışma Alanları (Workspaces & Hubs)
- Omnichannel Inbox: WhatsApp, Instagram DM, pazar yeri soruları ve canlı destek mesajlarının tek bir gelen kutusunda temsilcilere atanarak yönetilmesi.
- AdsHub: Reklam platformlarının tek panelden bütçe kontrolü, kampanya açma/kapama ve harcama geri dönüş (ROAS) analitiği.
- SellingView: Yapay zeka ve istatistiksel trend analizi ile gelecek 30-60-90 günün satış hacmi ve stok gereksinimi projeksiyonu.
- Photo Studio: Ürün fotoğraflarının yapay zeka ile arka planının temizlenmesi, renk tonu eşitlenmesi ve pazar yeri çözünürlüklerine uyarlanması.
- PartnerHub (B2B): Yetkili bayilerin özel iskonto oranlarıyla sipariş girebildiği, limitlerini ve cari ekstrelerini görebildiği B2B portali.
- OEM Matcher: Orijinal ekipman üretici kodlarının (OEM) alternatif ve muadil referanslarla eşleştirilmesi.
- WMS (Depo Yönetim Sistemi): Depo içi koridor, raf ve göz bazında adresleme, el terminali ile toplama ve barkodlu mal kabul.

#### 9. Güvenlik, Otomasyon ve Sistem
- Rol ve İzin Matrisi: Kullanıcı bazlı değil rol bazlı yetkilendirme; hangi kullanıcının hangi menüyü görebileceği veya işlem yapabileceğinin yönetimi.
- Otomasyon Motoru: Koşullu tetikleyiciler (örneğin sipariş tutarı belirli bir değeri aştığında bildirim gönderme veya kargo firmasını otomatik seçme).
- İki Aşamalı Güvenlik (2FA): Zaman tabanlı tek kullanımlık parola (TOTP) ve yedek kurtarma kodları ile hesap koruması.
- Şifre ve Kimlik Kasası: Pazaryeri API gizli anahtarlarının ve entegrasyon kimlik bilgilerinin güvenli saklanması.
- QR Kod Yönetimi: Ürün ambalajları, koli etiketleri ve depo lokasyonları için anlık dinamik QR kod basımı.
