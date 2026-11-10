<script setup>
import { asset } from '../utils/asset.js'
import { ref } from 'vue'
import SectionHeading from './SectionHeading.vue'
import Lightbox from './Lightbox.vue'
import { relics } from '../data/song.js'

const active = ref(null)
</script>

<template>
  <section id="relics" class="section relics">
    <div class="wrap">
      <SectionHeading
        no="陸"
        title="遗存"
        en="Sites &amp; Objects"
        lead="北宋的地面建筑十不存一，所幸还有塔、瓷、绢与纸。它们是那个时代留下的实物证据——砖的温度、釉的厚度、绢的经纬，比任何叙述都更诚实。点击任一图像，可放大观看。"
      />

      <div class="relics__grid">
        <article v-for="(r, i) in relics" :key="r.name" class="relic" v-reveal="{ delay: (i % 3) * 80 }">
          <button type="button" class="relic__btn" :aria-label="`放大查看 ${r.name}`" @click="active = r">
            <span class="relic__thumb">
              <img :src="asset(r.img)" :alt="`${r.name}（${r.full}）`" loading="lazy" decoding="async" />
              <span class="relic__zoom" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <circle cx="7" cy="7" r="5.2" fill="none" stroke="currentColor" stroke-width="1" />
                  <path d="M11 11l4 4M4.6 7h4.8M7 4.6v4.8" fill="none" stroke="currentColor" stroke-width="1" />
                </svg>
              </span>
            </span>
            <span class="relic__body">
              <span class="relic__row">
                <span class="relic__name">{{ r.name }}</span>
                <span class="relic__date">{{ r.date }}</span>
              </span>
              <span class="relic__full">{{ r.full }}　·　{{ r.place }}</span>
              <span class="relic__text">{{ r.text }}</span>
            </span>
          </button>
        </article>
      </div>
    </div>

    <transition name="lb">
      <Lightbox v-if="active" :relic="active" @close="active = null" />
    </transition>
  </section>
</template>

<style scoped>
.relics {
  background:
    linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%);
}

.relics__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(20px, 2.6vw, 36px);
}

.relic:nth-child(1) {
  grid-column: span 5;
}
.relic:nth-child(2) {
  grid-column: span 7;
}
.relic:nth-child(3),
.relic:nth-child(4),
.relic:nth-child(5) {
  grid-column: span 4;
}
.relic:nth-child(6) {
  grid-column: span 12;
}

.relic__btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0;
}

.relic__thumb {
  position: relative;
  display: block;
  overflow: hidden;
  background: var(--paper-3);
  border: 1px solid var(--line-soft);
}

.relic:nth-child(1) .relic__thumb {
  aspect-ratio: 3 / 4.1;
}
.relic:nth-child(2) .relic__thumb {
  aspect-ratio: 16 / 11.4;
}
.relic:nth-child(3) .relic__thumb,
.relic:nth-child(4) .relic__thumb,
.relic:nth-child(5) .relic__thumb {
  aspect-ratio: 1 / 1;
}
.relic:nth-child(6) .relic__thumb {
  aspect-ratio: 21 / 7.4;
}

.relic__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.3s var(--ease), filter 700ms ease;
  filter: saturate(0.96);
}

.relic:nth-child(4) .relic__thumb img,
.relic:nth-child(5) .relic__thumb img {
  object-fit: cover;
  object-position: 50% 50%;
}

.relic__btn:hover .relic__thumb img {
  transform: scale(1.045);
  filter: saturate(1.04) brightness(1.02);
}

.relic__zoom {
  position: absolute;
  right: 12px;
  top: 12px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(244, 237, 223, 0.86);
  color: var(--ink);
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 400ms ease, transform 400ms var(--ease);
  backdrop-filter: blur(4px);
}

.relic__btn:hover .relic__zoom {
  opacity: 1;
  transform: none;
}

.relic__body {
  display: block;
  padding-top: 14px;
}

.relic__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 8px;
}

.relic__name {
  font-size: clamp(16px, 1.6vw, 19px);
  font-weight: 600;
  letter-spacing: 0.1em;
}

.relic__date {
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--ink-faint);
  white-space: nowrap;
}

.relic__full {
  display: block;
  margin-top: 8px;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  color: var(--cinnabar);
}

.relic__text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 8px;
  font-size: 13px;
  line-height: 2;
  color: var(--ink-mute);
  text-align: justify;
}

.relic:nth-child(6) .relic__text {
  -webkit-line-clamp: 2;
  line-clamp: 2;
  max-width: 96ch;
}

@media (max-width: 980px) {
  .relic:nth-child(n) {
    grid-column: span 6;
  }
  .relic:nth-child(1) .relic__thumb,
  .relic:nth-child(2) .relic__thumb,
  .relic:nth-child(3) .relic__thumb,
  .relic:nth-child(4) .relic__thumb,
  .relic:nth-child(5) .relic__thumb {
    aspect-ratio: 4 / 3.4;
  }
  .relic:nth-child(6) .relic__thumb {
    aspect-ratio: 16 / 8;
  }
}

@media (max-width: 600px) {
  .relic:nth-child(n) {
    grid-column: span 12;
  }
  .relic:nth-child(1) .relic__thumb {
    aspect-ratio: 4 / 4.4;
  }
  .relic:nth-child(2) .relic__thumb,
  .relic:nth-child(3) .relic__thumb,
  .relic:nth-child(4) .relic__thumb,
  .relic:nth-child(5) .relic__thumb {
    aspect-ratio: 4 / 3.4;
  }
  .relic:nth-child(6) .relic__thumb {
    aspect-ratio: 16 / 9;
  }
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 280ms ease;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
</style>
