<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SectionHeading from './SectionHeading.vue'
import { timeline } from '../data/song.js'

const viewport = ref(null)
const progress = ref(0)
const atStart = ref(true)
const atEnd = ref(false)
const dragging = ref(false)

const current = computed(() => Math.round(progress.value * (timeline.length - 1)) + 1)
const pad = (n) => String(n).padStart(2, '0')

let startX = 0
let startLeft = 0

function update() {
  const el = viewport.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  progress.value = max > 0 ? el.scrollLeft / max : 0
  atStart.value = el.scrollLeft < 8
  atEnd.value = max - el.scrollLeft < 8
}

function step(dir) {
  const el = viewport.value
  if (!el) return
  const card = el.querySelector('.tl__node')
  const w = card ? card.getBoundingClientRect().width + 1 : el.clientWidth * 0.6
  el.scrollBy({ left: dir * w * 1.4, behavior: 'smooth' })
}

function onPointerDown(e) {
  if (e.pointerType === 'touch') return
  const el = viewport.value
  if (!el) return
  dragging.value = true
  startX = e.clientX
  startLeft = el.scrollLeft
  el.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging.value) return
  const el = viewport.value
  if (!el) return
  el.scrollLeft = startLeft - (e.clientX - startX)
}

function onPointerUp(e) {
  if (!dragging.value) return
  dragging.value = false
  const el = viewport.value
  if (el && el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId)
}

function onKey(e) {
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    step(1)
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    step(-1)
  }
}

onMounted(() => {
  update()
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', update)
})
</script>

<template>
  <section id="timeline" class="section tl">
    <div class="wrap">
      <SectionHeading
        no="貳"
        title="时序"
        en="Chronology · 960 — 1127"
        lead="北宋的一百六十八年，可以由十三个瞬间串起。这条线索从陈桥驿的黄袍开始，经过澶渊的盟书、庆历与熙宁的争论、水运仪象台的齿轮与《千里江山图》的青绿，终止于靖康二年的那场大雪。拖动或点击箭头，横向展阅。"
      />

      <div class="tl__head" v-reveal>
        <p class="tl__hint">
          <span aria-hidden="true">←</span> 横向展阅 <span aria-hidden="true">→</span>
        </p>
        <div class="tl__ctrl">
          <button
            type="button"
            class="tl__btn"
            :disabled="atStart"
            aria-label="上一段"
            @click="step(-1)"
          >
            <svg width="20" height="8" viewBox="0 0 20 8" aria-hidden="true">
              <path d="M19 4H2M5 1L2 4l3 3" fill="none" stroke="currentColor" stroke-width="1" />
            </svg>
          </button>
          <button
            type="button"
            class="tl__btn"
            :disabled="atEnd"
            aria-label="下一段"
            @click="step(1)"
          >
            <svg width="20" height="8" viewBox="0 0 20 8" aria-hidden="true">
              <path d="M1 4h17M15 1l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div
      ref="viewport"
      class="tl__viewport"
      :class="{ 'is-dragging': dragging }"
      tabindex="0"
      role="region"
      aria-label="北宋重要年代与事件时间轴，可横向滚动"
      @scroll.passive="update"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKey"
    >
      <div class="tl__track">
        <article v-for="(t, i) in timeline" :key="t.year + t.title" class="tl__node" v-reveal="{ delay: Math.min(i, 6) * 60, y: 18 }">
          <p class="tl__year">{{ t.year }}</p>
          <p class="tl__era">{{ t.era }}</p>
          <span class="tl__tag">{{ t.tag }}</span>
          <h3 class="tl__title">{{ t.title }}</h3>
          <p class="tl__text">{{ t.text }}</p>
        </article>
        <div class="tl__spacer" aria-hidden="true"></div>
      </div>
    </div>

    <div class="wrap">
      <div class="tl__foot">
        <p class="tl__count">
          <b>{{ pad(current) }}</b>
          <span>/ {{ pad(timeline.length) }}</span>
        </p>
        <div class="tl__progress" aria-hidden="true">
          <span :style="{ transform: `scaleX(${Math.max(progress, 0.015)})` }"></span>
        </div>
        <p class="tl__unit">段</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tl {
  background:
    radial-gradient(70% 50% at 0% 100%, rgba(213, 224, 218, 0.3) 0%, rgba(244, 237, 223, 0) 62%),
    var(--paper);
  overflow: hidden;
}

