<script setup>
import { asset } from '../utils/asset.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '../data/song.js'

const shift = ref(0)
let enabled = true
let raf = 0

function onScroll() {
  if (!enabled || raf) return
  raf = requestAnimationFrame(() => {
    shift.value = Math.min(window.scrollY * 0.16, 140)
    raf = 0
  })
}

onMounted(() => {
  enabled =
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia('(pointer: coarse)').matches
  if (enabled) {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__art" aria-hidden="true">
      <img
        :src="asset('assets/images/hero-qingming.jpg')"
        alt="北宋张择端《清明上河图》局部，汴河两岸的市井与舟船"
        :style="{ transform: `translate3d(0, ${shift}px, 0) scale(1.08)` }"
        fetchpriority="high"
      />
    </div>
    <div class="hero__veil" aria-hidden="true"></div>
    <div class="hero__edge" aria-hidden="true"></div>

    <div class="hero__inner wrap">
      <div class="hero__vertical">
        <p class="hero__era vertical">北宋 · 九六〇 至 一一二七</p>
        <h1 class="hero__title vertical">{{ site.title }}</h1>
      </div>

      <div class="hero__foot">
        <div class="hero__lead-box">
          <p class="hero__lead">
            一座城的黄金时代，<br />
            与一个文明的转型时刻。
          </p>
          <p class="hero__sub">
            从陈桥驿的黄袍，到靖康二年的雪。<br />
            一百六十八年，中国把注意力从疆场转向了街市、书页与窑火。
          </p>
          <span class="seal hero__seal">{{ site.seal }}</span>
        </div>

        <a class="hero__scroll" href="#background">
          <span class="hero__scroll-line" aria-hidden="true"></span>
          <span>向下展卷</span>
        </a>
      </div>

      <p class="hero__credit">图 · 张择端《清明上河图》局部　故宫博物院藏</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background: #17140f;
  color: #f6efe0;
  isolation: isolate;
}

.hero__art {
  position: absolute;
  inset: -6% 0 -10% 0;
  z-index: 0;
  overflow: hidden;
}

.hero__art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 42% 58%;
  filter: sepia(0.28) saturate(0.72) contrast(1.04) brightness(0.82);
  will-change: transform;
}

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(0deg, var(--paper) 0%, var(--paper) 3.2%, rgba(244, 237, 223, 0.55) 7%, rgba(244, 237, 223, 0) 12%),
    linear-gradient(0deg, rgba(18, 15, 11, 0.66) 5%, rgba(18, 15, 11, 0.34) 24%, rgba(18, 15, 11, 0) 52%),
    linear-gradient(180deg, rgba(18, 15, 11, 0.72) 0%, rgba(18, 15, 11, 0) 24%),
    radial-gradient(120% 90% at 78% 42%, rgba(20, 17, 12, 0.58) 0%, rgba(20, 17, 12, 0) 62%);
}

/* 卷轴下缘的一道暗边 */
.hero__edge {
  position: absolute;
  inset: auto 0 0 0;
  height: 1px;
  z-index: 2;
  background: rgba(25, 23, 19, 0.18);
}

.hero__inner {
  position: relative;
  z-index: 3;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 120px;
  padding-bottom: clamp(40px, 6vh, 72px);
}

/* 右侧竖排标题 */
.hero__vertical {
  position: absolute;
  top: clamp(96px, 15vh, 168px);
  right: var(--gutter);
  display: flex;
  align-items: flex-start;
  gap: clamp(14px, 2vw, 30px);
  flex-direction: row;
}

.hero__title {
  margin: 0;
  font-size: clamp(56px, 8.2vw, 126px);
  font-weight: 500;
  line-height: 1.06;
  letter-spacing: 0.2em;
  text-shadow: 0 6px 44px rgba(0, 0, 0, 0.32);
  animation: inkIn 1.5s var(--ease) 0.15s both;
}

.hero__era {
  margin: 4px 0 0;
  font-size: clamp(10px, 0.95vw, 12.5px);
  letter-spacing: 0.34em;
  color: rgba(246, 239, 224, 0.72);
  animation: inkIn 1.6s var(--ease) 0.45s both;
}

@keyframes inkIn {
  from {
    opacity: 0;
    transform: translate3d(0, 22px, 0);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}

.hero__foot {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: clamp(20px, 4vw, 56px);
  animation: inkIn 1.4s var(--ease) 0.7s both;
}

.hero__lead-box {
  max-width: 46ch;
}

.hero__lead {
  margin: 0;
  font-size: clamp(20px, 2.3vw, 31px);
  line-height: 1.68;
  letter-spacing: 0.1em;
  font-weight: 400;
  color: #fbf6ea;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
}

.hero__sub {
  margin: clamp(14px, 2vw, 22px) 0 0;
  font-size: clamp(12.5px, 1.1vw, 14px);
  line-height: 2.15;
  letter-spacing: 0.06em;
  color: rgba(246, 239, 224, 0.84);
  max-width: 44ch;
  text-shadow: 0 1px 18px rgba(0, 0, 0, 0.45);
}

.hero__seal {
  margin-top: clamp(18px, 2.4vw, 26px);
}

.hero__scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 10.5px;
  letter-spacing: 0.34em;
  color: rgba(246, 239, 224, 0.66);
  writing-mode: vertical-rl;
  padding-bottom: 6px;
}

.hero__scroll-line {
  width: 1px;
  height: 54px;
  background: linear-gradient(180deg, rgba(246, 239, 224, 0.7), rgba(246, 239, 224, 0));
  position: relative;
  overflow: hidden;
}

.hero__scroll-line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(246, 239, 224, 0.9);
  transform: translateY(-100%);
  animation: drip 2.4s var(--ease-io) infinite;
}

@keyframes drip {
  0% {
    transform: translateY(-100%);
  }
  60%,
  100% {
    transform: translateY(100%);
  }
}

.hero__credit {
  position: absolute;
  left: var(--gutter);
  bottom: 8px;
  margin: 0;
  font-size: 9.5px;
  letter-spacing: 0.14em;
  color: rgba(25, 23, 19, 0.42);
  z-index: 4;
}

@media (max-width: 980px) {
  .hero__foot {
    grid-template-columns: 1fr;
    gap: 26px;
  }
  .hero__scroll {
    display: none;
  }
  .hero__credit {
    writing-mode: horizontal-tb;
    text-align: left;
    max-height: none;
  }
}

@media (max-width: 760px) {
  .hero__vertical {
    top: 92px;
    left: var(--gutter);
    right: var(--gutter);
    flex-direction: column;
    gap: 10px;
  }
  .hero__title {
    writing-mode: horizontal-tb;
    font-size: clamp(40px, 13vw, 68px);
    letter-spacing: 0.14em;
  }
  .hero__era {
    writing-mode: horizontal-tb;
    font-size: 10px;
    letter-spacing: 0.28em;
  }
  .hero__lead {
    font-size: 19px;
    line-height: 1.72;
  }
  .hero__sub {
    font-size: 12px;
  }
}
</style>
