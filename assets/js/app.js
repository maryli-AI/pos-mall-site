/* ============================================================================
 * pos-mall.com — 站点渲染逻辑
 * ----------------------------------------------------------------------------
 * 页面通过 data-* 属性声明自己要渲染什么，例如：
 *   <body data-page="home">           首页
 *   <body data-page="catalog">        全部产品（带筛选）
 *   <body data-page="category">       类目页  ?cat=receipt-printers
 *   <body data-page="brands">         品牌总览
 *   <body data-page="brand">          品牌页  ?b=epson
 *   <body data-page="product">        产品详情 ?id=xxx
 *   <body data-page="enquiry">        询价清单
 *   <body data-page="page">           静态页（about / contact）
 * ========================================================================== */

/* ---------------------------------------------------------------- 图标库 */
const ICONS = {
  terminal: '<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8.5 20.5h7M12 16.5v4"/>',
  printer: '<path d="M6.5 9V3.5h11V9"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6.5 15h11v5.5h-11z"/>',
  label: '<path d="M3.5 12.5V5a1.5 1.5 0 0 1 1.5-1.5h7.5L21 12l-8.5 8.5z"/><circle cx="8" cy="8" r="1.4"/>',
  barcode: '<path d="M4 5v14M7 5v14M10.5 5v14M13 5v14M16 5v14M19.5 5v14"/>',
  drawer: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 12h18M9 9.5h6"/>',
  kiosk: '<rect x="4" y="2.5" width="16" height="12" rx="2"/><path d="M12 14.5v4M7.5 21.5h9"/>',
  tablet: '<rect x="5.5" y="2.5" width="13" height="19" rx="2"/><path d="M11 18.5h2"/>',
  peripheral: '<path d="M9 3v6M15 3v6"/><rect x="6" y="9" width="12" height="6" rx="2"/><path d="M12 15v3a3 3 0 0 0 3 3h2"/>',
  bundle: '<path d="M3.5 7.5 12 3.5l8.5 4v9l-8.5 4-8.5-4z"/><path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pin: '<path d="M12 21s6.5-6.2 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
  shield: '<path d="M12 3 5 6v6c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 1 0 5 5L21 21H3l9.5-9.5a4 4 0 0 1 2-5z"/>',
  truck: '<path d="M2.5 6.5h10v9h-10z"/><path d="M12.5 10h4l3 3v2.5h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  trash: '<path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13"/>'
};

function icon(name, size) {
  const d = ICONS[name] || ICONS.bundle;
  const s = size || 20;
  return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
}

/* ---------------------------------------------------------------- 工具函数 */
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function param(name) {
  return new URLSearchParams(location.search).get(name);
}
function catById(id) { return CATEGORIES.find(c => c.id === id) || null; }
function subById(cat, subId) {
  if (!cat || !subId) return null;
  return (cat.children || []).find(s => s.id === subId) || null;
}
function brandById(id) { return BRANDS.find(b => b.id === id) || null; }
function brandName(id) { const b = brandById(id); return b ? b.name : (id || ''); }
function conditionById(id) { return CONDITIONS.find(c => c.id === id) || null; }
function stockById(id) { return STOCKS.find(s => s.id === id) || null; }
function priceText(p) {
  if (p.price === null || p.price === undefined || p.price === '') return 'Price on request';
  const n = Number(p.price);
  if (isNaN(n)) return String(p.price);
  const sym = SITE.currency === 'USD' ? '$' : (SITE.currency === 'EUR' ? '€' : (SITE.currency === 'GBP' ? '£' : SITE.currency + ' '));
  return sym + n.toFixed(2);
}
function productUrl(p) { return 'product.html?id=' + encodeURIComponent(p.id); }
function categoryUrl(id, sub) {
  return 'category.html?cat=' + encodeURIComponent(id) + (sub ? '&sub=' + encodeURIComponent(sub) : '');
}
function brandUrl(id) { return 'brand.html?b=' + encodeURIComponent(id); }
function countInCategory(catId, subId) {
  return PRODUCTS.filter(p => p.category === catId && (!subId || p.subcategory === subId)).length;
}
function countInBrand(brandId) { return PRODUCTS.filter(p => p.brand === brandId).length; }

