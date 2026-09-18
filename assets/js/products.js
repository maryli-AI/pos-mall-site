/* ============================================================================
 * pos-mall.com — 产品数据（★ 你后续主要填充这个文件 ★）
 * ----------------------------------------------------------------------------
 * 下面 20 条是【示例占位数据】，用于把页面结构跑通；换成真实产品时
 * 直接替换 / 增删数组里的对象即可，不需要改动其它文件。
 *
 * 字段说明（只有 id / name / brand / category 是必填，其余可省略）：
 *
 *   id          字符串  唯一标识，用作产品页链接 ?id=xxx，建议用英文小写加连字符
 *   name        字符串  产品标题（型号建议放这里，如 "Epson TM-T88VI Receipt Printer"）
 *   brand       字符串  必须与 data.js 中 BRANDS 的 id 一致（如 'epson'）
 *   category    字符串  必须与 data.js 中 CATEGORIES 的 id 一致（如 'receipt-printers'）
 *   subcategory 字符串  可选，CATEGORIES 里对应的 children id（如 'thermal-receipt-printers'）
 *   model       字符串  型号，显示在标题下方
 *   sku         字符串  内部货号 / 制造商料号（如 'M349A'）
 *   condition   'refurbished' | 'used-a' | 'used-b' | 'used-c'   （见 data.js CONDITIONS）
 *   stock       'in-stock' | 'low-stock' | 'pre-order' | 'out-of-stock'
 *   price       数字或 null。null 表示显示 "Price on request"（询价制默认）
 *   qty         数字，可选。库存数量，仅作内部展示
 *   image       字符串  主图路径。留空则自动生成占位图
 *   gallery     数组    附图路径，可留空
 *   shortDesc   字符串  列表页 / 顶部摘要，一两句话
 *   description 字符串  详情页正文（可含换行）
 *   specs       数组    [{ label: 'Print Method', value: 'Direct Thermal' }, ...]
 *   features    数组    ['...', '...']  亮点条目
 *   compat      数组    兼容的 POS 生态，如 ['Square', 'Clover', 'Shopify POS']
 *   boxContents 数组    包装清单
 *   warranty    字符串  质保说明，留空则用 TRADE.warrantyNote
 *   featured    布尔    true 则出现在首页推荐位
 *   tags        数组    自定义标签
 * ========================================================================== */

