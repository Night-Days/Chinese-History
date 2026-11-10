# 汴京梦华 · 北宋 960—1127

一个围绕**北宋（960—1127）**展开的中国历史主题前端作品：以宣纸、墨色、朱砂与天青为视觉骨架，
用一条纵向长卷，串起时代背景、时间线、人物、事件、文化与遗存，并在末尾给出个人的历史评述。

## 运行

```bash
npm install
npm run dev      # 开发预览 http://127.0.0.1:5173
npm run build    # 生产构建，产物在 dist/
npm run preview  # 预览构建产物
```

要求 Node.js ≥ 18。

## 线上地址

**https://night-days.github.io/Chinese-History/**

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages
（约 1—2 分钟生效）。构建时的资源前缀为 `/Chinese-History/`，如需部署到其他仓库或根域名，
用环境变量覆盖即可：

```bash
BASE_PATH=/ npm run build        # 部署在根路径
BASE_PATH=/my-repo/ npm run build
```

## 技术栈

- **Vue 3**（`<script setup>` 组合式 API，单文件组件）
- **Vite 5** 构建
- 纯前端、零运行时依赖：不使用 UI 框架，全部样式手写
- 动效全部基于 `IntersectionObserver` + CSS `transform / opacity`，不引入动画库
- 无后端、无外部图片链接，所有历史图像均为本地静态资源

## 目录结构

```
bj-song/
├── index.html
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── images/          # 14 张历史图像（本地化，见下方版权）
│       └── credits.json     # 抓取时记录的原始授权信息
└── src/
    ├── main.js              # 应用入口 + v-reveal 滚动入场指令
    ├── style.css            # 设计令牌（纸/墨/朱砂/天青）、版式工具、无障碍
    ├── App.vue              # 页面骨架、阅读进度、右侧章节索引
    ├── data/
    │   └── song.js          # 全部史料内容（背景/时间线/人物/事件/文化/遗存/感悟/来源）
    └── components/
        ├── AppNav.vue           # 顶部导航（桌面横排 / 移动端全屏目录）
        ├── HeroSection.vue      # 卷首：清明上河图为底，竖排标题，视差
        ├── StatsBand.vue        # 四组概况数据
        ├── SectionHeading.vue   # 章节标题（编号 + 中英标题 + 导语）
        ├── BackgroundSection.vue# 壹 时代背景（政治/经济/社会/文化 + 竖排引文）
        ├── PaintingBand.vue     # 通栏画作带（千里江山图）
        ├── TimelineSection.vue  # 貳 时序（13 节点横向时间轴，可拖拽/键盘）
        ├── FiguresSection.vue   # 叁 人物（6 位人物卡片）
        ├── FigureModal.vue      # 人物生平弹层（焦点陷阱 + ESC 关闭）
        ├── EventsSection.vue    # 肆 事件（五事：起因/经过/结果/意义 手风琴）
        ├── CultureSection.vue   # 伍 文华（12 栏不规则网格，八则）
        ├── RelicsSection.vue    # 陸 遗存（六件遗址文物）
        ├── Lightbox.vue         # 图像灯箱（完整显示不裁切）
        ├── LegacySection.vue    # 柒 回响（四点遗产）
        ├── ReflectionSection.vue# 捌 私见（深色双栏随笔 + 印章）
        └── CreditsSection.vue   # 图像与文献来源
```

## 内容维度对照

| 赛事要求 | 对应位置 |
| --- | --- |
| 历史背景介绍 | 壹 时代背景：政治制度、经济、社会、文化四段 |
| 历史时间线展示 | 貳 时序：960—1127 共 13 个节点，横向滚动 |
| 重要历史人物 | 叁 人物：赵匡胤、范仲淹、王安石、苏轼、沈括、李清照 |
| 重大历史事件 | 肆 事件：陈桥兵变、澶渊之盟、庆历新政、熙宁变法、靖康之变 |
| 文化与科技成就 | 伍 文华：活字印刷、指南针、火药、水运仪象台、《营造法式》、汝窑、交子、院体绘画 |
| 遗址与文物 | 陸 遗存：开封铁塔、应县木塔、汝窑青釉笔洗、《清明上河图》《千里江山图》《瑞鹤图》 |
| 影响与现实意义 | 柒 回响：城市形态、士大夫社会、技术与金融、审美范式 |
| 个人感悟与评价 | 捌 私见：四段原创评述 + 陈寅恪引文 + 印章落款 |

## 交互

- 顶部 2px 朱砂阅读进度条；右侧章节索引随滚动高亮
- 全站滚动入场（`v-reveal` 指令，仅首次触发，尊重 `prefers-reduced-motion`）
- 时间轴：鼠标拖拽、触屏滑动、左右按钮、聚焦后 `←/→` 键，底部段数指示
- 人物卡片 → 生平弹层（Tab 焦点循环、Esc 关闭、背景锁定滚动）
- 事件手风琴：一次展开一项，`aria-expanded` 同步
- 遗存图像 → 灯箱（`object-fit: contain`，完整展示画作）
- 移动端：≤900px 切换为全屏目录；≤760px 竖排标题转为横排、断点重排

## 史实与图像来源

- 年代、生卒、事件经过依《宋史》《续资治通鉴长编》《东京梦华录》《梦溪笔谈》《营造法式》及学界通行说法整理；
  评述性内容（"一点私见"、各节按语）为作者个人解读，已在文中标明。
- 图像全部来自 **Wikimedia Commons**，为公有领域或知识共享授权，原属故宫博物院、辽宁省博物馆、
  台北故宫博物院、克利夫兰艺术博物馆、中国印刷博物馆等机构，逐条列于页脚「图像与文献来源」。
- 图片已下载至 `public/assets/images/`，页面不依赖任何外部图床。