/* -------------------------------------------------- 占位图（无图片时生成） */
function phImage(p) {
  const brand = brandName(p.brand);
  const model = p.model || p.name || '';
  const cat = catById(p.category);
  const iconPath = (ICONS[(cat && cat.icon) || 'bundle'] || ICONS.bundle).replace(/"/g, "'");

  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#f7f9fc"/><stop offset="1" stop-color="#e9eef6"/></linearGradient></defs>' +
    '<rect width="800" height="600" fill="url(#g)"/>' +
    '<g transform="translate(400 258) scale(7.2) translate(-12 -12)" fill="none" stroke="#c6d1e0" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"><g>' + iconPath + '</g></g>' +
    '<text x="400" y="430" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="28" ' +
    'font-weight="600" fill="#8d9aab">' + escXml(brand) + '</text>' +
    '<text x="400" y="466" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="21" ' +
    'fill="#a8b3c2">' + escXml(String(model).slice(0, 42)) + '</text>' +
    '<text x="400" y="556" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="15" ' +
    'letter-spacing="2" fill="#bcc6d4">' + escXml(SITE.domain.toUpperCase()) + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
function escXml(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function imgOf(p) { return p.image ? p.image : phImage(p); }

/* ------------------------------------------------------------ 询价清单(本地) */
const ENQ_KEY = 'posmall.enquiry.v1';
function getEnquiry() {
  try { return JSON.parse(localStorage.getItem(ENQ_KEY) || '[]'); } catch (e) { return []; }
}
function setEnquiry(list) {
  try { localStorage.setItem(ENQ_KEY, JSON.stringify(list)); } catch (e) {}
  syncEnquiryBadge();
}
function addToEnquiry(id, qty) {
  const list = getEnquiry();
  const found = list.find(i => i.id === id);
  if (found) { found.qty = (found.qty || 1) + (qty || 1); }
  else { list.push({ id: id, qty: qty || 1 }); }
  setEnquiry(list);
  const p = PRODUCTS.find(x => x.id === id);
  toast('Added to enquiry: ' + (p ? p.name : id));
}
function removeFromEnquiry(id) {
  setEnquiry(getEnquiry().filter(i => i.id !== id));
}
function enquiryCount() {
  return getEnquiry().reduce((n, i) => n + (i.qty || 1), 0);
}
function syncEnquiryBadge() {
  const n = enquiryCount();
  $$('[data-enquiry-count]').forEach(el => {
    el.textContent = n ? String(n) : '';
    el.classList.toggle('is-empty', !n);
  });
}

/* ---------------------------------------------------------------- 轻提示 */
let toastTimer = null;
function toast(msg) {
  let el = $('#toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = icon('check', 16) + '<span>' + esc(msg) + '</span>';
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2600);
}

/* -------------------------------------------------- 类目下拉（子类目面板） */
/* 顶部导航「平铺」显示 CATEGORIES 全部类目，每个类目悬停展开自己的子类目。 */
function catPanel(c) {
  const kids = c.children || [];
  return '<div class="nav-panel"><div class="nav-panel-inner np-cat-panel">' +
    '<a class="np-simple-all" href="' + categoryUrl(c.id) + '">' +
      '<span>All ' + esc(c.name) + '</span><em>' + countInCategory(c.id) + '</em></a>' +
    (kids.length
      ? '<div class="np-simple-links">' + kids.map(k =>
          '<a href="' + categoryUrl(c.id, k.id) + '">' + esc(k.name) +
          '<em>' + countInCategory(c.id, k.id) + '</em></a>').join('') + '</div>'
      : '') +
    '<div class="np-foot"><span class="np-foot-note">' + esc(c.desc) + '</span></div>' +
  '</div></div>';
}

/* ------------------------------------------------------------ 页头 / 页脚 */
function renderHeader() {
  const mount = $('#site-header');
  if (!mount) return;

  /* 类目条：把 CATEGORIES 平铺展示，各自悬停展开子类目 */
  const catBar = CATEGORIES.map(c => {
    const kids = c.children || [];
    return '<li class="cat-bar-item' + (kids.length ? ' has-panel' : '') + '">' +
      '<a class="cat-bar-link" href="' + categoryUrl(c.id) + '">' + esc(c.name) + '</a>' +
      (kids.length ? catPanel(c) : '') +
    '</li>';
  }).join('') +
    '<li class="cat-bar-item cat-bar-item-all">' +
      '<a class="cat-bar-link cat-bar-link-all" href="catalog.html">' + icon('list', 15) + '<span>All products</span></a>' +
    '</li>';

  mount.innerHTML =
    '<div class="topbar"><div class="shell topbar-inner">' +
      '<div class="topbar-left">' +
        '<a class="topbar-item" href="' + (SITE.phone ? 'tel:' + esc(SITE.phone.replace(/[^+\d]/g, '')) : 'contact.html') + '">' + icon('phone', 15) + '<span>' + esc(SITE.phone) + '</span></a>' +
        '<a class="topbar-item" href="mailto:' + esc(SITE.email) + '">' + icon('mail', 15) + '<span>' + esc(SITE.email) + '</span></a>' +
        '<span class="topbar-item topbar-hide-sm">' + icon('clock', 15) + '<span>' + esc(SITE.hours) + '</span></span>' +
      '</div>' +
      '<div class="topbar-right"><span class="topbar-tag">' + esc(TRADE.paymentNote.split('.')[0]) + '</span></div>' +
    '</div></div>' +

    '<header class="site-header">' +

      '<div class="shell header-main">' +
        '<a class="logo" href="index.html">' +
          '<span class="logo-mark">' + icon('terminal', 20) + '</span>' +
          '<span class="logo-text"><b>' + esc(SITE.logoText) + '</b>' + esc(SITE.logoAccent) + '<i>.' + esc(SITE.domain.split('.').pop()) + '</i></span>' +
        '</a>' +

        '<div class="header-actions">' +
          '<form class="search-box" role="search" id="header-search">' +
            icon('search', 16) +
            '<input type="search" name="q" placeholder="Search model or brand…" aria-label="Search products">' +
          '</form>' +
          '<nav class="util-nav" aria-label="Company">' +
            '<a class="util-link" href="brands.html">Brands</a>' +
            '<a class="util-link" href="about.html">About</a>' +
            '<a class="util-link" href="contact.html">Contact</a>' +
          '</nav>' +
          '<a class="btn btn-outline btn-sm enquiry-btn" href="enquiry.html">' +
            icon('list', 16) + '<span class="enquiry-label">Enquiry list</span>' +
            '<span class="enquiry-count is-empty" data-enquiry-count></span>' +
          '</a>' +
          '<button class="mobile-toggle" type="button" aria-label="Menu" id="mobile-toggle">' + icon('menu', 22) + '</button>' +
        '</div>' +
      '</div>' +

      '<div class="cat-bar">' +
        '<div class="shell cat-bar-inner">' +
          '<nav aria-label="Product categories"><ul class="cat-bar-list">' + catBar + '</ul></nav>' +
        '</div>' +
      '</div>' +

      '<div class="mobile-nav" id="mobile-nav"><div class="shell">' +
        '<a class="mn-link mn-strong" href="catalog.html">All products</a>' +
        CATEGORIES.map(c =>
          '<div class="mn-group">' +
            '<a class="mn-link" href="' + categoryUrl(c.id) + '">' + esc(c.name) + '</a>' +
            ((c.children || []).length
              ? '<div class="mn-subs">' + c.children.map(k =>
                  '<a href="' + categoryUrl(c.id, k.id) + '">' + esc(k.name) + '</a>').join('') + '</div>'
              : '') +
          '</div>').join('') +
        '<a class="mn-link" href="brands.html">Brands</a>' +
        '<a class="mn-link" href="about.html">About</a>' +
        '<a class="mn-link" href="contact.html">Contact</a>' +
        '<a class="mn-link mn-strong" href="enquiry.html">Enquiry list</a>' +
      '</div></div>' +
    '</header>';

  const form = $('#header-search');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = form.q.value.trim();
    location.href = 'catalog.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  });
  const t = $('#mobile-toggle');
  t.addEventListener('click', () => {
    $('#mobile-nav').classList.toggle('is-open');
    t.innerHTML = $('#mobile-nav').classList.contains('is-open') ? icon('close', 22) : icon('menu', 22);
  });
}

function renderFooter() {
  const mount = $('#site-footer');
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML =
    '<div class="footer-cta"><div class="shell footer-cta-inner">' +
      '<div><h3>Need trade pricing?</h3>' +
      '<p>Tell us the models and quantities you need — we reply with stock confirmation, grading and shipping.</p></div>' +
      '<a class="btn btn-primary" href="enquiry.html">' + icon('mail', 17) + ' Request a quotation</a>' +
    '</div></div>' +

    '<footer class="site-footer"><div class="shell footer-grid">' +
      '<div class="footer-col footer-about">' +
        '<a class="logo logo-footer" href="index.html">' +
          '<span class="logo-mark">' + icon('terminal', 18) + '</span>' +
          '<span class="logo-text"><b>' + esc(SITE.logoText) + '</b>' + esc(SITE.logoAccent) + '<i>.' + esc(SITE.domain.split('.').pop()) + '</i></span>' +
        '</a>' +
        '<p>' + esc(SITE.footerNote) + '</p>' +
        '<ul class="footer-contact">' +
          '<li>' + icon('mail', 15) + '<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + '</a></li>' +
          '<li>' + icon('phone', 15) + '<span>' + esc(SITE.phone) + '</span></li>' +
          (SITE.whatsapp ? '<li>' + icon('phone', 15) + '<span>WhatsApp ' + esc(SITE.whatsapp) + '</span></li>' : '') +
          '<li>' + icon('pin', 15) + '<span>' + esc(SITE.addressLine) + ', ' + esc(SITE.addressCity) + '</span></li>' +
          '<li>' + icon('clock', 15) + '<span>' + esc(SITE.hours) + '</span></li>' +
        '</ul>' +
      '</div>' +

      '<div class="footer-col"><h4 class="footer-title">Categories</h4><ul class="footer-links">' +
        CATEGORIES.slice(0, 6).map(c => '<li><a href="' + categoryUrl(c.id) + '">' + esc(c.name) + '</a></li>').join('') +
        '<li><a href="catalog.html">All products</a></li>' +
      '</ul></div>' +

      '<div class="footer-col"><h4 class="footer-title">Shop by brand</h4><ul class="footer-links">' +
        BRANDS.filter(b => countInBrand(b.id) > 0).slice(0, 9)
          .map(b => '<li><a href="' + brandUrl(b.id) + '">' + esc(b.name) + '</a></li>').join('') +
        '<li><a href="brands.html">All brands</a></li>' +
      '</ul></div>' +

      '<div class="footer-col"><h4 class="footer-title">Information</h4><ul class="footer-links">' +
        '<li><a href="about.html">About us</a></li>' +
        '<li><a href="catalog.html">Product catalogue</a></li>' +
        '<li><a href="enquiry.html">Request a quotation</a></li>' +
        '<li><a href="contact.html">Contact</a></li>' +
        '<li><a href="about.html#grading">Condition grading</a></li>' +
        '<li><a href="about.html#warranty">Warranty &amp; returns</a></li>' +
      '</ul></div>' +
    '</div>' +

    '<div class="shell footer-note"><p><b>Please note:</b> ' + esc(SITE.footerNote) + '</p></div>' +

    '<div class="footer-bottom"><div class="shell footer-bottom-inner">' +
      '<span>© ' + year + ' ' + esc(SITE.name) + ' — ' + esc(SITE.domain) + '. All rights reserved.</span>' +
      '<span class="footer-bottom-links"><a href="about.html">Terms</a><a href="about.html">Privacy</a><a href="contact.html">Contact</a></span>' +
    '</div></div></footer>';
}

/* ------------------------------------------------------------ 面包屑 */
function renderBreadcrumbs(items) {
  const mount = $('#breadcrumbs');
  if (!mount) return;
  const parts = [{ label: 'Home', href: 'index.html' }].concat(items || []);
  mount.innerHTML = '<div class="shell"><nav class="breadcrumbs" aria-label="Breadcrumb">' +
    parts.map((it, i) => {
      const last = i === parts.length - 1;
      return (last || !it.href)
        ? '<span class="crumb is-current">' + esc(it.label) + '</span>'
        : '<a class="crumb" href="' + esc(it.href) + '">' + esc(it.label) + '</a>' +
          '<span class="crumb-sep">' + icon('chevron', 12) + '</span>';
    }).join('') + '</nav></div>';
}

/* ------------------------------------------------------------ 产品卡片 */
function conditionBadge(p) {
  const c = conditionById(p.condition);
  if (!c) return '';
  return '<span class="badge badge-' + c.tone + '">' + esc(c.short) + '</span>';
}
function stockBadge(p) {
  const s = stockById(p.stock);
  if (!s) return '';
  return '<span class="badge badge-ghost badge-' + s.tone + '-text"><i class="dot dot-' + s.tone + '"></i>' + esc(s.name) + '</span>';
}

function productCard(p) {
  const cat = catById(p.category);
  return '<article class="product-card">' +
    '<a class="pc-media" href="' + productUrl(p) + '" aria-label="' + esc(p.name) + '">' +
      '<img src="' + esc(imgOf(p)) + '" alt="' + esc(p.name) + '" loading="lazy">' +
      '<span class="pc-badges">' + conditionBadge(p) + '</span>' +
    '</a>' +
    '<div class="pc-body">' +
      '<div class="pc-eyebrow"><span class="pc-brand">' + esc(brandName(p.brand)) + '</span>' +
      (cat ? '<span class="pc-cat">' + esc(cat.short) + '</span>' : '') + '</div>' +
      '<h3 class="pc-title"><a href="' + productUrl(p) + '">' + esc(p.name) + '</a></h3>' +
      (p.model ? '<p class="pc-model">Model ' + esc(p.model) + (p.sku ? ' · ' + esc(p.sku) : '') + '</p>' : '') +
      '<p class="pc-desc">' + esc(p.shortDesc || '') + '</p>' +
      '<div class="pc-foot">' +
        '<div class="pc-price"><span class="pc-price-val' + (p.price == null ? ' is-quote' : '') + '">' + esc(priceText(p)) + '</span>' + stockBadge(p) + '</div>' +
        '<div class="pc-actions">' +
          '<a class="btn btn-ghost btn-sm" href="' + productUrl(p) + '">Details</a>' +
          '<button class="btn btn-primary btn-sm" type="button" data-enquire="' + esc(p.id) + '">' + icon('list', 14) + 'Enquire</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</article>';
}

function productGrid(list, emptyMsg) {
  if (!list.length) {
    return '<div class="empty-state">' + icon('search', 30) +
      '<h3>' + esc(emptyMsg || 'No products match these filters') + '</h3>' +
      '<p>Try clearing a filter, or tell us the model you need and we will source it.</p>' +
      '<a class="btn btn-primary" href="enquiry.html">Request a sourcing quote</a></div>';
  }
  return '<div class="product-grid">' + list.map(productCard).join('') + '</div>';
}

/* ------------------------------------------------------------ 首页渲染 */
function renderHome() {
  const featured = PRODUCTS.filter(p => p.featured);
  const feats = (featured.length ? featured : PRODUCTS).slice(0, 8);
  const allBrands = BRANDS.filter(b => countInBrand(b.id) > 0);

  if ($('#home-categories')) {
    $('#home-categories').innerHTML = CATEGORIES.map(c =>
      '<a class="cat-card" href="' + categoryUrl(c.id) + '">' +
        '<span class="cat-icon">' + icon(c.icon, 22) + '</span>' +
        '<span class="cat-body">' +
          '<span class="cat-name">' + esc(c.name) + '</span>' +
          '<span class="cat-desc">' + esc(c.desc) + '</span>' +
          '<span class="cat-count">' + countInCategory(c.id) + ' product' + (countInCategory(c.id) === 1 ? '' : 's') + '</span>' +
        '</span>' +
        '<span class="cat-go">' + icon('arrow', 16) + '</span>' +
      '</a>').join('');
  }

  if ($('#home-featured')) {
    $('#home-featured').innerHTML = productGrid(feats);
  }

  if ($('#home-brands')) {
    $('#home-brands').innerHTML = allBrands.map(b =>
      '<a class="brand-chip" href="' + brandUrl(b.id) + '">' +
        '<span class="brand-chip-name">' + esc(b.name) + '</span>' +
        '<span class="brand-chip-n">' + countInBrand(b.id) + '</span>' +
      '</a>').join('');
  }

  if ($('#home-conditions')) {
    $('#home-conditions').innerHTML = CONDITIONS.map(c =>
      '<div class="cond-card cond-' + c.tone + '">' +
        '<span class="cond-badge badge badge-' + c.tone + '">' + esc(c.name) + '</span>' +
        '<p>' + esc(c.desc) + '</p>' +
        '<a class="link-arrow" href="catalog.html?condition=' + c.id + '">Browse ' + esc(c.short) + ' stock ' + icon('arrow', 13) + '</a>' +
      '</div>').join('');
  }

  /* 首屏数字随数据自动更新 */
  $$('[data-stat]').forEach(el => {
    const k = el.getAttribute('data-stat');
    const n = k === 'categories' ? CATEGORIES.length
      : k === 'brands' ? BRANDS.filter(b => countInBrand(b.id) > 0).length
      : PRODUCTS.length;
    el.textContent = n;
  });
}

/* ------------------------------------------------------------ 目录页渲染 */
const PAGE_SIZE = 12;
function renderCatalog() {
  const wrap = $('#catalog-results');
  if (!wrap) return;

  const state = {
    q: param('q') || '',
    cat: param('cat') || '',
    sub: param('sub') || '',
    brand: param('brand') || '',
    condition: param('condition') || '',
    stock: param('stock') || '',
    sort: param('sort') || 'featured',
    page: parseInt(param('page') || '1', 10) || 1
  };

  /* --- 侧边筛选器 --- */
  const filterMount = $('#catalog-filters');
  if (filterMount) {
    filterMount.innerHTML =
      '<div class="filter-head"><span>' + icon('list', 16) + ' Filters</span>' +
      '<button type="button" class="link-btn" id="clear-filters">Clear all</button></div>' +

      '<div class="filter-group">' +
        '<label class="filter-title" for="f-q">Keyword</label>' +
        '<input class="input" id="f-q" type="search" placeholder="e.g. TM-T88, ZD410" value="' + esc(state.q) + '">' +
      '</div>' +

      '<div class="filter-group"><span class="filter-title">Category</span><div class="filter-opts">' +
        '<label class="filter-opt' + (!state.cat ? ' is-active' : '') + '"><input type="radio" name="f-cat" value=""' + (!state.cat ? ' checked' : '') + '><span>All categories</span><em>' + PRODUCTS.length + '</em></label>' +
        CATEGORIES.map(c =>
          '<label class="filter-opt' + (state.cat === c.id ? ' is-active' : '') + '"><input type="radio" name="f-cat" value="' + c.id + '"' + (state.cat === c.id ? ' checked' : '') + '><span>' + esc(c.name) + '</span><em>' + countInCategory(c.id) + '</em></label>'
        ).join('') +
      '</div></div>' +

      (state.cat && catById(state.cat) && (catById(state.cat).children || []).length
        ? '<div class="filter-group"><span class="filter-title">Type</span><div class="filter-opts">' +
            '<label class="filter-opt' + (!state.sub ? ' is-active' : '') + '"><input type="radio" name="f-sub" value=""' + (!state.sub ? ' checked' : '') + '><span>All types</span></label>' +
            catById(state.cat).children.map(k =>
              '<label class="filter-opt' + (state.sub === k.id ? ' is-active' : '') + '"><input type="radio" name="f-sub" value="' + k.id + '"' + (state.sub === k.id ? ' checked' : '') + '><span>' + esc(k.name) + '</span><em>' + countInCategory(state.cat, k.id) + '</em></label>'
            ).join('') +
          '</div></div>'
        : '') +

      '<div class="filter-group"><span class="filter-title">Condition</span><div class="filter-opts">' +
        '<label class="filter-opt' + (!state.condition ? ' is-active' : '') + '"><input type="radio" name="f-cond" value=""' + (!state.condition ? ' checked' : '') + '><span>Any condition</span></label>' +
        CONDITIONS.map(c =>
          '<label class="filter-opt' + (state.condition === c.id ? ' is-active' : '') + '"><input type="radio" name="f-cond" value="' + c.id + '"' + (state.condition === c.id ? ' checked' : '') + '><span>' + esc(c.name) + '</span><em>' + PRODUCTS.filter(p => p.condition === c.id).length + '</em></label>'
        ).join('') +
      '</div></div>' +

      '<div class="filter-group"><span class="filter-title">Brand</span><div class="filter-opts filter-opts-brand">' +
        '<label class="filter-opt' + (!state.brand ? ' is-active' : '') + '"><input type="radio" name="f-brand" value=""' + (!state.brand ? ' checked' : '') + '><span>All brands</span></label>' +
        BRANDS.filter(b => countInBrand(b.id) > 0).map(b =>
          '<label class="filter-opt' + (state.brand === b.id ? ' is-active' : '') + '"><input type="radio" name="f-brand" value="' + b.id + '"' + (state.brand === b.id ? ' checked' : '') + '><span>' + esc(b.name) + '</span><em>' + countInBrand(b.id) + '</em></label>'
        ).join('') +
      '</div></div>' +

      '<div class="filter-group"><span class="filter-title">Availability</span><div class="filter-opts">' +
        '<label class="filter-opt' + (!state.stock ? ' is-active' : '') + '"><input type="radio" name="f-stock" value=""' + (!state.stock ? ' checked' : '') + '><span>Any</span></label>' +
        STOCKS.map(s =>
          '<label class="filter-opt' + (state.stock === s.id ? ' is-active' : '') + '"><input type="radio" name="f-stock" value="' + s.id + '"' + (state.stock === s.id ? ' checked' : '') + '><span>' + esc(s.name) + '</span></label>'
        ).join('') +
      '</div></div>';
  }

  /* --- 过滤 --- */
  let list = PRODUCTS.slice();
  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter(p =>
      (p.name + ' ' + (p.model || '') + ' ' + (p.sku || '') + ' ' + brandName(p.brand) + ' ' + (p.tags || []).join(' '))
        .toLowerCase().indexOf(q) > -1);
  }
  if (state.cat) list = list.filter(p => p.category === state.cat);
  if (state.sub) list = list.filter(p => p.subcategory === state.sub);
  if (state.brand) list = list.filter(p => p.brand === state.brand);
  if (state.condition) list = list.filter(p => p.condition === state.condition);
  if (state.stock) list = list.filter(p => p.stock === state.stock);

  const condOrder = { refurbished: 0, 'used-a': 1, 'used-b': 2, 'used-c': 3 };
  const sorters = {
    featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
    name: (a, b) => a.name.localeCompare(b.name),
    brand: (a, b) => brandName(a.brand).localeCompare(brandName(b.brand)) || a.name.localeCompare(b.name),
    condition: (a, b) => (condOrder[a.condition] ?? 9) - (condOrder[b.condition] ?? 9) || a.name.localeCompare(b.name),
    price: (a, b) => (a.price == null ? 1e12 : a.price) - (b.price == null ? 1e12 : b.price)
  };
  list.sort(sorters[state.sort] || sorters.featured);

  /* --- 结果条 --- */
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, state.page), pages);
  const pageItems = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const crumbLabel = state.sub && catById(state.cat)
    ? (subById(catById(state.cat), state.sub) || {}).name
    : (state.cat && catById(state.cat) ? catById(state.cat).name : 'All products');

  const bar = $('#catalog-bar');
  if (bar) {
    bar.innerHTML =
      '<div class="results-count"><b>' + total + '</b> item' + (total === 1 ? '' : 's') +
        (state.q ? ' for “' + esc(state.q) + '”' : '') + '</div>' +
      '<div class="results-tools">' +
        '<label class="sort-label" for="sort">Sort</label>' +
        '<select class="sort-select" id="sort">' +
          ['featured|Featured first', 'name|Name A–Z', 'brand|Brand A–Z', 'condition|Best condition', 'price|Price low to high']
            .map(o => { const v = o.split('|'); return '<option value="' + v[0] + '"' + (state.sort === v[0] ? ' selected' : '') + '>' + v[1] + '</option>'; }).join('') +
        '</select>' +
      '</div>';
  }

  wrap.innerHTML = productGrid(pageItems);

  const pg = $('#catalog-pagination');
  if (pg) {
    if (pages <= 1) { pg.innerHTML = ''; }
    else {
      const link = n => {
        const p = Object.assign({}, state, { page: n });
        const qs = Object.keys(p).filter(k => p[k] !== '' && !(k === 'page' && n === 1))
          .map(k => k + '=' + encodeURIComponent(p[k])).join('&');
        return 'catalog.html' + (qs ? '?' + qs : '');
      };
      let out = '<button class="page-btn" type="button" data-goto="' + link(page - 1) + '"' + (page === 1 ? ' disabled' : '') + '>' + icon('chevron', 14) + '</button>';
      for (let i = 1; i <= pages; i++) {
        if (pages > 7 && i > 2 && i < pages - 1 && Math.abs(i - page) > 1) {
          if (i === 3) out += '<span class="page-gap">…</span>';
          continue;
        }
        out += '<button class="page-btn' + (i === page ? ' is-on' : '') + '" type="button" data-goto="' + link(i) + '">' + i + '</button>';
      }
      out += '<button class="page-btn" type="button" data-goto="' + link(page + 1) + '"' + (page === pages ? ' disabled' : '') + '>' + icon('chevron', 14) + '</button>';
      pg.innerHTML = out;
    }
  }

  const title = $('#catalog-title');
  if (title) title.textContent = crumbLabel;
  document.title = crumbLabel +
    (state.brand ? ' — ' + brandName(state.brand) : '') +
    (state.condition && conditionById(state.condition) ? ' (' + conditionById(state.condition).short + ')' : '') +
    ' | ' + SITE.name;

  /* --- 交互 --- */
  const navigate = (patch) => {
    const next = Object.assign({}, state, patch, { page: 1 });
    const qs = Object.keys(next).filter(k => next[k] !== '' && k !== 'page')
      .map(k => k + '=' + encodeURIComponent(next[k])).join('&');
    location.href = 'catalog.html' + (qs ? '?' + qs : '');
  };

  $$('#catalog-filters input[type=radio]').forEach(r => r.addEventListener('change', () => {
    const name = r.name;
    const key = { 'f-cat': 'cat', 'f-sub': 'sub', 'f-cond': 'condition', 'f-brand': 'brand', 'f-stock': 'stock' }[name];
    const patch = {}; patch[key] = r.value;
    if (key === 'cat') patch.sub = '';
    navigate(patch);
  }));

  const qInput = $('#f-q');
  if (qInput) {
    let deb = null;
    qInput.addEventListener('input', () => {
      clearTimeout(deb);
      deb = setTimeout(() => navigate({ q: qInput.value.trim() }), 420);
    });
  }

  const clear = $('#clear-filters');
  if (clear) clear.addEventListener('click', () => { location.href = 'catalog.html'; });

  const sortSel = $('#sort');
  if (sortSel) sortSel.addEventListener('change', () => navigate({ sort: sortSel.value }));

  $$('#catalog-pagination [data-goto]').forEach(b =>
    b.addEventListener('click', () => { if (!b.disabled) location.href = b.getAttribute('data-goto'); }));
}