const PRODUCTS = [

  /* ---------------------------------------------- POS Terminals（整机） */
  {
    id: 'posiflex-xt-3815-all-in-one',
    name: 'Posiflex XT-3815 All-in-One Touch POS Terminal',
    brand: 'posiflex',
    category: 'pos-terminals',
    subcategory: 'all-in-one-pos',
    model: 'XT-3815',
    sku: 'XT3815-AIO',
    condition: 'refurbished',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: '15" projected-capacitive all-in-one terminal with fanless Intel CPU, ideal for retail and quick-service counters.',
    description:
      'Fully refurbished 15-inch fanless all-in-one POS terminal. Stripped, cleaned, thermal-tested and re-imaged with a clean OS install.\n' +
      'Suitable for retail, hospitality and quick-service environments. Supplied without POS software.',
    specs: [
      { label: 'Display', value: '15" Projected Capacitive Touch' },
      { label: 'Processor', value: 'Intel Celeron J1900' },
      { label: 'Memory', value: '4 GB DDR3' },
      { label: 'Storage', value: '128 GB SSD' },
      { label: 'Ports', value: '4 × USB, 2 × RJ45, 1 × VGA, 1 × RJ11' },
      { label: 'Mounting', value: 'VESA 75 / 100' }
    ],
    features: ['Fanless — no dust ingress', 'IP54 front panel', 'VESA mountable', 'Tested with major peripheral brands'],
    compat: ['Square', 'Clover', 'Shopify POS', 'Lightspeed'],
    boxContents: ['Terminal unit', 'Power adapter', 'Power lead'],
    warranty: '',
    featured: true,
    tags: ['all-in-one', 'touchscreen']
  },
  {
    id: 'hp-rp9-g2-pos-workstation',
    name: 'HP RP9 G2 Retail POS Workstation',
    brand: 'hp',
    category: 'pos-terminals',
    subcategory: 'windows-terminals',
    model: 'RP9 G2',
    sku: 'RP9G2-BASE',
    condition: 'used-a',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Expandable Windows-based POS workstation with tool-less service access and a wide peripheral bay.',
    description:
      'Grade A used HP RP9 G2 retail system. Chassis inspected, internals cleaned, storage wiped and OS reinstalled. ' +
      'A dependable workhorse for supermarkets and high-volume retail lanes.',
    specs: [
      { label: 'Platform', value: 'Windows 10 / 11 capable' },
      { label: 'Processor', value: 'Intel Core i3' },
      { label: 'Memory', value: '8 GB DDR4' },
      { label: 'Storage', value: '256 GB SSD' },
      { label: 'Expansion', value: 'Powered USB, cash drawer port, VGA' }
    ],
    features: ['Tool-less access', 'Powered USB ports', 'Supports dual displays'],
    compat: ['Windows POS applications'],
    boxContents: ['Workstation unit', 'Power lead'],
    warranty: '',
    featured: false,
    tags: ['windows', 'retail']
  },
  {
    id: 'sunmi-t2-android-terminal',
    name: 'Sunmi T2 Android Desktop POS Terminal',
    brand: 'sunmi',
    category: 'pos-terminals',
    subcategory: 'android-terminals',
    model: 'T2',
    sku: 'SUNMI-T2',
    condition: 'used-b',
    stock: 'low-stock',
    price: null,
    image: '',
    shortDesc: 'Dual-screen Android terminal with built-in 58 mm printer and NFC for compact counters.',
    description:
      'Grade B used Sunmi T2 Android terminal. Screen and print head inspected, body shows cosmetic marks typical of ex-demo stock. ' +
      'Tested working across all functions.',
    specs: [
      { label: 'Display', value: '15.6" main + 5.5" customer display' },
      { label: 'OS', value: 'Android' },
      { label: 'Printer', value: 'Built-in 58 mm thermal' },
      { label: 'Connectivity', value: 'Wi-Fi, Bluetooth, Ethernet' }
    ],
    features: ['Dual screen', 'Integrated printer', 'NFC capable'],
    compat: ['Android POS applications'],
    boxContents: ['Terminal unit', 'Power adapter'],
    warranty: '',
    featured: false,
    tags: ['android', 'dual-screen']
  },

  /* ---------------------------------------------- Receipt Printers */
  {
    id: 'epson-tm-t88vi-m349a',
    name: 'Epson TM-T88VI Thermal Receipt Printer',
    brand: 'epson',
    category: 'receipt-printers',
    subcategory: 'thermal-receipt-printers',
    model: 'TM-T88VI',
    sku: 'M349A',
    condition: 'refurbished',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'The industry-standard 80 mm thermal receipt printer. Fully refurbished with new print head.',
    description:
      'Fully refurbished Epson TM-T88VI with a replacement print head and auto-cutter assembly. ' +
      'A complete service overhaul — new rollers, cleaned paper path, tested over a full 250-roll endurance run.\n' +
      'The default choice for retail and hospitality lanes and one of our highest-volume lines.',
    specs: [
      { label: 'Print Method', value: 'Direct Thermal, 80 mm' },
      { label: 'Print Speed', value: '350 mm/s' },
      { label: 'Resolution', value: '180 dpi' },
      { label: 'Interfaces', value: 'USB + Ethernet + Serial' },
      { label: 'Cutter', value: 'Auto-cutter, 2 million cuts' },
      { label: 'Colour', value: 'Dark Grey' }
    ],
    features: ['New print head fitted', 'Auto-cutter overhauled', 'Ethernet + USB + Serial', 'Approved for Square & Clover'],
    compat: ['Square', 'Clover', 'Shopify POS', 'Toast', 'Lightspeed', 'EPOS Now'],
    boxContents: ['Printer', 'Power supply', 'USB cable', 'Till roll', 'Setup guide'],
    warranty: '',
    featured: true,
    tags: ['80mm', 'bestseller']
  },
  {
    id: 'star-mcp31l-mc-print3',
    name: 'Star Micronics mC-Print3 Receipt Printer',
    brand: 'star-micronics',
    category: 'receipt-printers',
    subcategory: 'thermal-receipt-printers',
    model: 'mC-Print3 (MCP31L)',
    sku: 'MCP31LNH',
    condition: 'refurbished',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Compact 80 mm thermal printer with CloudPRNT, powered USB hub and periphs for tablet POS.',
    description:
      'Refurbished Star mC-Print3 — the go-to printer for iPad and tablet POS systems. ' +
      'Supplied with a working peripheral hub, so a cash drawer and scanner can run straight off the printer.',
    specs: [
      { label: 'Print Method', value: 'Direct Thermal, 80 mm' },
      { label: 'Print Speed', value: '250 mm/s' },
      { label: 'Interfaces', value: 'Ethernet, USB, Lightning (iOS)' },
      { label: 'Peripheral Hub', value: '2 × USB + 1 × cash drawer port' },
      { label: 'Cloud', value: 'CloudPRNT supported' }
    ],
    features: ['iPad / Lightning capable', 'CloudPRNT for online orders', 'Built-in peripheral hub', 'Splash-proof top cover'],
    compat: ['Square', 'Shopify POS', 'Uber Eats', 'DoorDash', 'Grubhub'],
    boxContents: ['Printer', 'Power supply', 'USB cable', 'Till roll'],
    warranty: '',
    featured: true,
    tags: ['80mm', 'tablet-pos', 'cloudprnt']
  },
  {
    id: 'epson-tm-u220b-m188b',
    name: 'Epson TM-U220B Impact Kitchen Printer',
    brand: 'epson',
    category: 'receipt-printers',
    subcategory: 'impact-kitchen-printers',
    model: 'TM-U220B',
    sku: 'M188B',
    condition: 'refurbished',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Two-colour dot matrix kitchen printer with auto-cutter — the hospitality workhorse.',
    description:
      'Refurbished Epson TM-U220B impact printer for kitchen order tickets. ' +
      'Ribbon, print head and cutter checked; tested with core hospitality platforms.',
    specs: [
      { label: 'Print Method', value: '9-pin Dot Matrix' },
      { label: 'Paper', value: '76 mm roll' },
      { label: 'Colours', value: 'Two-colour (red / black)' },
      { label: 'Cutter', value: 'Auto-cutter' },
      { label: 'Interfaces', value: 'Serial / Ethernet (model dependent)' }
    ],
    features: ['Two-colour printing', 'Auto-cutter', 'Ideal for kitchen tickets'],
    compat: ['Micros', 'Toast', 'Lightspeed Restaurant'],
    boxContents: ['Printer', 'Ribbon cassette', 'Power supply'],
    warranty: '',
    featured: false,
    tags: ['kitchen', 'impact']
  },
  {
    id: 'star-sm-s230i-portable',
    name: 'Star Micronics SM-S230i Portable Printer',
    brand: 'star-micronics',
    category: 'receipt-printers',
    subcategory: 'portable-printers',
    model: 'SM-S230i',
    sku: 'SM-S230I',
    condition: 'used-b',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Pocket-sized 2" Bluetooth printer for line-busting, delivery and field receipts.',
    description:
      'Grade B used Star SM-S230i portable thermal printer. Battery load-tested and print quality verified. ' +
      'A good fit for delivery fleets and queue-busting.',
    specs: [
      { label: 'Print Method', value: 'Direct Thermal, 58 mm' },
      { label: 'Connectivity', value: 'Bluetooth' },
      { label: 'Battery', value: 'Rechargeable Li-ion' },
      { label: 'Drop Rating', value: '1.2 m' }
    ],
    features: ['Bluetooth pairing', 'Belt clip included', 'iOS and Android compatible'],
    compat: ['Square', 'iOS', 'Android'],
    boxContents: ['Printer', 'Battery', 'Charger', 'Belt clip'],
    warranty: '',
    featured: false,
    tags: ['portable', 'bluetooth']
  },
  {
    id: 'bixolon-srp-275iii',
    name: 'Bixolon SRP-275III Impact Receipt Printer',
    brand: 'bixolon',
    category: 'receipt-printers',
    subcategory: 'impact-kitchen-printers',
    model: 'SRP-275III',
    sku: 'SRP-275III',
    condition: 'used-a',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Compact 3" dot matrix receipt printer with dual interface, suited to low-volume lanes.',
    description:
      'Grade A used Bixolon SRP-275III impact printer. Clean unit, fully functional, dual-interface board fitted.',
    specs: [
      { label: 'Print Method', value: '9-pin Dot Matrix' },
      { label: 'Paper', value: '76 mm roll' },
      { label: 'Interfaces', value: 'Dual interface (USB + Serial)' }
    ],
    features: ['Dual interface', 'Low running cost', 'Compact footprint'],
    compat: ['Generic POS applications'],
    boxContents: ['Printer', 'Ribbon', 'Power supply'],
    warranty: '',
    featured: false,
    tags: ['impact']
  },

  /* ---------------------------------------------- Barcode Label Printers */
  {
    id: 'zebra-zd410-direct-thermal',
    name: 'Zebra ZD410 Direct Thermal Label Printer',
    brand: 'zebra',
    category: 'barcode-label-printers',
    subcategory: 'desktop-label-printers',
    model: 'ZD410',
    sku: 'ZD41022-D01000EZ',
    condition: 'refurbished',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Compact 203 dpi desktop label printer for shipping, shelf-edge and barcode labels.',
    description:
      'Refurbished Zebra ZD410 desktop label printer. Print head inspected and replaced where worn, ' +
      'media path cleaned, sensor calibration verified. A neat workhorse for back-office labelling.',
    specs: [
      { label: 'Print Method', value: 'Direct Thermal' },
      { label: 'Resolution', value: '203 dpi' },
      { label: 'Print Width', value: '2.2" max' },
      { label: 'Print Speed', value: '6 ips' },
      { label: 'Interfaces', value: 'USB, USB Host' }
    ],
    features: ['Tested print head', 'Small footprint', 'EZPL language'],
    compat: ['Shipping platforms', 'Inventory systems'],
    boxContents: ['Printer', 'USB cable', 'Power supply', 'Starter roll'],
    warranty: '',
    featured: true,
    tags: ['203dpi', 'shipping']
  },
  {
    id: 'zebra-zt411-industrial',
    name: 'Zebra ZT411 Industrial Label Printer',
    brand: 'zebra',
    category: 'barcode-label-printers',
    subcategory: 'industrial-label-printers',
    model: 'ZT411',
    sku: 'ZT41142-T010000Z',
    condition: 'refurbished',
    stock: 'low-stock',
    price: null,
    image: '',
    shortDesc: '4" industrial thermal transfer printer with LCD, metal chassis and 203 dpi print head.',
    description:
      'Refurbished Zebra ZT411 industrial printer. Ribbon spindle, platen roller and print head assembly inspected and renewed as required. ' +
      'Built for continuous production duty.',
    specs: [
      { label: 'Print Method', value: 'Direct Thermal / Thermal Transfer' },
      { label: 'Resolution', value: '203 dpi' },
      { label: 'Print Width', value: '4.09" max' },
      { label: 'Display', value: 'Colour LCD' },
      { label: 'Interfaces', value: 'USB 2.0, Serial, Ethernet, Bluetooth 4.1' }
    ],
    features: ['Metal industrial chassis', 'Colour LCD interface', 'Ribbon and media sensors verified'],
    compat: ['Warehouse and production systems'],
    boxContents: ['Printer', 'Ribbon spindle', 'Power lead'],
    warranty: '',
    featured: false,
    tags: ['industrial', 'thermal-transfer']
  },
  {
    id: 'honeywell-pm43-industrial',
    name: 'Honeywell / Intermec PM43 Industrial Printer',
    brand: 'honeywell',
    category: 'barcode-label-printers',
    subcategory: 'industrial-label-printers',
    model: 'PM43',
    sku: 'PM43A0100000020',
    condition: 'used-a',
    stock: 'pre-order',
    price: null,
    image: '',
    shortDesc: 'Mid-range industrial label printer with 203 dpi and Ethernet / USB / Serial connectivity.',
    description:
      'Grade A used Honeywell PM43 industrial label printer. Fully tested, mechanically sound, ready for re-deployment.',
    specs: [
      { label: 'Resolution', value: '203 dpi' },
      { label: 'Tear-off', value: 'Standard' },
      { label: 'Memory', value: '128 MB Flash' },
      { label: 'Interfaces', value: 'Ethernet, USB, Serial' }
    ],
    features: ['Rugged metal construction', 'Fast print speeds', 'Large label roll capacity'],
    compat: ['Warehouse and production systems'],
    boxContents: ['Printer', 'Power lead'],
    warranty: '',
    featured: false,
    tags: ['industrial']
  },

  /* ---------------------------------------------- Barcode Scanners */
  {
    id: 'zebra-ds9308-presentation-scanner',
    name: 'Zebra DS9308 1D/2D Presentation Barcode Scanner',
    brand: 'zebra',
    category: 'barcode-scanners',
    subcategory: 'presentation-scanners',
    model: 'DS9308',
    sku: 'DS9308-SR4U2100AZW',
    condition: 'refurbished',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Hands-free presentation scanner for busy checkout counters. USB kit supplied.',
    description:
      'Refurbished Zebra DS9308 presentation scanner with USB kit. Optics cleaned, decode performance verified against a barcode test set.',
    specs: [
      { label: 'Scan Type', value: '1D / 2D Area Imager' },
      { label: 'Mode', value: 'Presentation / Hands-free' },
      { label: 'Interface', value: 'USB Kit' },
      { label: 'Cable', value: 'USB included' }
    ],
    features: ['Hands-free scanning', 'Fast decode engine', 'Square compatible'],
    compat: ['Square Stand', 'Square Register', 'Square Terminal', 'Shopify POS'],
    boxContents: ['Scanner', 'USB cable', 'Stand'],
    warranty: '',
    featured: true,
    tags: ['2d-imager', 'hands-free']
  },
  {
    id: 'symbol-ls2208-handheld',
    name: 'Symbol / Motorola LS2208 Handheld Barcode Scanner',
    brand: 'symbol-motorola',
    category: 'barcode-scanners',
    subcategory: 'handheld-scanners',
    model: 'LS2208',
    sku: 'LS2208-SR20007R',
    condition: 'used-a',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: '1D laser scanner — the long-running industry standard handheld, USB or keyboard wedge.',
    description:
      'Grade A used Symbol LS2208 handheld laser scanner. Scan window inspected, decode verified, supplied with cable.',
    specs: [
      { label: 'Scan Type', value: '1D Laser' },
      { label: 'Interface', value: 'USB / Keyboard Wedge' },
      { label: 'Cable', value: 'Included' }
    ],
    features: ['Battle-tested reliability', 'Lightweight', 'Universal interface'],
    compat: ['Square', 'Clover', 'Shopify POS'],
    boxContents: ['Scanner', 'Cable', 'Stand'],
    warranty: '',
    featured: false,
    tags: ['1d-laser']
  },
  {
    id: 'zebra-ds6878-wireless',
    name: 'Zebra DS6878 Wireless 2D Barcode Scanner',
    brand: 'zebra',
    category: 'barcode-scanners',
    subcategory: 'wireless-scanners',
    model: 'DS6878',
    sku: 'DS6878-SR',
    condition: 'used-b',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Cordless Bluetooth 2D imager with charging cradle — good for tablets and stock-taking.',
    description:
      'Grade B used Zebra DS6878 wireless 2D scanner with cradle. Battery tested, pairing verified, cosmetic wear to housing.',
    specs: [
      { label: 'Scan Type', value: '1D / 2D Area Imager' },
      { label: 'Connectivity', value: 'Bluetooth with USB cradle' },
      { label: 'Range', value: 'Up to 10 m from base' }
    ],
    features: ['Cordless operation', 'Charging cradle included', '2D capable'],
    compat: ['Tablet POS', 'iPad POS', 'Windows POS'],
    boxContents: ['Scanner', 'Cradle', 'Battery', 'USB cable'],
    warranty: '',
    featured: false,
    tags: ['wireless', '2d-imager']
  },

  /* ---------------------------------------------- Cash Drawers */
  {
    id: 'mmf-heritage-cash-drawer',
    name: 'MMF Heritage Printer-Driven Cash Drawer',
    brand: 'magtek',
    category: 'cash-drawers',
    subcategory: 'printer-driven-drawers',
    model: 'Heritage',
    sku: 'MMF-HERITAGE',
    condition: 'refurbished',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Heavy-duty 5-note / 8-coin drawer, driven directly from an Epson or Star receipt printer.',
    description:
      'Refurbished MMF Heritage cash drawer. Latch and lock tested, inserts cleaned, printer interface verified with Epson and Star printers.',
    specs: [
      { label: 'Notes', value: '5 note compartments' },
      { label: 'Coins', value: '8 coin compartments' },
      { label: 'Interface', value: 'RJ11 printer-driven' },
      { label: 'Lock', value: 'Manual key lock with 2 keys' }
    ],
    features: ['Printer-driven open', 'Steel construction', 'Removable coin tray'],
    compat: ['Epson printers', 'Star printers'],
    boxContents: ['Drawer', 'Keys', 'Interface cable'],
    warranty: '',
    featured: false,
    tags: ['rj11']
  },

  /* ---------------------------------------------- Peripherals */
  {
    id: 'elo-15-customer-display',
    name: 'Elo 15" Customer-Facing Display',
    brand: 'elo',
    category: 'peripherals',
    subcategory: 'customer-displays',
    model: 'Elo 1502L',
    sku: 'E056366',
    condition: 'used-a',
    stock: 'in-stock',
    price: null,
    image: '',
    shortDesc: 'Secondary display for customer-facing order confirmation and advertising.',
    description:
      'Grade A used Elo 15" customer display. Panel and touch tested, USB video connection verified.',
    specs: [
      { label: 'Display', value: '15.6" LCD' },
      { label: 'Connection', value: 'USB video' },
      { label: 'Mounting', value: 'Stand / VESA' }
    ],
    features: ['Customer-facing', 'USB powered video', 'Compact stand'],
    compat: ['Windows POS', 'Android POS'],
    boxContents: ['Display', 'USB cable', 'Power lead'],
    warranty: '',
    featured: false,
    tags: ['display']
  },
  {
    id: 'till-rolls-80mm-case',
    name: '80 mm Thermal Till Rolls (Case of 50)',
    brand: 'custom',
    category: 'peripherals',
    subcategory: 'till-rolls-ribbons',
    model: '80 × 80 mm',
    sku: 'ROLL-80-50',
    condition: 'refurbished',
    stock: 'in-stock',
    price: 42.00,
    image: '',
    shortDesc: 'BPA-free 80 mm thermal till rolls, 80 gsm, case of 50 — fits Epson, Star and Bixolon printers.',
    description:
      'Consumable 80 mm thermal till rolls, 80 gsm, BPA-free. Sold in cases of 50 rolls. Compatible with all common 80 mm receipt printers.',
    specs: [
      { label: 'Width', value: '80 mm' },
      { label: 'Diameter', value: '80 mm' },
      { label: 'Paper', value: '80 gsm, BPA-free' },
      { label: 'Pack', value: '50 rolls per case' }
    ],
    features: ['Fits Epson / Star / Bixolon', 'BPA-free paper', 'Bulk case pricing'],
    compat: ['Epson printers', 'Star printers', 'Bixolon printers'],
    boxContents: ['50 × thermal rolls'],
    warranty: 'Consumable — no warranty.',
    featured: false,
    tags: ['consumable']
  },

  /* ==========================================================================
   * 以下 3 条由阿里店铺（Guangzhou Mingheng Technology）商品数据改写而来 —— 示范批次
   *   标题与描述 = 原创英文重写（阿里原为机翻中文）
   *   规格       = 原始属性翻译为英文
   *   图片       = 已下载处理至 assets/img/products/
   *   价格       = 沿用全站询价制；阿里原始报价见每组上方注释
   * ======================================================================== */

  /* Alibaba ref 62434696975 — list US$1.90–49.00, MOQ 1 unit */
  {
    id: 'verifone-vx520-countertop-terminal',
    name: 'Refurbished Verifone VX520 Countertop POS Terminal',
    brand: 'verifone',
    category: 'pos-terminals',
    subcategory: 'all-in-one-pos',
    model: 'VX520',
    sku: 'VX520-LAN',
    condition: 'used-a',
    stock: 'in-stock',
    price: null,
    image: 'assets/img/products/secondhand-verifone-vx520-pos-terminal-lan-1.jpg',
    gallery: [
      'assets/img/products/secondhand-verifone-vx520-pos-terminal-lan-2.jpg',
      'assets/img/products/secondhand-verifone-vx520-pos-terminal-lan-3.jpg',
      'assets/img/products/secondhand-verifone-vx520-pos-terminal-lan-4.jpg'
    ],
    shortDesc: 'Countertop terminal with an integrated thermal printer and Ethernet connectivity — one unit covers payment capture and receipt printing at the till.',
    description:
      'One of the most widely deployed countertop terminals in the field, and one of the easiest to keep running. Each unit is stripped, cleaned and functionally tested in our workshop: keypad, card reader, thermal printer and communications are all verified before dispatch.\n' +
      'The integrated thermal printer means a single device handles both payment capture and receipt printing, which keeps the counter footprint small and takes a separate printer off the shopping list. Ethernet connectivity suits fixed lanes on a wired network.\n' +
      'Supplied with a tested power supply. Sold as a working unit — see the condition grade above for cosmetic expectations. No payment application or POS software is included; we supply hardware only.',
    specs: [
      { label: 'Product Family', value: 'Verifone VX520' },
      { label: 'Model Variant', value: 'LAN (Ethernet)' },
      { label: 'Print Technology', value: 'Direct thermal' },
      { label: 'Print Media', value: 'Plain paper roll' },
      { label: 'Printer Output', value: 'Monochrome' },
      { label: 'Operating System', value: 'Linux' },
      { label: 'Processor', value: '32-bit' },
      { label: 'Connectivity', value: 'Ethernet (LAN)' }
    ],
    features: [
      'Integrated thermal receipt printer — no separate printer needed',
      'Ethernet connectivity for fixed wired lanes',
      'Spill-resistant keypad built for counter use',
      'Tested power supply included',
      'Stripped, cleaned and functionally tested before dispatch'
    ],
    boxContents: ['Terminal unit', 'Tested power supply'],
    warranty: '',
    featured: false,
    tags: ['countertop', 'ethernet', 'payment terminal']
  },

  /* Alibaba ref 62476068573 — list US$1.90–45.00, MOQ 1 unit */
  {
    id: 'verifone-vx675-handheld-terminal',
    name: 'Refurbished Verifone VX675 3G Handheld POS Terminal',
    brand: 'verifone',
    category: 'pos-terminals',
    subcategory: 'all-in-one-pos',
    model: 'VX675',
    sku: 'VX675-3G',
    condition: 'used-a',
    stock: 'in-stock',
    price: null,
    image: 'assets/img/products/used-handheld-pos-machine-3g-verifone-1.jpg',
    gallery: [
      'assets/img/products/used-handheld-pos-machine-3g-verifone-2.jpg',
      'assets/img/products/used-handheld-pos-machine-3g-verifone-3.jpg',
      'assets/img/products/used-handheld-pos-machine-3g-verifone-4.jpg'
    ],
    shortDesc: 'Handheld terminal with a built-in thermal printer and 3G connectivity, for mobile lanes where running a cable is not practical.',
    description:
      'A handheld payment terminal with an integrated thermal printer, so receipts are produced at the point of sale rather than back at a fixed counter. 3G connectivity keeps the unit working anywhere with mobile coverage — useful for pop-up retail, markets, delivery handover and table-side payment.\n' +
      'Every unit is stripped, cleaned and functionally tested before dispatch, covering the keypad, card reader, printer mechanism and radio. Cosmetic condition is graded above; units are supplied as working hardware without a payment application installed.\n' +
      'We supply hardware only — no payment software, no terminal management platform and no merchant services.',
    specs: [
      { label: 'Product Family', value: 'Verifone VX675' },
      { label: 'Form Factor', value: 'Handheld / portable' },
      { label: 'Print Technology', value: 'Direct thermal' },
      { label: 'Print Media', value: 'Plain paper roll' },
      { label: 'Printer Output', value: 'Monochrome' },
      { label: 'Operating System', value: 'Linux' },
      { label: 'Connectivity', value: '3G mobile' }
    ],
    features: [
      'Built-in thermal printer',
      '3G mobile connectivity — no fixed line required',
      'Handheld form factor for table-side and mobile use',
      'Stripped, cleaned and functionally tested',
      'Tested charging accessories supplied'
    ],
    boxContents: ['Handheld terminal', 'Power supply'],
    warranty: '',
    featured: false,
    tags: ['handheld', '3g', 'payment terminal']
  },

  /* Alibaba ref 62571173373 — list US$9.90–19.90, MOQ 1 unit */
  {
    id: 'newland-me31-gprs-terminal',
    name: 'Refurbished Newland ME31 GPRS POS Terminal',
    brand: 'newland',
    category: 'pos-terminals',
    subcategory: 'all-in-one-pos',
    model: 'ME31',
    sku: 'ME31-GPRS',
    condition: 'used-a',
    stock: 'in-stock',
    price: null,
    image: 'assets/img/products/used-me31-newland-gprs-terminal-point-1.jpg',
    gallery: [
      'assets/img/products/used-me31-newland-gprs-terminal-point-2.jpg',
      'assets/img/products/used-me31-newland-gprs-terminal-point-3.jpg'
    ],
    shortDesc: 'Compact GPRS terminal from Newland for payment acceptance where a wired line is unavailable. Available in red or black.',
    description:
      'A compact, low-cost GPRS payment terminal from Newland — a practical option for merchants who need card acceptance without a fixed data line, and for deployments where terminals are replaced in volume.\n' +
      'GPRS coverage is sufficient for low-to-moderate transaction volumes, making these terminals well suited to kiosks, small retail units, field collection and temporary sites. Units are supplied in red or black — tell us your preference when you request a quotation and we will confirm availability.\n' +
      'Each unit is tested before dispatch. Hardware only: no payment application, no SIM contract and no merchant services are included.',
    specs: [
      { label: 'Model', value: 'ME31' },
      { label: 'Brand', value: 'Newland' },
      { label: 'Connectivity', value: 'GPRS' },
      { label: 'Place of Origin', value: 'Guangdong, China' },
      { label: 'Colour Options', value: 'Red / black' }
    ],
    features: [
      'GPRS connectivity — no fixed line needed',
      'Compact footprint for small counters and kiosks',
      'Available in red or black',
      'Low unit cost for volume deployments',
      'Tested before dispatch'
    ],
    boxContents: ['Terminal unit', 'Power supply'],
    warranty: '',
    featured: false,
    tags: ['gprs', 'compact', 'payment terminal']
  }

];
