<script setup>
import { asset } from '../utils/asset.js'
import SectionHeading from './SectionHeading.vue'
import { culture } from '../data/song.js'

const nums = ['一', '二', '三', '四', '五', '六', '七', '八']
</script>

<template>
  <section id="culture" class="section cul">
    <div class="wrap">
      <SectionHeading
        no="伍"
        title="文华"
        en="Culture &amp; Invention"
        lead="北宋的成就，很少以纪念碑的形式留存。它们散落在活字的字模里、海船的罗盘里、一部建筑法典的模数里、一只茶盏的釉色里。以下八则，是那个时代对后世最长久的技术与审美遗产。"
      />

      <div class="cul__grid">
        <article
          v-for="(c, i) in culture"
          :key="c.title"
          class="cul__item"
          :class="{ 'cul__item--img': c.img, 'cul__item--wide': i === 7 }"
          v-reveal="{ delay: (i % 3) * 80 }"
        >
          <figure v-if="c.img" class="cul__art">
            <img :src="asset(c.img)" :alt="`${c.title} 相关文物图像`" loading="lazy" decoding="async" />
          </figure>

          <div class="cul__content">
            <div class="cul__top">
              <span class="cul__num">{{ nums[i] }}</span>
              <span class="cul__tag">{{ c.tag }}</span>
            </div>
            <h3 class="cul__title">{{ c.title }}</h3>
            <p class="cul__en">{{ c.en }}</p>
            <p class="cul__text">{{ c.text }}</p>
            <p class="cul__meta">{{ c.meta }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cul {
  background: var(--paper-2);
  border-top: 1px solid var(--line-soft);
}

.cul__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.cul__item {
  background: var(--paper);
  padding: clamp(20px, 2.6vw, 34px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: background 500ms ease;
}

.cul__item:hover {
  background: #f8f2e6;
}

/* 12 栏的节奏：7+5 / 4+4+4 / 6+6 / 12 */
.cul__item:nth-child(1) {
  grid-column: span 7;
}
.cul__item:nth-child(2) {
  grid-column: span 5;
}
.cul__item:nth-child(3),
.cul__item:nth-child(4),
.cul__item:nth-child(5) {
  grid-column: span 4;
}
.cul__item:nth-child(6),
.cul__item:nth-child(7) {
  grid-column: span 6;
}
.cul__item:nth-child(8) {
  grid-column: span 12;
}

.cul__item::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 2px;
  width: 0;
  background: var(--cinnabar);
  transition: width 700ms var(--ease);
}

.cul__item:hover::after {
  width: 100%;
}

.cul__art {
  margin: calc(clamp(20px, 2.6vw, 34px) * -1) calc(clamp(20px, 2.6vw, 34px) * -1) clamp(18px, 2vw, 26px);
  overflow: hidden;
  background: var(--paper-3);
}

.cul__art img {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  filter: saturate(0.95) contrast(1.03);
  transition: transform 1.2s var(--ease);
}

.cul__item:hover .cul__art img {
  transform: scale(1.045);
}

.cul__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cul__top {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.cul__num {
  font-family: var(--kai);
  font-size: 13px;
  letter-spacing: 0.1em;
  color: var(--cinnabar);
}

.cul__tag {
  font-size: 10px;
  letter-spacing: 0.24em;
  color: var(--ink-faint);
  border-left: 1px solid var(--line);
  padding-left: 12px;
}

.cul__title {
  margin: 12px 0 0;
  font-size: clamp(19px, 2vw, 26px);
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.45;
}

.cul__en {
  margin: 6px 0 0;
  font-size: 9.5px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.cul__text {
  margin: 14px 0 0;
  font-size: clamp(13.5px, 1.15vw, 14.5px);
  line-height: 2.1;
  color: var(--ink-soft);
  text-align: justify;
  flex: 1;
}

.cul__meta {
  margin: 18px 0 0;
  padding-top: 12px;
  border-top: 1px solid var(--line-soft);
  font-size: 10.5px;
  letter-spacing: 0.12em;
  color: var(--ink-faint);
}

/* 第八项：横向图文 */
.cul__item--wide {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(20px, 3vw, 44px);
  align-items: stretch;
}

.cul__item--wide .cul__art {
  margin: 0;
  height: 100%;
}

.cul__item--wide .cul__art img {
  aspect-ratio: auto;
  height: 100%;
  min-height: 220px;
}

@media (max-width: 1024px) {
  .cul__item:nth-child(n) {
    grid-column: span 6;
  }
  .cul__item--wide {
    grid-template-columns: 1fr;
  }
  .cul__item--wide .cul__art img {
    aspect-ratio: 16 / 9;
    height: auto;
    min-height: 0;
  }
}

@media (max-width: 640px) {
  .cul__item:nth-child(n) {
    grid-column: span 12;
  }
  .cul__grid {
    gap: 0;
    background: transparent;
    border-inline: 0;
  }
  .cul__item {
    border-bottom: 1px solid var(--line);
  }
}
</style>