/* ------------------------------------------------------------ 类目页渲染 */
function renderCategoryPage() {
  const cat = catById(param('cat'));
  if (!cat) { location.replace('catalog.html'); return; }
  const sub = subById(cat, param('sub'));

  document.title = (sub ? sub.name : cat.name) + ' — ' + SITE.name;
  const h = $('#cat-heading'); if (h) h.textContent = sub ? sub.name : cat.name;
  const d = $('#cat-desc'); if (d) d.textContent = cat.desc;
  const i = $('#cat-icon'); if (i) i.innerHTML = icon(cat.icon, 26);

  renderBreadcrumbs([
    { label: cat.name, href: categoryUrl(cat.id) },
    ...(sub ? [{ label: sub.name }] : [])
  ]);

  const subMount = $('#cat-subs');
  if (subMount) {
    const kids = cat.children || [];
    subMount.innerHTML = kids.length
      ? '<a class="chip' + (!sub ? ' is-on' : '') + '" href="' + categoryUrl(cat.id) + '">All ' + esc(cat.name) + '<em>' + countInCategory(cat.id) + '</em></a>' +
        kids.map(k => '<a class="chip' + (sub && sub.id === k.id ? ' is-on' : '') + '" href="' + categoryUrl(cat.id, k.id) + '">' +
          esc(k.name) + '<em>' + countInCategory(cat.id, k.id) + '</em></a>').join('')
      : '';
  }

  const list = PRODUCTS.filter(p => p.category === cat.id && (!sub || p.subcategory === sub.id));
  const wrap = $('#cat-results');
  if (wrap) wrap.innerHTML = productGrid(list, 'No stock listed in this category yet');

  const sideMount = $('#cat-side');
  if (sideMount) {
    const others = CATEGORIES.filter(c => c.id !== cat.id);
    sideMount.innerHTML =
      '<div class="aside-card"><h4>Other categories</h4><ul class="aside-list">' +
        others.map(c => '<li><a href="' + categoryUrl(c.id) + '">' + esc(c.name) + '<em>' + countInCategory(c.id) + '</em></a></li>').join('') +
      '</ul></div>' +
      '<div class="aside-card aside-cta"><h4>Looking for a specific model?</h4>' +
        '<p>We hold stock beyond what is listed. Send us the model numbers and quantities.</p>' +
        '<a class="btn btn-primary btn-block" href="enquiry.html">Request a quotation</a></div>';
  }
}

