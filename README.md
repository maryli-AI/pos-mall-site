# pos-mall.com — 站点框架

二手 / 翻新 POS 硬件独立站。**纯静态站点**（HTML + CSS + 原生 JS，无构建步骤、无依赖），
可直接丢到任意静态托管（CloudStudio / Netlify / Vercel / Nginx / OSS+CDN）。

定位：**只做硬件销售** —— 无软件、无回收/换新、无线上下单。购买路径为「加入询价清单 → 提交询价 → 线下报价」。

---

## 1. 目录结构

```
pos-mall/
├── index.html          首页
├── catalog.html        全部产品（筛选 / 排序 / 分页）
├── category.html       类目页      ?cat=<category-id>&sub=<子类id>
├── brands.html         品牌总览
├── brand.html          品牌页      ?b=<brand-id>
├── product.html        产品详情页  ?id=<product-id>
├── enquiry.html        询价清单 + 询价表单
├── about.html          关于我们（含成色分级 / 质保 / 购买流程）
├── contact.html        联系我们
├── 404.html            错误页
└── assets/
    ├── css/style.css   全部样式（含响应式）
    ├── img/favicon.svg
    └── js/
        ├── data.js       ★ 站点配置 / 类目树 / 品牌库
        ├── products.js   ★★ 产品数据（日常主要维护这个文件）
        └── app.js        渲染与交互逻辑（一般不用改）
```

---

## 2. 顶部导航：类目平铺

顶部是**两行式页头**：

```
第一行   [Logo] ............ [搜索框] [Brands] [About] [Contact] [询价清单 (n)]
第二行   POS Terminals · Printers · Barcode Scanners ·
         Cash Drawers · Peripherals & Accessories ...... [All products]
```

第二行就是**类目平铺条**，内容完全由 `data.js` 的 `CATEGORIES` 数组顺序决定，新增/删除类目自动同步。
每个类目悬停展开自己的子类目面板；没有子类目的类目不会出现下拉。

当前共 **5 个类目**：

| 类目 | 子类目 |
|---|---|
| POS Terminals | Windows / Android Terminals、All-in-One POS、Touchscreen Monitors |
| **Printers** | Desktop Receipt、Impact & Kitchen、Portable & Bluetooth、Desktop / Industrial / Mobile Label、Panel & Embedded、Printer Mechanisms (OEM) |
| Barcode Scanners | Handheld / Presentation / Wireless Scanners |
| Cash Drawers | Printer-Driven、Standalone Drawers |
| Peripherals & Accessories | Customer Displays、Keyboards & Scales、Cables & Adapters、Till Rolls & Ribbons、Mounts & Stands |

> **`Printers` 由原来的 `Receipt Printers` + `Barcode Label Printers` 合并而成**（2026-09-18）。
> 二级类目参考 `m.goojprt.com.cn` 的 product 分类，但**去掉了消费类影像打印机**
> （Photo / Camera / Ai Printer 不属于 POS 硬件），并保留了原有的 Impact & Kitchen、Industrial / Mobile Label。
>
> 已按需求移除 **Kiosks & Self-Service、PDA & Tablets、POS Bundles & Systems** 三个类目。
> 类目条在窄屏会自动收窄间距；宽度 < 1100px 时整条隐藏，改用汉堡菜单。

---

## 3. 日常维护：怎么加产品

只需要编辑 **`assets/js/products.js`**，在 `PRODUCTS` 数组里增删对象即可，其它文件都不用动。

```js
{
  id: 'epson-tm-t88vi-m349a',      // 必填，唯一，产品页链接用 ?id=这个值
  name: 'Epson TM-T88VI Thermal Receipt Printer',  // 必填
  brand: 'epson',                  // 必填，取值见 data.js 的 BRANDS
  category: 'printers',            // 必填，取值见 data.js 的 CATEGORIES
  subcategory: 'desktop-receipt-printers',         // 可选，类目子项
  model: 'TM-T88VI',
  sku: 'M349A',
  condition: 'refurbished',        // refurbished | used-a | used-b | used-c
  stock: 'in-stock',               // in-stock | low-stock | pre-order | out-of-stock
  price: null,                     // null = 显示 "Price on request"（询价制默认）
  qty: 12,                         // 可选，库存台数
  image: '',                       // 留空自动生成带品牌型号的占位图
  gallery: [],                     // 附图
  shortDesc: '列表页摘要，一两句话',
  description: '详情页正文，\n 支持换行',
  specs:    [{ label: 'Print Method', value: 'Direct Thermal' }],
  features: ['新换打印头', '自动切刀'],
  compat:   ['Square', 'Clover'],
  boxContents: ['Printer', 'Power supply'],
  warranty: '',                    // 留空用默认 90 天质保文案
  featured: true,                  // 首页推荐位
  tags: ['80mm', 'bestseller']
}
```