.tl__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.tl__hint {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.28em;
  color: var(--ink-faint);
}

.tl__hint span {
  color: var(--cinnabar);
}

.tl__ctrl {
  display: flex;
  gap: 8px;
}

.tl__btn {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-soft);
  transition: background 300ms ease, color 300ms ease, border-color 300ms ease, transform 300ms var(--ease);
}

.tl__btn:hover:not(:disabled) {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}

.tl__btn:active:not(:disabled) {
  transform: scale(0.94);
}

.tl__btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.tl__viewport {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
  scroll-padding-inline: var(--gutter);
  cursor: grab;
  -webkit-overflow-scrolling: touch;
}

.tl__viewport::-webkit-scrollbar {
  display: none;
}

.tl__viewport.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
}

.tl__track {
  display: flex;
  padding-inline: var(--gutter);
  align-items: stretch;
  position: relative;
}

.tl__node {
  flex: 0 0 clamp(238px, 25vw, 310px);
  scroll-snap-align: start;
  padding: 54px 24px 0 0;
  position: relative;
}

/* 横贯的时间线：由每个节点自己画一段，保证与圆点绝对对齐 */
.tl__node::after {
  content: "";
  position: absolute;
  left: 6px;
  right: 0;
  top: 33px;
  height: 1px;
  background: var(--line);
  z-index: 0;
}

.tl__node::before {
  content: "";
  position: absolute;
  left: 0;
  top: 30px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--paper);
  border: 1px solid var(--ink-mute);
  z-index: 1;
  transition: background 400ms ease, border-color 400ms ease, transform 400ms var(--ease);
}

.tl__node:hover::before {
  background: var(--cinnabar);
  border-color: var(--cinnabar);
  transform: scale(1.5);
}

.tl__year {
  margin: 0;
  font-size: clamp(30px, 3.2vw, 42px);
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  color: var(--ink);
  padding-left: 20px;
  transition: color 400ms ease;
}

.tl__node:hover .tl__year {
  color: var(--cinnabar-deep);
}

.tl__era {
  margin: 12px 0 0;
  padding-left: 20px;
  font-size: 11.5px;
  letter-spacing: 0.2em;
  color: var(--ink-faint);
}

.tl__tag {
  display: inline-block;
  margin: 20px 0 10px 20px;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--cinnabar);
  border: 1px solid rgba(156, 59, 46, 0.32);
  border-radius: 2px;
  padding: 2px 8px;
}

.tl__title {
  margin: 0;
  padding-left: 20px;
  font-size: 16.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  line-height: 1.6;
}

.tl__text {
  margin: 10px 0 0;
  padding-left: 20px;
  font-size: 13px;
  line-height: 2;
  color: var(--ink-mute);
  text-align: justify;
}

.tl__spacer {
  flex: 0 0 clamp(20px, 8vw, 120px);
}

.tl__foot {
  margin-top: clamp(26px, 3vw, 38px);
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 22px);
}

.tl__count {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--ink-faint);
  flex: 0 0 auto;
}

.tl__count b {
  font-size: 15px;
  font-weight: 500;
  color: var(--cinnabar);
}

.tl__progress {
  flex: 1;
  height: 1px;
  background: var(--line);
  position: relative;
  overflow: hidden;
}

.tl__progress span {
  position: absolute;
  inset: 0;
  background: var(--cinnabar);
  transform-origin: left;
  transition: transform 180ms linear;
}

.tl__unit {
  margin: 0;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--ink-faint);
  flex: 0 0 auto;
}

@media (max-width: 760px) {
  .tl__node {
    flex-basis: 74vw;
  }
}
</style>