/* ------------------------------------------------------------ 品牌页渲染 */
function renderBrandsPage() {
  const mount = $('#brands-list');
  if (!mount) return;
  const withStock = BRANDS.filter(b => countInBrand(b.id) > 0);
  const without = BRANDS.filter(b => countInBrand(b.id) === 0);

  mount.innerHTML =
    '<div class="brand-grid">' + withStock.map(b =>
      '<a class="brand-card" href="' + brandUrl(b.id) + '">' +
        '<div class="brand-card-top"><span class="brand-mono">' + esc(initials(b.name)) + '</span>' +
        '<span class="brand-card-n">' + countInBrand(b.id) + ' item' + (countInBrand(b.id) === 1 ? '' : 's') + '</span></div>' +
        '<h3>' + esc(b.name) + '</h3>' +
        '<p>' + esc(b.blurb) + '</p>' +
        '<span class="brand-origin">' + esc(b.origin) + '</span>' +
      '</a>').join('') + '</div>' +
    (without.length
      ? '<div class="brand-also"><h3>Also sourced on request</h3><p>' + without.map(b => esc(b.name)).join(' · ') + '</p></div>'
      : '');
}
function initials(name) {
  return String(name).split(/[\s/]+/).filter(Boolean).slice(0, 3).map(w => w[0].toUpperCase()).join('');
}