> **当前只有 3 条真实产品**（Verifone VX520 / VX675、Newland ME31，2026-09-18 从阿里店铺迁入，带实拍图）。
> 其余 17 条用于跑通页面结构的**示例占位数据已于同日全部移除** —— 空类目页会显示
> "No stock listed in this category yet" + 询价入口，不会出现空白页。
>
> 如需找回历史数据：`git log` 找到移除前的提交，再执行
> `git checkout <commit> -- assets/js/products.js`。
> 另有一份备份在 `.workbuddy/memory/BACKUP-2026-09-18-products.js`。

> `price` 填了数字就显示价格；保持 `null` 则全站统一显示 "Price on request"。

### 加图片
把图片放到 `assets/img/products/`，然后 `image: 'assets/img/products/verifone-vx520-1.jpg'`（4:3 比例效果最好）。
不填就自动生成占位图，方便先上线后补图。

### 加品牌

在 `data.js` 的 `BRANDS` 里追加 `{ id, name, origin, blurb }`，品牌页 / 页脚 / 筛选器自动同步。

> **没有产品引用的品牌不会显示为品牌卡片** —— 它们只会出现在品牌页底部
> 「Also sourced on request」那一行里（读作"可代订"），也不进导航下拉、首页品牌条和目录页筛选器
> （这三处都按"有库存"过滤）。**所以先加品牌、后加产品是安全的**，不会产生空卡片或空筛选器。
>
> ⚠️ **`BRANDS` 数组最后一项没有尾逗号**，追加时必须给上一项补上逗号，
> 否则整站 JS 语法错误、所有页面变空白。

### 加 / 删类目
在 `data.js` 的 `CATEGORIES` 里增删对象即可，**顶部平铺导航、首页类目卡、筛选器、页脚、移动端菜单全部自动同步**。
注意：改类目 `id` 时要同步改 `products.js` 里对应产品的 `category` 值，否则该产品会失去类目归属。

### 改站点信息
`data.js` 顶部的 `SITE`（站名、邮箱、电话、地址、工作时间、货币）和 `TRADE`（质保、成色、付款、运输等全站文案）。

---

## 3.1 从阿里店铺迁入产品（自有店铺）

