<script setup>
import { asset } from '../utils/asset.js'
import { ref } from 'vue'
import SectionHeading from './SectionHeading.vue'
import FigureModal from './FigureModal.vue'
import { figures } from '../data/song.js'

const active = ref(null)
</script>

<template>
  <section id="figures" class="section figures">
    <div class="wrap">
      <SectionHeading
        no="叁"
        title="人物"
        en="Figures · Six Lives"
        lead="这个时代的面貌，最终由几个人承担。这里有开国者、改革者、被贬者、观测者与书写者——他们彼此争论、互相贬斥，却共同构成了北宋的精神地形。点击任一人物，展阅其生平。"
      />

      <div class="figures__grid">
        <article
          v-for="(f, i) in figures"
          :key="f.id"
          class="figcard"
          v-reveal="{ delay: (i % 3) * 90 }"
        >
          <button type="button" class="figcard__btn" :aria-label="`展阅 ${f.name} 生平`" @click="active = f">
            <span class="figcard__frame">
              <img :src="asset(f.img)" :alt="`${f.name}（${f.alias}）画像`" loading="lazy" decoding="async" />
              <span class="figcard__veil" aria-hidden="true"></span>
              <span class="figcard__seal" aria-hidden="true">{{ f.alias }}</span>
            </span>
            <span class="figcard__body">
              <span class="figcard__meta">
                <em>{{ f.dates }}</em>
                <i>{{ f.role }}</i>
              </span>
              <span class="figcard__name">{{ f.name }}</span>
              <span class="figcard__summary">{{ f.summary }}</span>
              <span class="figcard__more">展阅生平 <b aria-hidden="true">→</b></span>
            </span>
          </button>
        </article>
      </div>
    </div>

    <transition name="modal">
      <FigureModal v-if="active" :figure="active" @close="active = null" />
    </transition>
  </section>
</template>

<style scoped>
.figures {
  background:
    linear-gradient(180deg, var(--paper-2) 0%, var(--paper) 22%, var(--paper) 100%);
}

.figures__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(18px, 2.4vw, 34px);
}

.figcard__btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0;
}

.figcard__frame {
  position: relative;
  display: block;
  aspect-ratio: 4 / 5.1;
  overflow: hidden;
  background: var(--paper-3);
  border: 1px solid var(--line-soft);
}

.figcard__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 14%;
  filter: grayscale(1) sepia(0.32) contrast(1.02);
  mix-blend-mode: multiply;
  transform: scale(1.01);
  transition: transform 1.1s var(--ease), filter 700ms ease;
}

.figcard__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(244, 237, 223, 0.1) 0%, rgba(244, 237, 223, 0) 42%, rgba(244, 237, 223, 0.76) 100%),
    radial-gradient(120% 80% at 50% 10%, rgba(244, 237, 223, 0) 40%, rgba(233, 223, 204, 0.5) 100%);
  pointer-events: none;
}

.figcard__seal {
  position: absolute;
  left: 14px;
  bottom: 14px;
  font-family: var(--kai);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--cinnabar);
  writing-mode: vertical-rl;
  text-orientation: upright;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 500ms var(--ease), transform 500ms var(--ease);
}

.figcard__btn:hover .figcard__frame img {
  transform: scale(1.055);
  filter: grayscale(0.35) sepia(0.18) contrast(1.02);
}

.figcard__btn:hover .figcard__seal {
  opacity: 1;
  transform: none;
}

.figcard__body {
  display: block;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  margin-top: 14px;
}

.figcard__meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  color: var(--ink-faint);
}

.figcard__meta em {
  font-style: normal;
  color: var(--cinnabar);
  letter-spacing: 0.06em;
}

.figcard__meta i {
  font-style: normal;
  text-align: right;
}

.figcard__name {
  display: block;
  margin-top: 8px;
  font-size: clamp(20px, 2.1vw, 26px);
  font-weight: 600;
  letter-spacing: 0.14em;
  transition: color 300ms ease;
}

.figcard__btn:hover .figcard__name {
  color: var(--cinnabar-deep);
}

.figcard__summary {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.95;
  color: var(--ink-mute);
  text-align: justify;
}

.figcard__more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 10.5px;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  opacity: 0.6;
  transition: opacity 300ms ease, gap 300ms var(--ease);
}

.figcard__btn:hover .figcard__more {
  opacity: 1;
  gap: 12px;
}

.figcard__more b {
  color: var(--cinnabar);
  font-weight: 400;
}

@media (max-width: 980px) {
  .figures__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .figures__grid {
    grid-template-columns: 1fr;
  }
  .figcard__frame {
    aspect-ratio: 4 / 3.6;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 260ms ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