function renderBrandPage() {
  const b = brandById(param('b'));
  if (!b) { location.replace('brands.html'); return; }
  document.title = b.name + ' — ' + SITE.name;
  const h = $('#brand-heading'); if (h) h.textContent = b.name;
  const d = $('#brand-desc'); if (d) d.textContent = b.blurb;
  const o = $('#brand-origin'); if (o) o.textContent = b.origin;
  const mono = $('#brand-mono'); if (mono) mono.textContent = initials(b.name);

  renderBreadcrumbs([{ label: 'Brands', href: 'brands.html' }, { label: b.name }]);

  const list = PRODUCTS.filter(p => p.brand === b.id);
  const wrap = $('#brand-results');
  if (wrap) wrap.innerHTML = productGrid(list, 'No ' + b.name + ' stock listed right now');

  const sideMount = $('#brand-side');
  if (sideMount) {
    const others = BRANDS.filter(x => x.id !== b.id && countInBrand(x.id) > 0);
    sideMount.innerHTML =
      '<div class="aside-card"><h4>Brands with stock</h4><ul class="aside-list">' +
        others.map(x => '<li><a href="' + brandUrl(x.id) + '">' + esc(x.name) + '<em>' + countInBrand(x.id) + '</em></a></li>').join('') +
      '</ul></div>' +
      '<div class="aside-card aside-cta"><h4>Need ' + esc(b.name) + ' in volume?</h4>' +
        '<p>Tell us the models and quantities — we quote trade pricing and lead time.</p>' +
        '<a class="btn btn-primary btn-block" href="enquiry.html">Request a quotation</a></div>';
  }
}

