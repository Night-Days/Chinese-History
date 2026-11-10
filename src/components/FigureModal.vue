<script setup>
import { asset } from '../utils/asset.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  figure: { type: Object, required: true },
})
const emit = defineEmits(['close'])

const panel = ref(null)
const closeBtn = ref(null)
let prevOverflow = ''

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key !== 'Tab' || !panel.value) return
  const focusables = panel.value.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

onMounted(() => {
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
  closeBtn.value?.focus()
})

onBeforeUnmount(() => {
  document.body.style.overflow = prevOverflow
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <teleport to="body">
    <div class="fm" role="dialog" aria-modal="true" :aria-label="`${figure.name} 生平`" @click.self="emit('close')">
      <div ref="panel" class="fm__panel">
        <button ref="closeBtn" class="fm__close" type="button" aria-label="关闭" @click="emit('close')">
          <span></span><span></span>
        </button>

        <aside class="fm__side">
          <img :src="asset(figure.img)" :alt="`${figure.name}像`" />
          <p class="fm__side-cap">P O R T R A I T</p>
        </aside>

        <div class="fm__main">
          <header class="fm__head">
            <p class="fm__role">{{ figure.role }}</p>
            <h2 class="fm__name">
              {{ figure.name }}
              <span>{{ figure.alias }}</span>
            </h2>
            <p class="fm__dates">{{ figure.dates }}</p>
          </header>

          <blockquote class="fm__quote">「{{ figure.quote }}」</blockquote>

          <div class="fm__block">
            <h3>生平</h3>
            <ul class="fm__life">
              <li v-for="(l, i) in figure.life" :key="i">{{ l }}</li>
            </ul>
          </div>

          <div class="fm__block">
            <h3>影响与贡献</h3>
            <ul class="fm__contrib">
              <li v-for="(c, i) in figure.contribution" :key="i">{{ c }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.fm {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(24, 20, 15, 0.62);
  backdrop-filter: blur(9px) saturate(0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(12px, 4vw, 56px);
  animation: fade 300ms var(--ease) both;
  overscroll-behavior: contain;
}

@keyframes fade {
  from {
    opacity: 0;
  }
}

.fm__panel {
  position: relative;
  width: min(1000px, 100%);
  max-height: min(88vh, 900px);
  overflow-y: auto;
  background: var(--paper);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.36);
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
  animation: rise 520ms var(--ease) both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translate3d(0, 26px, 0) scale(0.99);
  }
}

.fm__side {
  position: relative;
  border-right: 1px solid var(--line);
  background: var(--paper-2);
  min-height: 260px;
}

.fm__side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
  filter: grayscale(1) sepia(0.34) contrast(1.03) brightness(1.02);
  mix-blend-mode: multiply;
  opacity: 0.94;
}

.fm__side-cap {
  position: absolute;
  left: 16px;
  bottom: 14px;
  margin: 0;
  font-size: 9px;
  letter-spacing: 0.4em;
  color: var(--ink-faint);
}

.fm__main {
  padding: clamp(26px, 4vw, 52px);
}

.fm__role {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.26em;
  color: var(--cinnabar);
}

.fm__name {
  margin: 12px 0 0;
  font-size: clamp(28px, 3.4vw, 40px);
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1.3;
}

.fm__name span {
  display: inline-block;
  margin-left: 12px;
  font-family: var(--kai);
  font-size: 14px;
  letter-spacing: 0.16em;
  color: var(--ink-mute);
  vertical-align: 6px;
}

.fm__dates {
  margin: 6px 0 0;
  font-size: 12.5px;
  letter-spacing: 0.16em;
  color: var(--ink-faint);
}

.fm__quote {
  margin: clamp(20px, 3vw, 30px) 0;
  padding: 12px 0 12px 20px;
  border-left: 2px solid var(--cinnabar);
  font-family: var(--kai);
  font-size: clamp(15px, 1.5vw, 18px);
  line-height: 1.9;
  letter-spacing: 0.08em;
  color: var(--ink);
}

.fm__block + .fm__block {
  margin-top: clamp(18px, 2.4vw, 28px);
}

.fm__block h3 {
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.34em;
  color: var(--ink-faint);
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 8px;
}

.fm__life,
.fm__contrib {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fm__life li,
.fm__contrib li {
  position: relative;
  padding-left: 18px;
  font-size: 14px;
  line-height: 2;
  color: var(--ink-soft);
  text-align: justify;
}

.fm__life li + li,
.fm__contrib li + li {
  margin-top: 10px;
}

.fm__life li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.95em;
  width: 6px;
  height: 1px;
  background: var(--ink-faint);
}

.fm__contrib li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.95em;
  width: 6px;
  height: 6px;
  border: 1px solid var(--cinnabar);
  transform: rotate(45deg);
}

.fm__close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  background: rgba(244, 237, 223, 0.9);
  border: 1px solid var(--line);
  border-radius: 50%;
  transition: background 240ms ease, transform 240ms var(--ease);
}

.fm__close:hover {
  background: var(--ink);
  transform: rotate(90deg);
}

.fm__close span {
  position: absolute;
  width: 13px;
  height: 1px;
  background: var(--ink);
}

.fm__close:hover span {
  background: var(--paper);
}

.fm__close span:nth-child(1) {
  transform: rotate(45deg);
}
.fm__close span:nth-child(2) {
  transform: rotate(-45deg);
}

@media (max-width: 760px) {
  .fm__panel {
    grid-template-columns: 1fr;
    max-height: 92vh;
  }
  .fm__side {
    height: 220px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .fm__side img {
    object-position: 50% 12%;
  }
}
</style>
