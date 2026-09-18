/* ============================================================================
 * pos-mall.com — 站点配置 / 类目 / 品牌
 * ----------------------------------------------------------------------------
 * 说明：本文件只放「站点级」数据（站点信息、类目树、品牌库）。
 *       产品数据在 products.js，那是你后续主要填充的文件。
 * ========================================================================== */

/* ---------------------------------------------------------------- 站点配置 */
const SITE = {
  name: 'POS Mall',
  domain: 'pos-mall.com',
  logoText: 'POS',
  logoAccent: 'Mall',
  tagline: 'Wholesale Used & Refurbished POS Hardware',
  intro:
    'Supplier of professionally reconditioned point-of-sale hardware — terminals, receipt printers, ' +
    'barcode equipment, cash drawers and peripherals. Tested, graded and ready to deploy. ' +
    'Hardware only. No software, no contracts.',

  email: 'sales@pos-mall.com',
  phone: '+1 (555) 010-2030',
  whatsapp: '',                          // 留空则不显示
  hours: 'Mon – Fri, 09:00 – 18:00 (GMT-5)',
  addressLine: 'Unit 12, Trade Park Industrial Estate',
  addressCity: 'Your City, ST 00000',

  currency: 'USD',
  priceDisplayDefault: 'request',        // 'request' = 统一显示 Price on request

  footerNote:
    'POS Mall supplies trade and business customers with used and refurbished point-of-sale hardware. ' +
    'We sell hardware only — we do not supply POS software and we do not operate a buy-back or trade-in service.',

  social: [
    // 留空数组则不渲染
    // { label: 'LinkedIn', url: 'https://www.linkedin.com/company/your-page' }
  ]
};

/* ------------------------------------------------------------ 交易条件说明 */
/* 站点为「询价制」：不做线上下单。以下文案出现在产品页 / 询价页。 */
const TRADE = {
  enquiryNote:
    'This catalogue is quotation-based. Add the items you need to your enquiry list and our team will ' +
    'reply with trade pricing, stock confirmation and shipping costs.',
  warrantyNote: 'All refurbished units are covered by our standard 90-day parts-and-labour warranty unless stated otherwise.',
  gradingNote:
    'Grade A — fully refurbished, light or no cosmetic wear. Grade B — tested and working, visible cosmetic wear. ' +
    'Grade C — budget / spares, extensive cosmetic wear, sold as tested-working only.',
  paymentNote: 'Payment by bank transfer or approved trade account. Pro-forma invoices available on request.',
  shippingNote: 'Worldwide shipping available. Pallet and container quantities quoted on request.'
};

/* ---------------------------------------------------------------- 类目树 */
/* 结构参考 tills-direct.com 的 POS / 打印机 / 扫描枪 / 现金抽屉 / 周边大类。
   这些类目会按数组顺序「平铺」在顶部导航条上，所以：
   - 新增类目 = 在数组里加一项，导航 / 首页 / 筛选器 / 页脚会自动同步
   - 名称越短越好看，太长会让导航条在窄屏换行                */
