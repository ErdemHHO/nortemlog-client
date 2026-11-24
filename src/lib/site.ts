/**
 * Single source of truth for brand facts, contact details, offices and content lists.
 * Facts come from the business's own site (nortemlog.com) and details provided by the owner.
 */

export interface Office {
  id: string;
  city: string;
  title: string;
  lines: readonly string[];
  note?: string;
  street: string;
  locality: string;
  region?: string;
  postalCode?: string;
  country: "TR" | "DE";
}

export const site = {
  name: "Nortem Log",
  legalName: "Nortemlog Dış Ticaret",
  tagline: "Kapsamlı lojistik çözümleriyle sınırları aşın",
  description:
    "Nortem Log; karayolu, denizyolu, havayolu, parsiyel ve ekspres taşımacılık, depolama, gümrükleme ile ihracat-ithalat hizmetleriyle Türkiye'den Avrupa'ya güvenilir lojistik çözümleri sunar.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nortemlog.com",
  locale: "tr_TR",
  email: "info@nortemlog.com",
  // Telefon 1 is also the WhatsApp line.
  phones: [
    { display: "+90 561 611 11 47", tel: "+905616111147" },
    { display: "+90 555 756 06 93", tel: "+905557560693" },
  ],
  whatsappNumber: "905616111147",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/nortemlog",
    // CONFIRM: the live site has no Facebook page link yet; replace with the real profile.
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/nortemlog",
  },
  map: {
    lat: 39.9611617,
    lng: 32.9179511,
    embedUrl: "https://www.google.com/maps?q=39.9611617,32.9179511&z=16&output=embed",
    directionsUrl: "https://maps.app.goo.gl/3Py1ygYnAip7kVbW6",
  },
} as const;

export const offices: readonly Office[] = [
  {
    id: "ankara",
    city: "Ankara",
    title: "Ankara Ofisi",
    lines: ["Önder Mahallesi Abalı Sokak No:1/E", "Altındağ / Ankara"],
    street: "Önder Mahallesi Abalı Sokak No:1/E",
    locality: "Altındağ",
    region: "Ankara",
    country: "TR",
  },
  {
    id: "istanbul",
    city: "İstanbul",
    title: "İstanbul Ofisi",
    lines: ["Velibaba Mah. Mimar Sinan Cad. No:1", "Pendik / İstanbul"],
    note: "Aytemiz Petrol karşısı",
    street: "Velibaba Mah. Mimar Sinan Cad. No:1",
    locality: "Pendik",
    region: "İstanbul",
    country: "TR",
  },
  {
    id: "almanya",
    city: "Almanya",
    title: "Almanya Ofisi",
    lines: ["Adolf-Scheufelen-Straße 33", "73252 Lenningen / Almanya"],
    street: "Adolf-Scheufelen-Straße 33",
    locality: "Lenningen",
    postalCode: "73252",
    country: "DE",
  },
] as const;

