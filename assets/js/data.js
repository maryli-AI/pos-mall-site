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
    'Supplier of professionally reconditioned point-of-sale hardware — terminals, printers, ' +
    'scanners, spare parts and accessories. Tested and ready to deploy. ' +
    'Hardware only. No software, no contracts.',

  email: 'sales@pos-mall.com',
  whatsapp: '+86 189 2626 8820',         // 带国家码。非数字字符会被自动剥离后生成 wa.me 链接
  hours: 'Mon – Fri, 09:00 – 18:00 (GMT+8)',

  /* 电话与地址：店主 2026-09-21 明确决定**不公开** —— 保持空值，站上就不会出现。
     留空是刻意的，不是待办：页头、页脚、浮动联系窗都会自动跳过这两个字段。
     联系方式只走 WhatsApp + Email 两条线。 */
  phone: '',
  addressLine: '',
  addressCity: '',

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
  paymentNote: 'Payment by bank transfer or approved trade account. Pro-forma invoices available on request.',
  shippingNote: 'Worldwide shipping available. Pallet and container quantities quoted on request.'
};

/* ---------------------------------------------------------------- 类目树 */
/* 结构参考 tills-direct.com 的 POS 终端 / 打印机 / 扫描枪 / 配件大类。
   这些类目会按数组顺序「平铺」在顶部导航条上，所以：
   - 新增类目 = 在数组里加一项，导航 / 首页 / 筛选器 / 页脚会自动同步
   - 名称越短越好看，太长会让导航条在窄屏换行                */
const CATEGORIES = [
  {
    id: 'pos-terminals',
    name: 'POS Terminals',
    short: 'Terminals',
    icon: 'terminal',
    desc: 'Android smart terminals, card payment terminals, cash registers and handheld PDAs.',
    children: [
      { id: 'android-terminals', name: 'Android Terminals' },
      { id: 'payment-terminals', name: 'Payment Terminals' },
      { id: 'cash-register', name: 'Cash Register' },
      { id: 'pdas', name: 'PDAs' }
    ]
  },
  {
    id: 'printers',
    name: 'Printers',
    short: 'Printers',
    icon: 'printer',
    desc: 'Portable, desktop and mobile printers for receipts and labels.',
    children: [
      { id: 'portable-bluetooth-printers', name: 'Portable Bluetooth Printers' },
      { id: 'desktop-receipt-printers', name: 'Desktop Receipt Printers' },
      { id: 'mobile-label-printers', name: 'Mobile Label Printers' }
    ]
  },
  {
    id: 'scanners',
    name: 'Scanners',
    short: 'Scanners',
    icon: 'barcode',
    desc: 'Handheld and presentation barcode scanners for the checkout and the stockroom.',
    children: [
      { id: 'handheld-barcode-scanners', name: 'Handheld Barcode Scanners' },
      { id: 'presentation-scanners', name: 'Presentation Scanners' }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    short: 'Accessories',
    icon: 'peripheral',
    desc: 'Spare parts and accessories — screens, boards, printer mechanisms, batteries, keypads, housings, ICs, chargers and paper rolls.',
    children: [
      { id: 'screens', name: 'Screens' },
      { id: 'boards', name: 'Boards' },
      { id: 'printer-mechanisms', name: 'Printer Mechanisms' },
      { id: 'batteries', name: 'Batteries' },
      { id: 'keypads', name: 'Keypads' },
      { id: 'housing-covers', name: 'Housing & Covers' },
      { id: 'ics', name: 'ICs' },
      { id: 'chargers', name: 'Chargers' },
      { id: 'paper-rolls', name: 'Paper Rolls' }
    ]
  },
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
  { id: 'pax', name: 'PAX Technology', origin: 'China', blurb: 'Android and countertop payment terminals — among the highest-volume terminal makers worldwide.' },
  { id: 'verifone', name: 'Verifone', origin: 'USA', blurb: 'Countertop and handheld payment terminals — VX and VX Evolution ranges.' },
  { id: 'ingenico', name: 'Ingenico', origin: 'France', blurb: 'Payment terminals and PIN pads.' },
  { id: 'sunmi', name: 'Sunmi', origin: 'China', blurb: 'Android POS terminals and handhelds.' },
  { id: 'newland', name: 'Newland', origin: 'China', blurb: 'Payment terminals, handhelds and barcode scanners.' },
  { id: 'landi', name: 'Landi', origin: 'China', blurb: 'Countertop and handheld payment terminals and PIN pads.' },
  { id: 'nexgo', name: 'Nexgo', origin: 'China', blurb: 'Payment terminals, PIN pads and Android smart POS.' },
  { id: 'centerm', name: 'Centerm', origin: 'China', blurb: 'Payment terminals and thin-client POS hardware.' },
  { id: 'telpo', name: 'Telpo', origin: 'China', blurb: 'Android smart POS, self-service kiosks and biometric terminals.' },
  { id: 'morefun', name: 'Morefun', origin: 'China', blurb: 'Countertop and handheld payment terminals.' },
  { id: 'urovo', name: 'UROVO', origin: 'China', blurb: 'Android POS terminals, handheld computers and barcode scanners.' }
];
