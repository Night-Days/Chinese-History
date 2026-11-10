<script setup>
import { credits } from '../data/song.js'

const books = [
  { t: '《宋史》', a: '元 · 脱脱等' },
  { t: '《续资治通鉴长编》', a: '宋 · 李焘' },
  { t: '《东京梦华录》', a: '宋 · 孟元老' },
  { t: '《梦溪笔谈》', a: '宋 · 沈括' },
  { t: '《营造法式》', a: '宋 · 李诫' },
  { t: '《宋史纪事本末》', a: '明 · 陈邦瞻' },
]

function toTop(e) {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer id="sources" class="src">
    <div class="wrap">
      <div class="src__head" v-reveal>
        <div>
          <p class="src__kicker">图像与文献来源</p>
          <h2 class="src__title">Sources &amp; Credits</h2>
        </div>
        <p class="src__note">
          本页所有历史图像均取自公有领域（Public Domain）或知识共享（CC）授权之馆藏与摄影，
          来源为 Wikimedia Commons，作品原属故宫博物院、辽宁省博物馆、台北故宫博物院等机构。
          图像仅作教育与文化展示之用，版权归原机构与摄影者所有。
        </p>
      </div>

      <div class="src__grid">
        <ul class="src__list">
          <li v-for="c in credits" :key="c.title">
            <span class="src__t">{{ c.title }}</span>
            <span class="src__a">{{ c.author }}</span>
            <span class="src__l">{{ c.license }}</span>
          </li>
        </ul>

        <div class="src__books">
          <h3>主要参考典籍</h3>
          <ul>
            <li v-for="b in books" :key="b.t">
              <span>{{ b.t }}</span><em>{{ b.a }}</em>
            </li>
          </ul>
          <p class="src__disc">
            说明：年代、生卒、事件经过均依正史与学界通行说法整理；文中观点与评述部分为作者个人解读，
            已在章节中明确标示，不与史实混同。
          </p>
        </div>
      </div>

      <div class="src__foot">
        <p class="src__brand">
          <span class="seal">梦华</span>
          <span>汴京梦华 · 北宋 960—1127　|　中国历史主题前端设计开发参赛作品</span>
        </p>
        <div class="src__actions">
          <span class="src__tech">Vue 3 · Vite · 纯前端渲染</span>
          <a href="#top" @click="toTop">回到卷首 ↑</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.src {
  background: var(--paper-2);
  border-top: 1px solid var(--line);
  padding-block: clamp(44px, 6vw, 76px) clamp(28px, 4vw, 42px);
  position: relative;
  z-index: 1;
}

.src__head {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(20px, 4vw, 60px);
  align-items: end;
  padding-bottom: clamp(24px, 3vw, 36px);
  border-bottom: 1px solid var(--line);
}

.src__kicker {
  margin: 0 0 8px;
  font-size: 10px;
  letter-spacing: 0.34em;
  color: var(--cinnabar);
}

.src__title {
  margin: 0;
  font-size: clamp(22px, 2.6vw, 32px);
  font-weight: 500;
  letter-spacing: 0.04em;
}

.src__note {
  margin: 0;
  font-size: 11.5px;
  line-height: 2;
  color: var(--ink-mute);
  text-align: justify;
}

.src__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: clamp(24px, 4vw, 60px);
  padding-block: clamp(22px, 3vw, 34px);
}

.src__list {
  margin: 0;
  padding: 0;
  list-style: none;
  columns: 2;
  column-gap: clamp(18px, 3vw, 40px);
}

.src__list li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1px 10px;
  padding: 9px 0;
  border-bottom: 1px dotted var(--line);
  break-inside: avoid;
  font-size: 11.5px;
  line-height: 1.55;
}

.src__t {
  grid-column: 1;
  grid-row: 1;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
}

.src__a {
  grid-column: 1;
  grid-row: 2;
  color: var(--ink-faint);
  font-size: 10px;
}

.src__l {
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: center;
  justify-self: end;
  font-size: 9px;
  letter-spacing: 0.06em;
  color: var(--ink-faint);
  border: 1px solid var(--line);
  border-radius: 2px;
  padding: 1px 5px;
  white-space: nowrap;
}

.src__books h3 {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.28em;
  color: var(--ink-mute);
}

.src__books ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.src__books li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid var(--line-soft);
  font-size: 12px;
  color: var(--ink-soft);
}

.src__books em {
  font-style: normal;
  font-size: 10px;
  color: var(--ink-faint);
}

.src__disc {
  margin: 14px 0 0;
  font-size: 10.5px;
  line-height: 1.95;
  color: var(--ink-faint);
  text-align: justify;
}

.src__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  padding-top: clamp(20px, 2.6vw, 30px);
  border-top: 1px solid var(--line);
}

.src__brand {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  color: var(--ink-mute);
}

.src__actions {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 24px);
  font-size: 10.5px;
  letter-spacing: 0.14em;
}

.src__tech {
  color: var(--ink-faint);
}

.src__actions a {
  color: var(--cinnabar);
  border-bottom: 1px solid rgba(156, 59, 46, 0.3);
  padding-bottom: 1px;
  transition: opacity 300ms ease;
}

.src__actions a:hover {
  opacity: 0.65;
}

@media (max-width: 860px) {
  .src__head,
  .src__grid {
    grid-template-columns: 1fr;
  }
  .src__list {
    columns: 1;
  }
}
</style>
