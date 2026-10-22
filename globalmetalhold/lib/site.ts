// Общие константы сайта (single source of truth для layout, sitemap, JSON-LD)

export const SITE = {
  name: "ООО «ГлобалМеталлХолд»",
  nameEn: "GlobalMetalHold LLC",
  shortName: "ГлобалМеталлХолд",
  // TODO: заменить на боевой домен перед деплоем
  url: "https://globalmetalhold.by",
  city: "Логойск",
  country: "BY",
  phone: "+375290000000", // TODO: реальный телефон (для tel:-ссылки)
  phoneDisplay: "+375 (29) 000-00-00", // TODO: реальный телефон (для отображения)
  email: "sales@globalmetalhold.by", // TODO: реальная почта
  address: "Республика Беларусь, Минская область, г. Логойск", // TODO: точный адрес
  geo: { lat: 54.1872, lng: 28.0906 }, // координаты Логойска — TODO: уточнить по адресу предприятия
  ogImage: "/og-cover.jpg", // TODO: положить реальное изображение 1200×630 в /public
} as const;

// Ограничения загрузки чертежа (используются и на клиенте, и на сервере)
export const UPLOAD = {
  allowedExtensions: [".pdf", ".dwg", ".dxf", ".zip", ".rar"] as const,
  maxFileSizeBytes: 20 * 1024 * 1024, // 20 МБ
} as const;