本站产品可从自有阿里国际站店铺
[mingood.en.alibaba.com](https://mingood.en.alibaba.com/)（Guangzhou Mingheng Technology Co., Ltd.）
迁入。**关键：不要在英文站直接使用阿里的原始标题** —— 该店铺面向英文站的商品标题实为中文
（如「二手vx680 gprs pos主板主板」），描述也是机翻风格。直接照搬只会做出中英混杂、SEO 很差的页面。

**正确流程：规格与图片复用，标题与描述原创重写。**

### 抓取要点（写脚本时容易踩的坑）

| 事项 | 结论 |
|---|---|
| 商品列表 | 店铺分类页 `productgrouplist-<id>/<类目>.html`，`a[href*="product-detail"]` 即商品，注意**同一商品会出现两次**，需按 `alibaba_id` 去重 |
| 商品 ID | 详情页 URL 尾部 `_<数字>.html` 中的数字 |
| **主图选择器** | 必须用 **`img` 的祖先包含 `class*="main-image-tc"`**（即 `.main-image-tc-image-magnifier`）。**不要**用「页面第一张非装饰图」—— 详情页里混有「相关推荐」商品图，会导致图片归属错乱 |
| 原图地址 | 缩略图 `.../kf/<hash>.jpg_960x960q80.jpg` 去掉尺寸后缀**不一定**存在；正确做法是从页面 HTML 里按 `<hash>` 匹配 `https://sc\d+.alicdn.com/kf/<hash>.<ext>`，取不到时退回 `_960x960` 版本 |
| 规格属性 | 详情页正文 `核心行业属性` 与 `物流` 之间，为「标签/值」交替的行；标签已是英文，**值仍是中文**，需翻译 |
| 登录 | 列表页与详情页均**无需登录**即可读取 |
| 反爬 | 实测无反爬拦截，正常 UA + 5 秒等待即可 |

### 图片处理规范

- 输出目录 `assets/img/products/`
- 命名：`<详情页URL的英文slug小写>-<序号>.jpg`
- 统一等比缩到 **宽 ≤ 1000px**，转 JPEG（quality 84 / optimize / progressive）
- 当前 12 张图合计约 **1.1MB**，单张 25–170KB
- 白底/透明图自动合成白底，避免 PNG 透明区变黑

### 已迁入的示范批次（3 款）

| 产品 | 来源阿里 ID | 图片 |
|---|---|---|
| Refurbished Verifone VX520 Countertop POS Terminal | 62434696975 | 4 张 |
| Refurbished Verifone VX675 3G Handheld POS Terminal | 62476068573 | 4 张 |
| Refurbished Newland ME31 GPRS POS Terminal | 62571173373 | 3 张 |

阿里原始报价记录在 `products.js` 每组上方的注释里（目前全站沿用询价制，未公开显示价格）。

> 原先计划的「17 款批量迁入」**已于 2026-09-18 作废** —— 改由店主自行确认上架哪些产品后，
> 再逐个迁入（可继续用本节的方法：抓规格 + 复用图片 + 重写英文标题描述）。

---

## 4. 本地预览

```bash
cd pos-mall
python -m http.server 8080
# 打开 http://localhost:8080
```

产品页示例：`product.html?id=verifone-vx520-countertop-terminal`
类目页示例：`category.html?cat=pos-terminals`

---

## 4.1 线上部署（Cloudflare Workers · Git 自动部署）

**当前线上地址：https://pos-mall.com** （`www.pos-mall.com` 指向同一站点）

| 项目 | 值 |
|---|---|
| 平台 | **Cloudflare Workers（静态资源模式）** |
| Worker 名 | `pos-mall-site` |
| 预览地址 | https://pos-mall-site.marylipos.workers.dev |
| Git 仓库 | https://github.com/maryli-AI/pos-mall-site （`main` 分支） |
| 配置文件 | `wrangler.jsonc` + `.assetsignore`（均在仓库根目录） |
| 绑定方式 | **Git 集成 → push 即自动构建发布** |
| 自定义域名 | `pos-mall.com` / `www.pos-mall.com`，在 Worker 的 Settings → Domains & Routes 里管理 |

### 改完产品后怎么发布（日常流程）

**不需要任何 Cloudflare API Token，也不需要命令行。** 三步：

1. 改 `assets/js/products.js`（或任何文件）
2. 打开 **GitHub Desktop** → 勾选改动 → 写一句说明 → 点 **Commit to main**
3. 点顶部的 **Push origin**

Cloudflare 检测到 push 后自动构建，**1~2 分钟后 https://pos-mall.com 就更新了**。
构建日志：Cloudflare 后台 → Workers & Pages → `pos-mall-site` → Deployments。

### 为什么是 Workers 而不是 Pages

2026 年 9 月起，Cloudflare 后台的 **Create application** 流程**只会创建 Worker** —— Pages 已无法新建
（官方社区有同样报告）。Pages 并未被官方宣布停用，但已"不推荐用于新项目"。
Workers 静态资源模式支持我们需要的全部能力：`_headers`、自定义 404、自定义域名，且**静态请求免费**。

两个配置文件的作用：

| 文件 | 作用 |
|---|---|
| `wrangler.jsonc` | Worker 名字、`assets.directory`（站点根目录）、404 处理方式 |
| `.assetsignore` | 指定哪些文件**不要**上传（`.git`、`README.md`、配置文件本身…） |

> ⚠️ **`.assetsignore` 里不要排除 `_headers`**，否则缓存规则会失效。
>
> ⚠️ **`wrangler.jsonc` 里 `workers_dev` 和 `preview_urls` 必须显式写 `true`** ——
> 一旦仓库里存在 wrangler 配置文件，这两项**默认会被关闭**，`.workers.dev` 地址会变成 404，且不报错。

### 缓存策略（`_headers`）—— 重要

仓库根目录的 **`_headers`** 文件控制静态资源的缓存：

| 路径 | 策略 |
|---|---|
| `/assets/js/*` | `max-age=0, must-revalidate` —— 每次校验，ETag 命中就 304，很便宜 |
| `/assets/css/*` | 同上 |
| `/assets/img/*` | `max-age=3600` —— 图片按文件名缓存，内容不常变 |
| `/*.html` | `max-age=0, must-revalidate` |

> 改了 `_headers` 需要**重新 push** 才生效。
> 如果访问线上发现内容没更新，先按 **Ctrl + Shift + R** 强制刷新 —— 这通常是浏览器本地缓存，
> 不是部署失败。（历史遗留的旧缓存最长 4 小时会自行过期。）


### 关于线上 URL 形式（重要）

Cloudflare 会把 `.html` 形式的地址跳转到无扩展名形式：

| 你请求的 | 实际返回 |
|---|---|
| `/catalog.html` | **307** 跳转到 `/catalog` |
| `/product.html?id=xxx` | **307** 跳转到 `/product?id=xxx`（query 保留） |

所以**线上两种写法都能用**，只是 `.html` 形式会多一跳、地址栏最终显示无扩展名形式。
站内所有链接目前仍写成 `.html` 形式（为了本地 `file://` 和 `python -m http.server` 能直接预览），
跳转由 Cloudflare 自动处理，功能不受影响。

如果要彻底消掉这一跳，把站内链接改成无扩展名形式即可，但**代价是本地预览必须走一个支持 clean URL 的服务器**，不能再用简单的 `python -m http.server`。

---

## 5. 上线前需要替换的地方

| 位置 | 说明 |
|---|---|
| `data.js` → `SITE` | 邮箱 `sales@pos-mall.com`、电话 `+1 (555) 010-2030`、地址、工作时间都是占位值 |
| 页脚 / 关于页 | 公司实体信息、条款与隐私政策链接目前指向 about.html，需替换为正式页面 |
| 询价表单 | 目前提交后调用 `mailto:` 打开本地邮件客户端。若要有真实后端，把 `app.js` 里 `renderEnquiryPage()` 的提交分支改成 `fetch('/api/enquiry', …)` 即可 |
| `404.html` | 不用手动配置 —— `wrangler.jsonc` 里的 `assets.not_found_handling: "404-page"` 已指定用它作为错误页 |
| 站点地图 / robots.txt | 尚未创建，正式推广前建议补上 |

> 提醒：`pos-mall.com` 的 apex 和 www 目前**同时可访问同一站点**。若在意 SEO 重复内容，
> 建议二选一（推荐保留 apex）并把另一个做 301 跳转 —— 这需要 Cloudflare 的
> Redirect Rules（Zone 级权限），或改用一条 `_redirects` 规则。


---

## 6. 说明：为什么没有购物车 / 结算

按需求站点**不做线上下单**，所以用 **Enquiry list（询价清单）** 替代购物车：

- 产品卡 / 详情页的 **Enquire** 按钮把商品写入浏览器 `localStorage`（键名 `posmall.enquiry.v1`）。
- 询价页可调整数量、删除条目，填写公司信息后一键生成询价邮件。
- 全程无价格结算、无支付入口，符合「只做硬件销售 + 报价制」的定位。

---

## 7. 信息架构参考来源

- **类目导航**：参考 tills-direct.com —— POS 整机 / 打印机 / 扫描枪 / 现金抽屉 / 周边 的分类骨架。
- **品牌与目录组织**：参考 owlposprinters.com —— 以品牌 × 品类双维度组织（其真实在售为
  Star Micronics / Epson / Zebra 三大主力，打印类占绝对多数）。
- 两者均为「新机 + 翻新」，本站按需求**只保留二手与翻新**，并按 Refurbished / Grade A / B / C 四档成色区分。