/* ------------------------------------------------------------ 详情页渲染 */
function renderProductPage() {
  const p = PRODUCTS.find(x => x.id === param('id'));
  if (!p) { location.replace('catalog.html'); return; }
  const cat = catById(p.category);
  const sub = subById(cat, p.subcategory);
  const brand = brandById(p.brand);

  document.title = p.name + ' — ' + SITE.name;
  renderBreadcrumbs([
    ...(cat ? [{ label: cat.name, href: categoryUrl(cat.id) }] : []),
    ...(cat && sub ? [{ label: sub.name, href: categoryUrl(cat.id, sub.id) }] : []),
    { label: p.name }
  ]);

  const gallery = (p.gallery && p.gallery.length) ? [imgOf(p)].concat(p.gallery) : [imgOf(p)];
  const cond = conditionById(p.condition);
  const st = stockById(p.stock);

  const mount = $('#product-detail');
  if (!mount) return;
  mount.innerHTML =
    '<div class="pd-gallery">' +
      '<div class="pd-main-media"><img id="pd-hero" src="' + esc(gallery[0]) + '" alt="' + esc(p.name) + '">' +
        '<span class="pc-badges">' + conditionBadge(p) + '</span></div>' +
      (gallery.length > 1
        ? '<div class="pd-thumbs">' + gallery.map((g, i) =>
            '<button class="pd-thumb' + (i === 0 ? ' is-on' : '') + '" type="button" data-src="' + esc(g) + '"><img src="' + esc(g) + '" alt=""></button>').join('') + '</div>'
        : '') +
    '</div>' +

    '<div class="pd-info">' +
      '<div class="pd-eyebrow">' +
        (brand ? '<a href="' + brandUrl(brand.id) + '" class="chip chip-brand">' + esc(brand.name) + '</a>' : '') +
        (cat ? '<a href="' + categoryUrl(cat.id) + '" class="chip">' + esc(cat.name) + '</a>' : '') +
        (sub ? '<a href="' + categoryUrl(cat.id, sub.id) + '" class="chip">' + esc(sub.name) + '</a>' : '') +
      '</div>' +
      '<h1 class="pd-title">' + esc(p.name) + '</h1>' +
      '<div class="pd-meta">' +
        (p.model ? '<span><b>Model</b> ' + esc(p.model) + '</span>' : '') +
        (p.sku ? '<span><b>Part no.</b> ' + esc(p.sku) + '</span>' : '') +
        (p.qty ? '<span><b>Available</b> ' + esc(p.qty) + ' units</span>' : '') +
      '</div>' +

      '<div class="pd-badges">' +
        (cond ? '<span class="badge badge-' + cond.tone + '">' + esc(cond.name) + '</span>' : '') +
        (st ? '<span class="badge badge-ghost badge-' + st.tone + '-text"><i class="dot dot-' + st.tone + '"></i>' + esc(st.name) + '</span>' : '') +
      '</div>' +

      '<p class="pd-lede">' + esc(p.shortDesc || '') + '</p>' +

      '<div class="pd-buy">' +
        '<div class="pd-price"><span class="pd-price-val' + (p.price == null ? ' is-quote' : '') + '">' + esc(priceText(p)) + '</span>' +
          '<span class="pd-price-note">' + (p.price == null ? 'Trade pricing — request a quote for volume rates' : 'Excludes shipping and duties') + '</span></div>' +
        '<div class="pd-buy-actions">' +
          '<button class="btn btn-primary btn-lg" type="button" data-enquire="' + esc(p.id) + '">' + icon('list', 17) + ' Add to enquiry</button>' +
          '<a class="btn btn-outline btn-lg" href="contact.html">' + icon('mail', 17) + ' Ask a question</a>' +
        '</div>' +
      '</div>' +

      '<ul class="pd-assure">' +
        '<li>' + icon('shield', 17) + '<span>' + esc(p.warranty || TRADE.warrantyNote) + '</span></li>' +
        '<li>' + icon('wrench', 17) + '<span>' + esc(TRADE.gradingNote) + '</span></li>' +
        '<li>' + icon('truck', 17) + '<span>' + esc(TRADE.shippingNote) + '</span></li>' +
        '<li>' + icon('check', 17) + '<span>' + esc(TRADE.paymentNote) + '</span></li>' +
      '</ul>' +
    '</div>' +

    '<div class="pd-tabs">' +
      '<section class="pd-block"><h2>Description</h2><div class="prose">' +
        esc(p.description || p.shortDesc || '').replace(/\n/g, '<br>') + '</div></section>' +

      (p.specs && p.specs.length
        ? '<section class="pd-block"><h2>Specifications</h2><table class="spec-table"><tbody>' +
            p.specs.map(s => '<tr><th>' + esc(s.label) + '</th><td>' + esc(s.value) + '</td></tr>').join('') +
          '</tbody></table></section>'
        : '') +

      (p.features && p.features.length
        ? '<section class="pd-block"><h2>Key points</h2><ul class="feature-list">' +
            p.features.map(f => '<li>' + icon('check', 16) + '<span>' + esc(f) + '</span></li>').join('') +
          '</ul></section>'
        : '') +

      (p.compat && p.compat.length
        ? '<section class="pd-block"><h2>Compatible with</h2><div class="chip-row">' +
            p.compat.map(c => '<span class="chip chip-soft">' + esc(c) + '</span>').join('') +
          '</div></section>'
        : '') +

      (p.boxContents && p.boxContents.length
        ? '<section class="pd-block"><h2>What&rsquo;s in the box</h2><ul class="bullet-list">' +
            p.boxContents.map(b => '<li>' + esc(b) + '</li>').join('') +
          '</ul></section>'
        : '') +

      '<section class="pd-block pd-block-note"><h2>Buying notes</h2><ul class="bullet-list">' +
        '<li>Hardware only — we do not supply or license POS software.</li>' +
        '<li>' + esc(TRADE.enquiryNote) + '</li>' +
        '<li>' + esc(TRADE.paymentNote) + '</li>' +
      '</ul></section>' +
    '</div>';

  $$('.pd-thumb').forEach(t => t.addEventListener('click', () => {
    $('#pd-hero').src = t.getAttribute('data-src');
    $$('.pd-thumb').forEach(x => x.classList.remove('is-on'));
    t.classList.add('is-on');
  }));

  const rel = PRODUCTS.filter(x => x.id !== p.id && (x.brand === p.brand || x.category === p.category)).slice(0, 4);
  const relWrap = $('#product-related');
  if (relWrap) {
    relWrap.innerHTML = rel.length
      ? '<div class="section-head"><div><h2 class="section-title">Related hardware</h2>' +
        '<p class="section-sub">Same brand or category</p></div></div>' + productGrid(rel)
      : '';
  }
}