const CATEGORIES = [
  {
    id: 'pos-terminals',
    name: 'POS Terminals',
    short: 'Terminals',
    icon: 'terminal',
    desc: 'All-in-one touchscreen tills, Windows and Android based, for retail and hospitality.',
    children: [
      { id: 'windows-terminals', name: 'Windows Terminals' },
      { id: 'android-terminals', name: 'Android Terminals' },
      { id: 'all-in-one-pos', name: 'All-in-One POS' },
      { id: 'touchscreen-monitors', name: 'Touchscreen Monitors' }
    ]
  },
  {
    id: 'printers',
    name: 'Printers',
    short: 'Printers',
    icon: 'printer',
    desc: 'Receipt, label, portable, panel and OEM printer mechanisms — thermal and impact, desktop through industrial.',
    children: [
      { id: 'desktop-receipt-printers', name: 'Desktop Receipt Printers' },
      { id: 'impact-kitchen-printers', name: 'Impact & Kitchen Printers' },
      { id: 'portable-bluetooth-printers', name: 'Portable & Bluetooth Printers' },
      { id: 'desktop-label-printers', name: 'Desktop Label Printers' },
      { id: 'industrial-label-printers', name: 'Industrial Label Printers' },
      { id: 'mobile-label-printers', name: 'Mobile Label Printers' },
      { id: 'panel-embedded-printers', name: 'Panel & Embedded Printers' },
      { id: 'printer-mechanisms', name: 'Printer Mechanisms (OEM)' }
    ]
  },
  {
    id: 'barcode-scanners',
    name: 'Barcode Scanners',
    short: 'Scanners',
    icon: 'barcode',
    desc: 'Handheld, presentation and wireless 1D/2D imagers and laser scanners.',
    children: [
      { id: 'handheld-scanners', name: 'Handheld Scanners' },
      { id: 'presentation-scanners', name: 'Presentation Scanners' },
      { id: 'wireless-scanners', name: 'Wireless Scanners' }
    ]
  },
  {
    id: 'cash-drawers',
    name: 'Cash Drawers',
    short: 'Cash Drawers',
    icon: 'drawer',
    desc: 'Manual and auto-open cash drawers, printer-driven and standalone.',
    children: [
      { id: 'printer-driven-drawers', name: 'Printer-Driven Drawers' },
      { id: 'standalone-drawers', name: 'Standalone Drawers' }
    ]
  },
  {
    id: 'peripherals',
    name: 'Peripherals & Accessories',
    short: 'Peripherals',
    icon: 'peripheral',
    desc: 'Customer displays, keyboards, scales, mounts, cables, till rolls and ribbons.',
    children: [
      { id: 'customer-displays', name: 'Customer Displays' },
      { id: 'keyboards-scales', name: 'Keyboards & Scales' },
      { id: 'cables-adapters', name: 'Cables & Adapters' },
      { id: 'till-rolls-ribbons', name: 'Till Rolls & Ribbons' },
      { id: 'mounts-stands', name: 'Mounts & Stands' }
    ]
  },
];

/* ---------------------------------------------------------------- 商品成色 */
/* 二手 / 翻新 是本店主营，故成色是核心筛选维度。 */
const CONDITIONS = [
  { id: 'refurbished', name: 'Refurbished', short: 'Refurb', tone: 'green', desc: 'Professionally reconditioned, cleaned and fully tested.' },
  { id: 'used-a', name: 'Used — Grade A', short: 'Grade A', tone: 'blue', desc: 'Tested working, light cosmetic wear.' },
  { id: 'used-b', name: 'Used — Grade B', short: 'Grade B', tone: 'amber', desc: 'Tested working, visible cosmetic wear.' },
  { id: 'used-c', name: 'Used — Grade C', short: 'Grade C', tone: 'slate', desc: 'Budget / spares, heavy cosmetic wear, tested working.' }
];

/* ---------------------------------------------------------------- 库存状态 */
const STOCKS = [
  { id: 'in-stock', name: 'In Stock', tone: 'green' },
  { id: 'low-stock', name: 'Low Stock', tone: 'amber' },
  { id: 'pre-order', name: 'Pre-Order', tone: 'blue' },
  { id: 'out-of-stock', name: 'Out of Stock', tone: 'slate' }
];