export const whatsappUrl = (text?: string): string => {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const quoteHref = "/teklif-al";

export type IconId =
  | "truck"
  | "package"
  | "globe"
  | "layers"
  | "file"
  | "shield"
  | "clock"
  | "phone"
  | "ship"
  | "plane"
  | "warehouse"
  | "bolt"
  | "swap";

export interface Service {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  icon: IconId;
  image: string;
  points: readonly string[];
}

export const services: readonly Service[] = [
  {
    slug: "karayolu-tasimaciligi",
    title: "Karayolu Taşımacılığı",
    summary: "Karayolu ağını kullanarak mallarınızı hızlı ve güvenilir bir şekilde taşıyoruz.",
    detail:
      "Türkiye'den Avrupa'ya uzanan karayolu ağımızla yüklerinizi kapıdan kapıya, planlı ve güvenle taşıyoruz.",
    icon: "truck",
    image: "/images/services/karayolu.jpg",
    points: ["Türkiye çıkışlı sevkiyat", "Avrupa varışlı teslimat", "Planlı yükleme ve teslimat"],
  },
  {
    slug: "denizyolu-tasimaciligi",
    title: "Denizyolu Taşımacılığı",
    summary: "Global ticaretin kapılarını açan, ekonomik ve güvenli denizyolu taşımacılığı.",
    detail:
      "Büyük hacimli ve maliyet hassasiyeti olan yükleriniz için ekonomik ve güvenli denizyolu çözümleri sunuyoruz.",
    icon: "ship",
    image: "/images/services/denizyolu.jpg",
    points: ["Konteyner taşımacılığı", "Ekonomik çözümler", "Uluslararası limanlara erişim"],
  },
  {
    slug: "havayolu-tasimaciligi",
    title: "Havayolu Taşımacılığı",
    summary: "Hızlı ve zamanında teslimat için küresel ağlara erişim sağlayan havayolu taşımacılığı.",
    detail:
      "Zamanın kritik olduğu gönderileriniz için küresel hava kargo ağlarına erişim sağlıyoruz.",
    icon: "plane",
    image: "/images/services/havayolu.jpg",
    points: ["Hızlı teslimat", "Küresel ağ erişimi", "Zaman hassasiyeti olan yükler"],
  },
  {
    slug: "parsiyel-tasimacilik",
    title: "Parsiyel Taşımacılık",
    summary: "Küçük ve orta ölçekli gönderileriniz için ekonomik ve esnek parsiyel çözümler.",
    detail:
      "Parsiyel taşımacılıkla hem maliyetten tasarruf edin hem de çevreyi koruyun. Küçük ve orta ölçekli gönderiler için ekonomik ve esnek çözümler sunuyoruz.",
    icon: "package",
    image: "/images/services/parsiyel.jpg",
    points: ["Kullandığınız alan kadar maliyet", "Esnek sevkiyat", "Küçük ve orta ölçekli yükler"],
  },
  {
    slug: "ekspres-tasimacilik",
    title: "Ekspres Taşımacılık",
    summary: "Acil gönderileriniz için hızlı, güvenilir ve kesintisiz ekspres taşımacılık.",
    detail:
      "Beklemeyi kaldıramayan acil gönderileriniz için öncelikli ve kesintisiz ekspres taşımacılık hizmeti veriyoruz.",
    icon: "bolt",
    image: "/images/services/ekspres.jpg",
    points: ["Acil gönderiler", "Öncelikli sevkiyat", "Kesintisiz süreç"],
  },
  {
    slug: "depolama",
    title: "Depolama",
    summary: "Güvenli, esnek ve erişilebilir depolama çözümleriyle mallarınızı koruyoruz.",
    detail:
      "Ürünlerinizin ihtiyaç ve gereksinimlerinize göre profesyonel depo faaliyetleriyle güvenle saklanmasını sağlıyoruz.",
    icon: "warehouse",
    image: "/images/services/depolama.jpg",
    points: ["Güvenli depolama", "Esnek kapasite", "Kolay erişim"],
  },
  {
    slug: "gumrukleme",
    title: "Gümrükleme",
    summary: "Tüm gümrük işlemlerinizi hızlı ve sorunsuz bir şekilde yönetiyoruz.",
    detail:
      "Gönderinizin türüne göre gereken evrakların hazırlanması ve gümrük işlemlerinin takibi konusunda yanınızdayız.",
    icon: "file",
    image: "/images/services/gumruk.jpg",
    points: ["Gümrük işlemleri", "Evrak hazırlığı", "Süreç takibi"],
  },
  {
    slug: "ihracat-ithalat",
    title: "İhracat – İthalat Hizmetleri",
    summary: "Küresel ticaretinizde güçlü bir ortak olarak ihracat ve ithalat işlemlerinizi kolaylaştırıyoruz.",
    detail:
      "İhracat ve ithalat süreçlerinizin lojistik ayağını sizin adınıza yönetiyor, uluslararası ticaretinizi kolaylaştırıyoruz.",
    icon: "swap",
    image: "/images/services/ihracat-ithalat.jpg",
    points: ["İhracat süreçleri", "İthalat süreçleri", "Uçtan uca koordinasyon"],
  },
] as const;

export const carried = [
  "Mobilya",
  "Sanayi Ürünleri",
  "Tekstil Ürünleri",
  "Çeyiz Eşyaları",
  "Medikal Ekipmanlar",
  "Dondurulmuş Gıda Ürünleri",
  "Zati Eşyalar",
] as const;

export const whyUs: readonly { icon: IconId; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Şeffaf fiyatlandırma",
    text: "Fiyatı ve süreci baştan açıkça paylaşır, sürpriz maliyet çıkarmayız.",
  },
  {
    icon: "clock",
    title: "Hızlı ve etkin teslimat",
    text: "Planlanan takvime bağlı kalır, süreç boyunca sizi bilgilendiririz.",
  },
  {
    icon: "shield",
    title: "Kargo güvenliği",
    text: "Yükünüzün sorumluluğunu teslim aldığımız andan varışa kadar üstleniriz.",
  },
  {
    icon: "warehouse",
    title: "Depolama hizmetleri",
    text: "Ürünlerinizi ihtiyacınıza göre profesyonel depo faaliyetleriyle saklarız.",
  },
  {
    icon: "phone",
    title: "7/24 destek",
    text: "Nakliye sürecine dair sorularınız için ekibimize ulaşabilirsiniz.",
  },
  {
    icon: "layers",
    title: "Her ölçeğe çözüm",
    text: "Tek koliden düzenli kurumsal sevkiyata kadar özel çözümler üretiriz.",
  },
] as const;

export const mission =
  "Müşterilerimizin başarısı için özelleşmiş lojistik çözümler sunuyoruz.";
export const vision =
  "Küresel lojistik alanında yenilikçi ve sürdürülebilir liderliği hedefliyoruz.";

export const processSteps = [
  { title: "Talebinizi iletin", text: "Teklif formunu doldurun ya da bizi arayın." },
  { title: "Teklifinizi alın", text: "Yükünüze uygun çözümü ve fiyatı paylaşırız." },
  { title: "Yükünüzü teslim alalım", text: "Planlanan zamanda yükünüzü adresinizden alırız." },
  { title: "Varışta teslim", text: "Yükünüz varış noktasında güvenle teslim edilir." },
] as const;