/* ------------------------------------------------------------ 询价页渲染 */
function renderEnquiryPage() {
  const tbody = $('#enquiry-body');
  if (!tbody) return;

  function paint() {
    const items = getEnquiry();
    const rows = items.map(it => {
      const p = PRODUCTS.find(x => x.id === it.id);
      const name = p ? p.name : it.id;
      const meta = p ? [brandName(p.brand), p.model, p.sku ? 'Part ' + p.sku : ''].filter(Boolean).join(' · ') : 'Item not in catalogue';
      const cond = p && conditionById(p.condition) ? '<span class="badge badge-' + conditionById(p.condition).tone + '">' + esc(conditionById(p.condition).short) + '</span>' : '';
      return '<tr data-id="' + esc(it.id) + '">' +
        '<td class="enq-prod"><div class="enq-media">' + (p ? '<img src="' + esc(imgOf(p)) + '" alt="">' : '<span class="enq-noimg">' + icon('bundle', 20) + '</span>') + '</div>' +
          '<div><b>' + esc(name) + '</b><span class="enq-meta">' + esc(meta) + '</span>' + cond + '</div></td>' +
        '<td class="enq-qty"><input class="input input-qty" type="number" min="1" value="' + (it.qty || 1) + '" data-qty="' + esc(it.id) + '"></td>' +
        '<td class="enq-del"><button class="icon-btn" type="button" data-remove="' + esc(it.id) + '" aria-label="Remove">' + icon('trash', 16) + '</button></td>' +
      '</tr>';
    }).join('');

    tbody.innerHTML = rows;

    const empty = $('#enquiry-empty');
    const table = $('#enquiry-table');
    const form = $('#enquiry-form-wrap');
    const actions = $('#enquiry-actions');
    const has = items.length > 0;
    if (empty) empty.classList.toggle('is-hidden', has);
    if (table) table.classList.toggle('is-hidden', !has);
    if (form) form.classList.toggle('is-hidden', !has);
    if (actions) actions.classList.toggle('is-hidden', !has);

    const counter = $('#enquiry-counter');
    if (counter) counter.textContent = items.length + ' line' + (items.length === 1 ? '' : 's') + ' · ' + enquiryCount() + ' unit' + (enquiryCount() === 1 ? '' : 's');

    $$('[data-remove]', tbody).forEach(b => b.addEventListener('click', () => {
      removeFromEnquiry(b.getAttribute('data-remove'));
      paint();
    }));
    $$('[data-qty]', tbody).forEach(inp => inp.addEventListener('change', () => {
      const list = getEnquiry();
      const f = list.find(x => x.id === inp.getAttribute('data-qty'));
      if (f) { f.qty = Math.max(1, parseInt(inp.value, 10) || 1); setEnquiry(list); paint(); }
    }));
  }

  paint();

  const clearAll = $('#enquiry-clear');
  if (clearAll) clearAll.addEventListener('click', () => { setEnquiry([]); paint(); });

  const form = $('#enquiry-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const items = getEnquiry();
      if (!items.length) return;
      const data = new FormData(form);
      const lines = items.map(it => {
        const p = PRODUCTS.find(x => x.id === it.id);
        return '• ' + (p ? p.name : it.id) + (p && p.sku ? ' [' + p.sku + ']' : '') + ' — qty ' + (it.qty || 1);
      }).join('\n');
      const body =
        'Company: ' + (data.get('company') || '') + '\n' +
        'Contact: ' + (data.get('name') || '') + '\n' +
        'Email: ' + (data.get('email') || '') + '\n' +
        'Phone: ' + (data.get('phone') || '') + '\n' +
        'Country: ' + (data.get('country') || '') + '\n\n' +
        'Items requested:\n' + lines + '\n\n' +
        'Notes:\n' + (data.get('message') || '');
      const href = 'mailto:' + SITE.email +
        '?subject=' + encodeURIComponent('Quotation request — ' + items.length + ' item(s)') +
        '&body=' + encodeURIComponent(body);

      const done = $('#enquiry-done');
      if (done) {
        done.classList.remove('is-hidden');
        $('#enquiry-done-ref').textContent = 'REF-' + Date.now().toString(36).toUpperCase();
      }
      window.location.href = href;
    });
  }
}