/* ---------------------------------------------------------------- 品牌库 */
/* 取自 Owl POS 真实 vendor 分布 + Tills Direct 在售品牌。 */
const BRANDS = [
  { id: 'epson', name: 'Epson', origin: 'Japan', blurb: 'Thermal and impact receipt printers, POS terminals.' },
  { id: 'star-micronics', name: 'Star Micronics', origin: 'Japan', blurb: 'Thermal, impact and mobile receipt printers.' },
  { id: 'zebra', name: 'Zebra', origin: 'USA', blurb: 'Barcode label printers, scanners and mobile computers.' },
  { id: 'honeywell', name: 'Honeywell', origin: 'USA', blurb: 'Barcode scanners, label printers and mobile terminals.' },
  { id: 'bixolon', name: 'Bixolon', origin: 'South Korea', blurb: 'Receipt, label and mobile printers.' },
  { id: 'citizen', name: 'Citizen', origin: 'Japan', blurb: 'Compact thermal receipt and label printers.' },
  { id: 'posiflex', name: 'Posiflex', origin: 'Taiwan, China', blurb: 'Touchscreen POS terminals and kiosks.' },
  { id: 'toshiba', name: 'Toshiba', origin: 'Japan', blurb: 'Retail POS terminals and self-checkout.' },
  { id: 'aures', name: 'Aures', origin: 'France', blurb: 'EPOS terminals, kiosks and printers.' },
  { id: 'sam4s', name: 'SAM4S', origin: 'South Korea', blurb: 'Cash registers, ECRs and touch terminals.' },
  { id: 'partner-tech', name: 'Partner Tech', origin: 'Taiwan, China', blurb: 'POS terminals and panel PCs.' },
  { id: 'elo', name: 'Elo Touch Solutions', origin: 'USA', blurb: 'Touchscreen monitors and interactive terminals.' },
  { id: 'datalogic', name: 'Datalogic', origin: 'Italy', blurb: 'Barcode scanners and mobile computers.' },
  { id: 'micros', name: 'Micros', origin: 'USA', blurb: 'Hospitality POS terminals and kitchen printers.' },
  { id: 'touch-dynamic', name: 'Touch Dynamic', origin: 'USA', blurb: 'POS terminals and touchscreen systems.' },
  { id: 'ncr', name: 'NCR', origin: 'USA', blurb: 'Retail POS terminals and self-service.' },
  { id: 'sunmi', name: 'Sunmi', origin: 'China', blurb: 'Android POS terminals and handhelds.' },
  { id: 'newland', name: 'Newland', origin: 'China', blurb: 'Barcode scanners and payment terminals.' },
  { id: 'ingenico', name: 'Ingenico', origin: 'France', blurb: 'Payment terminals and PIN pads.' },
  { id: 'symbol-motorola', name: 'Symbol / Motorola', origin: 'USA', blurb: 'Legacy barcode scanners and mobile computers.' },
  { id: 'metrologic', name: 'Metrologic', origin: 'USA', blurb: 'Legacy laser barcode scanners.' },
  { id: 'magtek', name: 'MagTek', origin: 'USA', blurb: 'Magnetic stripe readers and card peripherals.' },
  { id: 'squirrel-systems', name: 'Squirrel Systems', origin: 'Canada', blurb: 'Hospitality POS terminals.' },
  { id: 'hp', name: 'HP', origin: 'USA', blurb: 'Windows POS workstations and mini PCs.' },
  { id: 'dell', name: 'Dell', origin: 'USA', blurb: 'OptiPlex and Wyse POS workstations.' },
  { id: 'tsc', name: 'TSC', origin: 'Taiwan, China', blurb: 'Thermal transfer label printers.' },
  { id: 'custom', name: 'Custom', origin: 'Italy', blurb: 'Receipt printers and POS peripherals.' },
  { id: 'xprinter', name: 'Xprinter', origin: 'China', blurb: 'Entry-level receipt and label printers.' },
  { id: 'sewoo', name: 'Sewoo', origin: 'South Korea', blurb: 'Compact receipt and label printers.' },
  { id: 'bematech', name: 'Bematech', origin: 'Brazil', blurb: 'POS terminals, printers and cash drawers.' },
  { id: 'verifone', name: 'Verifone', origin: 'USA', blurb: 'Countertop and handheld payment terminals — VX and VX Evolution ranges.' },
  { id: 'szzt', name: 'SZZT', origin: 'China', blurb: 'GPRS/GSM payment terminals and PIN pads.' }
];
