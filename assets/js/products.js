  /* ============================================================================
   * pos-mall.com — 产品数据（★ 你后续主要填充这个文件 ★）
   * ----------------------------------------------------------------------------
   * 目前 5 条真实产品：
   *   2026-09-18  从自有阿里店铺迁入 3 条（Verifone VX520 / VX675、Newland ME31）
   *   2026-09-23  新增 2 条 SUNMI V2 Pro（标准版 / Label 标签版），店主自有实拍
   * 新增产品时直接往数组里加对象即可，不需要改动其它文件。
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

  /* --------------------------------------------------------------------------
   * SUNMI V2 Pro —— 两个版本做成两条产品（店主 2026-09-23 决定）
   *   参数来源：https://www.sunmi.us/v2-pro/（官方规格表）
   *   图片：店主自有实拍，白底，已处理至 assets/img/products/
   *   两版外观基本一致（差别在扫描引擎与走纸路径，属内部差异），
   *   因此共用同一组图片。Label 版后续会补「打标签」的实拍。
   *   归类 android-terminals —— 两台都是 Android 手持智能终端。
   * ------------------------------------------------------------------------ */

  {
    id: 'sunmi-v2-pro-handheld-terminal',
    name: 'Refurbished Sunmi V2 Pro Handheld Android POS Terminal',
    brand: 'sunmi',
    category: 'pos-terminals',
    subcategory: 'android-terminals',
    model: 'V2 Pro',
    sku: 'V2 PRO',
    stock: 'in-stock',
    price: null,
    image: 'assets/img/products/sunmi-v2-pro-1.jpg',
    gallery: [
      'assets/img/products/sunmi-v2-pro-2.jpg',
      'assets/img/products/sunmi-v2-pro-3.jpg',
      'assets/img/products/sunmi-v2-pro-4.jpg'
    ],
    shortDesc: 'Android handheld that takes orders, reads cards and prints the receipt from one device — a 5.99" screen with a built-in 58mm thermal printer.',
    description:
      'A handheld Android terminal that covers three jobs at once: taking the order, reading the card and printing the receipt. The 5.99" HD+ touchscreen runs Android, so ordering, queue and payment apps install directly onto the unit, and the built-in 58mm thermal printer produces the receipt at 70mm per second — no second device on the counter.\n' +
      'The radio set is the reason this model suits sites without dependable fixed-line internet: 4G alongside dual-band Wi-Fi, with GPS, Glonass and Beidou for location. The NFC reader handles contactless cards, loyalty and stored-value schemes. The 2580mAh battery is sized to cover a trading shift rather than a few hours.\n' +
      'The scanner reads 1D barcodes. If you also need 2D codes, or need to print labels as well as receipts, the V2 Pro Label Version is the same body with a 2D scan engine and a dual receipt/label paper path.\n' +
      'Each unit is stripped, cleaned and functionally tested in our workshop: touchscreen, printer, scanner, NFC reader, radios and charging are all verified before dispatch. Supplied with a tested power supply. Sold as a working unit. Cosmetic wear varies between individual units — ask us for photographs of current stock if appearance matters. No POS application or payment software is included; we supply hardware only.',
    specs: [
      { label: 'Operating System', value: 'Android with SUNMI OS' },
      { label: 'Processor', value: 'Cortex-A53 quad-core 1.4GHz' },
      { label: 'Memory', value: '2GB RAM + 16GB ROM' },
      { label: 'Display', value: '5.99" HD+ 1440 x 720, capacitive multitouch' },
      { label: 'Barcode Scanning', value: '1D scan engine' },
      { label: 'Rear Camera', value: '5MP autofocus with flashlight' },
      { label: 'Printer', value: 'Built-in 58mm thermal' },
      { label: 'Print Speed', value: '70mm/s' },
      { label: 'Paper Roll', value: 'Up to 40mm diameter' },
      { label: 'NFC Reader', value: 'Type A&B, Mifare, Felica (ISO/IEC 14443, ISO15693)' },
      { label: 'Card Slots', value: '1 x PSAM, 1 x MINI SIM' },
      { label: 'Cellular', value: '2G / 3G / 4G' },
      { label: 'Wi-Fi', value: '2.4GHz / 5GHz (IEEE 802.11 a/b/g/n)' },
      { label: 'Bluetooth', value: '2.1 / 3.0 / 4.2 with BLE' },
      { label: 'Positioning', value: 'GPS, Glonass, Beidou, AGPS' },
      { label: 'Ports', value: '1 x USB Type-C with OTG' },
      { label: 'Battery', value: '7.6V / 2580mAh, non-removable' },
      { label: 'Power Adapter', value: 'AC 100-240V in, DC 5V/2A out' },
      { label: 'Dimensions', value: '215.2 x 83 x 17mm' },
      { label: 'Weight', value: '356g' },
      { label: 'Operating Temperature', value: '-10C to 50C' },
      { label: 'Optional Accessory', value: 'USB cradle (charging and USB port)' }
    ],
    features: [
      'Android handheld with a built-in 58mm receipt printer',
      '5.99" HD+ screen, large enough for order and payment apps',
      '4G plus dual-band Wi-Fi for sites without fixed-line internet',
      'NFC reader for contactless cards and loyalty schemes',
      '1D barcode scan engine built in',
      '2580mAh battery sized for a full trading shift',
      'Stripped, cleaned and functionally tested before dispatch'
    ],
    boxContents: ['Terminal unit', 'Tested power supply'],
    warranty: '',
    featured: false,
    tags: ['android', 'handheld', 'receipt printer', 'nfc', '4g']
  },

  {
    id: 'sunmi-v2-pro-label-version-handheld-terminal',
    name: 'Refurbished Sunmi V2 Pro Label Version Handheld Android POS Terminal',
    brand: 'sunmi',
    category: 'pos-terminals',
    subcategory: 'android-terminals',
    model: 'V2 Pro Label Version',
    sku: 'V2 PRO LABEL',
    stock: 'in-stock',
    price: null,
    image: 'assets/img/products/sunmi-v2-pro-1.jpg',
    gallery: [
      'assets/img/products/sunmi-v2-pro-2.jpg',
      'assets/img/products/sunmi-v2-pro-3.jpg',
      'assets/img/products/sunmi-v2-pro-4.jpg'
    ],
    shortDesc: 'Same handheld Android terminal, but it prints labels as well as receipts and scans 2D codes — one device for the counter and the shelf.',
    description:
      'The Label Version is the same handheld Android terminal as the standard V2 Pro, with two changes that matter in use: the built-in 58mm printer switches between receipt and label mode, and the scan engine reads 2D codes as well as 1D barcodes.\n' +
      'That combination removes a separate label printer from the till. Shelf-edge labels, price tags and product stickers come out of the same unit that takes the order and prints the receipt, and the angled paper path is shaped to reduce label jams during a busy period — the usual weak point when label stock is fed through a receipt mechanism.\n' +
      'The 2D engine is the more practical of the two scanners if your stock carries QR codes, DataMatrix codes or codes that have been scuffed, scratched or reprinted, since a 2D engine recovers barcodes a 1D laser would miss.\n' +
      'Everything else matches the standard model: 5.99" HD+ Android touchscreen, 4G with dual-band Wi-Fi, NFC reader, 2580mAh battery. Each unit is stripped, cleaned and functionally tested in our workshop, including both print modes, before dispatch. Supplied with a tested power supply. Sold as a working unit. Cosmetic wear varies between individual units — ask us for photographs of current stock if appearance matters. No POS application is included; we supply hardware only.',
    specs: [
      { label: 'Operating System', value: 'Android with SUNMI OS' },
      { label: 'Processor', value: 'Cortex-A53 quad-core 1.4GHz' },
      { label: 'Memory', value: '2GB RAM + 16GB ROM' },
      { label: 'Display', value: '5.99" HD+ 1440 x 720, capacitive multitouch' },
      { label: 'Barcode Scanning', value: '2D scan engine' },
      { label: 'Rear Camera', value: '5MP autofocus with flashlight' },
      { label: 'Printer', value: 'Built-in 58mm thermal, receipt and label modes' },
      { label: 'Print Speed', value: '70mm/s in both receipt and label mode' },
      { label: 'Paper Roll', value: 'Up to 40mm diameter' },
      { label: 'Label Paper', value: '50-58mm wide, 20mm high minimum, 2mm gap' },
      { label: 'Paper Path', value: 'Angled path for label stock' },
      { label: 'NFC Reader', value: 'Type A&B, Mifare, Felica (ISO/IEC 14443, ISO15693)' },
      { label: 'Card Slots', value: '1 x PSAM, 1 x MINI SIM' },
      { label: 'Cellular', value: '2G / 3G / 4G' },
      { label: 'Wi-Fi', value: '2.4GHz / 5GHz (IEEE 802.11 a/b/g/n)' },
      { label: 'Bluetooth', value: '2.1 / 3.0 / 4.2 with BLE' },
      { label: 'Positioning', value: 'GPS, Glonass, Beidou, AGPS' },
      { label: 'Ports', value: '1 x USB Type-C with OTG' },
      { label: 'Battery', value: '7.6V / 2580mAh, non-removable' },
      { label: 'Power Adapter', value: 'AC 100-240V in, DC 5V/2A out' },
      { label: 'Dimensions', value: '215.2 x 83 x 17mm' },
      { label: 'Weight', value: '356g' },
      { label: 'Operating Temperature', value: '-10C to 50C' },
      { label: 'Optional Accessory', value: 'USB cradle (charging and USB port)' }
    ],
    features: [
      'Prints both receipts and labels from one 58mm paper path',
      'Angled paper path designed to reduce label jams',
      '2D scan engine reads QR, DataMatrix and worn or damaged codes',
      'Android handheld with a 5.99" HD+ touchscreen',
      '4G plus dual-band Wi-Fi, and an NFC reader for contactless cards',
      'Both print modes tested before dispatch',
      'Replaces a separate label printer at the till'
    ],
    boxContents: ['Terminal unit', 'Tested power supply'],
    warranty: '',
    featured: false,
    tags: ['android', 'handheld', 'label printer', 'receipt printer', '2d scanner', 'nfc']
  },

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