/* ------------------------------------------------------------ 搜索页兜底 */
function renderSearchNote() {
  const q = param('q');
  const note = $('#search-note');
  if (note && q) note.textContent = 'Search results for “' + q + '”';
}

/* ------------------------------------------------------------ 联系表单 */
function renderContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const body =
      'Name: ' + (d.get('name') || '') + '\n' +
      'Company: ' + (d.get('company') || '') + '\n' +
      'Email: ' + (d.get('email') || '') + '\n' +
      'Phone: ' + (d.get('phone') || '') + '\n\n' +
      (d.get('message') || '');
    const href = 'mailto:' + SITE.email +
      '?subject=' + encodeURIComponent(d.get('subject') || 'Website enquiry') +
      '&body=' + encodeURIComponent(body);
    const done = $('#contact-done');
    if (done) done.classList.remove('is-hidden');
    window.location.href = href;
  });
}

/* ------------------------------------------------------------ 静态页面包屑 */
function renderStaticBreadcrumb() {
  let label = document.body.getAttribute('data-crumb');
  if (!label) {
    const parts = document.title.split('—');
    label = (parts.length > 1 ? parts[0] : parts[0]).trim();
  }
  renderBreadcrumbs([{ label: label || 'Page' }]);
}

/* ------------------------------------------------------------ 全局委托 */
function bindGlobal() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-enquire]');
    if (btn) { addToEnquiry(btn.getAttribute('data-enquire'), 1); }
  });
}

/* ---------------------------------------------------------------- 启动 */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  bindGlobal();
  syncEnquiryBadge();

  const page = document.body.getAttribute('data-page');
  switch (page) {
    case 'home': renderHome(); break;
    case 'catalog': renderSearchNote(); renderCatalog(); break;
    case 'category': renderCategoryPage(); break;
    case 'brands': renderBrandsPage(); break;
    case 'brand': renderBrandPage(); break;
    case 'product': renderProductPage(); break;
    case 'enquiry': renderEnquiryPage(); break;
    case 'page': renderStaticBreadcrumb(); renderContactForm(); break;
    default: break;
  }

  /* 首页也给出「全部产品」快捷筛选入口 */
  const quick = $('#home-quick-conditions');
  if (quick) {
    quick.innerHTML = CONDITIONS.map(c =>
      '<a class="chip" href="catalog.html?condition=' + c.id + '">' + esc(c.name) + '</a>').join('');
  }
});
