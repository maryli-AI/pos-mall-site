/* ============================================================================
 * pos-mall.com — 产品数据（★ 你后续主要填充这个文件 ★）
 * ----------------------------------------------------------------------------
 * 目前只有 3 条真实产品（2026-09-18 从阿里店铺迁入）。原本用于跑通结构的
 * 17 条示例占位数据已移除；新增产品时直接往数组里加对象即可，不需要改动其它文件。
 *
 * 字段说明（只有 id / name / brand / category 是必填，其余可省略）：
 *
 *   id          字符串  唯一标识，用作产品页链接 ?id=xxx，建议用英文小写加连字符
 *   name        字符串  产品标题（型号建议放这里，如 "Epson TM-T88VI Receipt Printer"）
 *   brand       字符串  必须与 data.js 中 BRANDS 的 id 一致（如 'verifone'）
 *   category    字符串  必须与 data.js 中 CATEGORIES 的 id 一致（如 'pos-terminals'）
 *   subcategory 字符串  可选，CATEGORIES 里对应的 children id（如 'payment-terminals'）
 *   model       字符串  型号，显示在标题下方
 *   sku         字符串  内部货号 / 制造商料号（如 'M349A'）
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

  /* ------------------------------------------- POS Terminals */
  /*   android-terminals · payment-terminals · cash-register · pdas */

  /* ------------------------------------------- Printers */
  /*   portable-bluetooth-printers · desktop-receipt-printers · mobile-label-printers */

  /* ------------------------------------------- Scanners */
  /*   handheld-barcode-scanners · presentation-scanners */

  /* ------------------------------------------- Accessories */
  /*   screens · boards · printer-mechanisms · batteries · keypads */
  /*   housing-covers · ics · chargers · paper-rolls */

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
    subcategory: 'payment-terminals',
    model: 'VX520',
    sku: 'VX520-LAN',
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
      'Supplied with a tested power supply. Sold as a working unit. Cosmetic wear varies between individual units — ask us for photographs of current stock if appearance matters. No payment application or POS software is included; we supply hardware only.',
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
    subcategory: 'payment-terminals',
    model: 'VX675',
    sku: 'VX675-3G',
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
      'Every unit is stripped, cleaned and functionally tested before dispatch, covering the keypad, card reader, printer mechanism and radio. Units are supplied as working hardware without a payment application installed, and cosmetic wear varies between individual units.\n' +
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
    subcategory: 'payment-terminals',
    model: 'ME31',
    sku: 'ME31-GPRS',
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
