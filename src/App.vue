<script setup>
import { asset } from './utils/asset.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import StatsBand from './components/StatsBand.vue'
import BackgroundSection from './components/BackgroundSection.vue'
import PaintingBand from './components/PaintingBand.vue'
import TimelineSection from './components/TimelineSection.vue'
import FiguresSection from './components/FiguresSection.vue'
import EventsSection from './components/EventsSection.vue'
import CultureSection from './components/CultureSection.vue'
import RelicsSection from './components/RelicsSection.vue'
import LegacySection from './components/LegacySection.vue'
import ReflectionSection from './components/ReflectionSection.vue'
import CreditsSection from './components/CreditsSection.vue'

const chapters = [
  { id: 'background', no: '壹' },
  { id: 'timeline', no: '貳' },
  { id: 'figures', no: '叁' },
  { id: 'events', no: '肆' },
  { id: 'culture', no: '伍' },
  { id: 'relics', no: '陸' },
  { id: 'legacy', no: '柒' },
  { id: 'reflection', no: '捌' },
]

const progress = ref(0)
const active = ref('background')
let raf = 0
let io = null

function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    const doc = document.documentElement
    const max = doc.scrollHeight - doc.clientHeight
    progress.value = max > 0 ? Math.min(doc.scrollTop / max, 1) : 0
    raf = 0
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)

  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) active.value = e.target.id
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    )
    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (raf) cancelAnimationFrame(raf)
  if (io) io.disconnect()
})
</script>

<template>
  <div class="page">
    <a class="skip-link" href="#background">跳到正文</a>

    <div class="progress" aria-hidden="true">
      <span :style="{ transform: `scaleX(${progress})` }"></span>
    </div>

    <AppNav />

    <!-- 右侧章节索引 -->
    <nav class="rail" aria-label="章节索引">
      <a
        v-for="c in chapters"
        :key="c.id"
        :href="`#${c.id}`"
        class="rail__item"
        :class="{ 'is-active': active === c.id }"
        :aria-current="active === c.id ? 'true' : undefined"
      >
        <span class="rail__no">{{ c.no }}</span>
        <span class="rail__dot" aria-hidden="true"></span>
      </a>
    </nav>

    <main>
      <HeroSection />
      <StatsBand />
      <BackgroundSection />

      <PaintingBand
        :src="asset('assets/images/qianli-section.jpg')"
        alt="北宋王希孟《千里江山图》局部，青绿山峦与江水"
        title="千里江山 · 青绿"
        meta="王希孟《千里江山图》局部　政和三年（1113）　故宫博物院藏"
      />

      <TimelineSection />
      <FiguresSection />
      <EventsSection />
      <CultureSection />
      <RelicsSection />
      <LegacySection />
      <ReflectionSection />
    </main>

    <CreditsSection />
  </div>
</template>

<style scoped>
.page {
  position: relative;
  overflow-x: clip;
}

.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 100;
  background: transparent;
  pointer-events: none;
}

.progress span {
  display: block;
  height: 100%;
  background: var(--cinnabar);
  transform-origin: left;
  transition: transform 120ms linear;
}

.rail {
  position: fixed;
  right: clamp(10px, 1.6vw, 22px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 80;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-end;
}

.rail__item {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.55;
  transition: opacity 320ms ease;
}

.rail__item:hover,
.rail__item.is-active {
  opacity: 1;
}

.rail__no {
  font-family: var(--kai);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 320ms ease, transform 320ms var(--ease);
}

.rail__item:hover .rail__no,
.rail__item.is-active .rail__no {
  opacity: 1;
  transform: none;
}

.rail__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid var(--ink-mute);
  background: transparent;
  transition: background 320ms ease, border-color 320ms ease, transform 320ms var(--ease);
}

.rail__item.is-active .rail__dot {
  background: var(--cinnabar);
  border-color: var(--cinnabar);
  transform: scale(1.35);
}

@media (max-width: 1100px) {
  .rail {
    display: none;
  }
}
</style>
