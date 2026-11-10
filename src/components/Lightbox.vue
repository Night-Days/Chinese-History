<script setup>
import { asset } from '../utils/asset.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  relic: { type: Object, required: true },
})
const emit = defineEmits(['close'])

const closeBtn = ref(null)
let prevOverflow = ''

function onKey(e) {
  if (e.key === 'Escape') emit('close')
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
    <div class="lb" role="dialog" aria-modal="true" :aria-label="relic.name" @click.self="emit('close')">
      <button ref="closeBtn" class="lb__close" type="button" aria-label="关闭" @click="emit('close')">
        <span></span><span></span>
      </button>

      <figure class="lb__figure">
        <div class="lb__stage">
          <img :src="asset(relic.img)" :alt="`${relic.name} —— ${relic.full}`" />
        </div>
        <figcaption class="lb__cap">
          <div class="lb__capmain">
            <h2>{{ relic.name }}</h2>
            <p class="lb__full">{{ relic.full }}</p>
            <p class="lb__text">{{ relic.text }}</p>
            <p class="lb__value">{{ relic.value }}</p>
          </div>
          <dl class="lb__dl">
            <div>
              <dt>地点</dt>
              <dd>{{ relic.place }}</dd>
            </div>
            <div>
              <dt>年代</dt>
              <dd>{{ relic.date }}</dd>
            </div>
          </dl>
        </figcaption>
      </figure>
    </div>
  </teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 210;
  background: rgba(16, 13, 9, 0.9);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(14px, 3.4vw, 48px);
  animation: lbfade 320ms ease both;
}

@keyframes lbfade {
  from {
    opacity: 0;
  }
}

.lb__figure {
  margin: 0;
  width: min(1180px, 100%);
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2vw, 22px);
  animation: lbrise 560ms var(--ease) both;
}

@keyframes lbrise {
  from {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
  }
}

.lb__stage {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(244, 237, 223, 0.04);
  border: 1px solid rgba(244, 237, 223, 0.14);
  padding: clamp(6px, 1.2vw, 14px);
}

.lb__stage img {
  max-width: 100%;
  max-height: min(56vh, 520px);
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
}

.lb__cap {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.42fr);
  gap: clamp(16px, 3vw, 44px);
  color: #eee5d4;
  border-top: 1px solid rgba(244, 237, 223, 0.16);
  padding-top: clamp(14px, 2vw, 20px);
}

.lb__capmain h2 {
  margin: 0;
  font-size: clamp(20px, 2.6vw, 30px);
  font-weight: 500;
  letter-spacing: 0.1em;
}

.lb__full {
  margin: 6px 0 0;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: rgba(238, 229, 212, 0.56);
}

.lb__text {
  margin: 12px 0 0;
  font-size: clamp(12.5px, 1.1vw, 14px);
  line-height: 2;
  color: rgba(238, 229, 212, 0.82);
  text-align: justify;
  max-width: 78ch;
}

.lb__value {
  margin: 10px 0 0;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  color: var(--celadon);
}

.lb__dl {
  margin: 0;
  align-self: start;
}

.lb__dl div {
  padding: 8px 0;
  border-bottom: 1px solid rgba(244, 237, 223, 0.1);
}

.lb__dl dt {
  font-size: 9.5px;
  letter-spacing: 0.3em;
  color: rgba(238, 229, 212, 0.42);
}

.lb__dl dd {
  margin: 4px 0 0;
  font-size: 12.5px;
  letter-spacing: 0.06em;
}

.lb__close {
  position: absolute;
  top: clamp(12px, 2.4vw, 26px);
  right: clamp(12px, 2.4vw, 26px);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(244, 237, 223, 0.3);
  display: grid;
  place-items: center;
  transition: background 260ms ease, transform 320ms var(--ease);
}

.lb__close:hover {
  background: rgba(244, 237, 223, 0.14);
  transform: rotate(90deg);
}

.lb__close span {
  position: absolute;
  width: 15px;
  height: 1px;
  background: #eee5d4;
}

.lb__close span:nth-child(1) {
  transform: rotate(45deg);
}
.lb__close span:nth-child(2) {
  transform: rotate(-45deg);
}

@media (max-width: 760px) {
  .lb__cap {
    grid-template-columns: 1fr;
  }
  .lb__stage img {
    max-height: 42vh;
  }
  .lb__text {
    font-size: 12px;
    line-height: 1.9;
  }
}
</style>
