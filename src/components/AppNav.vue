<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const chapters = [
  { id: 'background', no: '壹', label: '时代' },
  { id: 'timeline', no: '貳', label: '时序' },
  { id: 'figures', no: '叁', label: '人物' },
  { id: 'events', no: '肆', label: '事件' },
  { id: 'culture', no: '伍', label: '文华' },
  { id: 'relics', no: '陸', label: '遗存' },
  { id: 'legacy', no: '柒', label: '回响' },
  { id: 'reflection', no: '捌', label: '私见' },
]

const scrolled = ref(false)
const open = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 48
}

function go(e, id) {
  e.preventDefault()
  open.value = false
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 62
  window.scrollTo({ top, behavior: 'smooth' })
}

function onKey(e) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header class="nav" :class="{ 'nav--solid': scrolled, 'nav--open': open }">
    <div class="nav__inner">
      <a class="nav__brand" href="#top" @click="go($event, 'top')">
        <span class="nav__seal">梦华</span>
        <span class="nav__brandtext">
          <strong>汴京梦华</strong>
          <em>北宋 · 九六〇—一一二七</em>
        </span>
      </a>

      <nav class="nav__links" aria-label="章节导航">
        <a
          v-for="c in chapters"
          :key="c.id"
          :href="`#${c.id}`"
          class="nav__link"
          @click="go($event, c.id)"
        >
          <i>{{ c.no }}</i><b>{{ c.label }}</b>
        </a>
      </nav>

      <button
        class="nav__toggle"
        type="button"
        :aria-expanded="open"
        aria-label="打开目录"
        @click="open = !open"
      >
        <span></span><span></span>
      </button>
    </div>

    <transition name="sheet">
      <div v-if="open" class="nav__sheet">
        <ul>
          <li v-for="c in chapters" :key="c.id">
            <a :href="`#${c.id}`" @click="go($event, c.id)">
              <i>{{ c.no }}</i>
              <b>{{ c.label }}</b>
            </a>
          </li>
        </ul>
        <p class="nav__sheet-foot">宣纸为底 · 墨色为骨 · 天青为魄</p>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 90;
  transition: background 500ms var(--ease), box-shadow 500ms var(--ease);
}

.nav::after {
  content: "";
  position: absolute;
  inset: auto 0 0 0;
  height: 1px;
  background: var(--line);
  opacity: 0;
  transition: opacity 400ms ease;
}

.nav--solid {
  background: rgba(244, 237, 223, 0.86);
  backdrop-filter: blur(14px) saturate(120%);
}

.nav--open {
  background: var(--paper);
}

.nav--open .nav__brandtext strong,
.nav--open .nav__toggle span {
  color: var(--ink);
}

.nav--open .nav__toggle span {
  background-color: var(--ink);
}

.nav--open .nav__brandtext em {
  color: var(--ink-faint);
}

.nav--solid::after {
  opacity: 1;
}

.nav__inner {
  max-width: var(--max);
  margin: 0 auto;
  padding: 14px var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 66px;
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.nav__seal {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  background: var(--cinnabar);
  color: #f8f2e6;
  font-family: var(--kai);
  font-size: 9px;
  line-height: 1.05;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
  border-radius: 2px;
  transform: rotate(-3deg);
}

.nav__brandtext {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.nav__brandtext strong {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.24em;
}

.nav__brandtext em {
  font-style: normal;
  font-size: 9.5px;
  letter-spacing: 0.26em;
  color: var(--ink-faint);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(4px, 1.4vw, 20px);
}

.nav__link {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 5px;
  padding: 6px 2px;
  font-size: 13.5px;
  letter-spacing: 0.16em;
  color: var(--ink-soft);
  transition: color 300ms ease;
}

.nav__link i {
  font-family: var(--kai);
  font-style: normal;
  font-size: 10px;
  color: var(--ink-faint);
  transition: color 300ms ease;
}

.nav__link b {
  font-weight: 400;
}

.nav__link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--cinnabar);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 460ms var(--ease);
}

.nav__link:hover {
  color: var(--ink);
}

.nav__link:hover i {
  color: var(--cinnabar);
}

.nav__link:hover::after {
  transform: scaleX(1);
}

/* 未滚动的首屏：导航浮在深色画心上，改用米色 */
.nav:not(.nav--solid):not(.nav--open) .nav__brandtext strong,
.nav:not(.nav--solid):not(.nav--open) .nav__link {
  color: #f6efe0;
}

.nav:not(.nav--solid):not(.nav--open) .nav__brandtext em,
.nav:not(.nav--solid):not(.nav--open) .nav__link i {
  color: rgba(246, 239, 224, 0.55);
}

.nav:not(.nav--solid):not(.nav--open) .nav__link:hover {
  color: #fff;
}

.nav:not(.nav--solid):not(.nav--open) .nav__link:hover i {
  color: #e79a8a;
}

.nav:not(.nav--solid):not(.nav--open) .nav__toggle span {
  background: #f6efe0;
}

.nav__toggle {
  display: none;
  width: 40px;
  height: 40px;
  position: relative;
  align-items: center;
  justify-content: center;
}

.nav__toggle span {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 1px;
  background: var(--ink);
  transition: transform 420ms var(--ease), background 300ms ease;
}

.nav__toggle span:nth-child(1) {
  transform: translateY(-4px);
}

.nav__toggle span:nth-child(2) {
  transform: translateY(4px);
}

.nav--open .nav__toggle span:nth-child(1) {
  transform: rotate(45deg);
}
.nav--open .nav__toggle span:nth-child(2) {
  transform: rotate(-45deg);
}

.nav__sheet {
  position: fixed;
  inset: 66px 0 0 0;
  background: var(--paper);
  padding: 28px var(--gutter) 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  overflow-y: auto;
}

.nav__sheet ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__sheet li + li {
  border-top: 1px solid var(--line-soft);
}

.nav__sheet a {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 16px 2px;
}

.nav__sheet i {
  font-family: var(--kai);
  font-style: normal;
  font-size: 13px;
  color: var(--cinnabar);
}

.nav__sheet b {
  font-weight: 400;
  font-size: 22px;
  letter-spacing: 0.2em;
}

.nav__sheet-foot {
  margin: 32px 0 0;
  font-size: 10.5px;
  letter-spacing: 0.3em;
  color: var(--ink-faint);
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 320ms var(--ease), transform 420ms var(--ease);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 900px) {
  .nav__links {
    display: none;
  }
  .nav__toggle {
    display: flex;
  }
  .nav__brandtext em {
    display: none;
  }
  .hero-title-fallback {
    display: block;
  }
}
</style>
