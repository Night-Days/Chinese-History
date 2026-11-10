<script setup>
import { asset } from '../utils/asset.js'
import { ref } from 'vue'
import SectionHeading from './SectionHeading.vue'
import { events } from '../data/song.js'

const openId = ref(events[0].id)

function toggle(id) {
  openId.value = openId.value === id ? '' : id
}
</script>

<template>
  <section id="events" class="section events">
    <div class="wrap">
      <SectionHeading
        no="肆"
        title="事件"
        en="Five Turning Points"
        lead="制度的成败，往往在几个具体的时刻里显形。以下五件事，分别对应北宋的开国、外交、内政改革与终结：起因、经过、结果与意义，逐条梳理，力求客观。"
      />

      <div class="ev">
        <article
          v-for="e in events"
          :key="e.id"
          class="ev__item"
          :class="{ 'is-open': openId === e.id }"
        >
          <h3 class="ev__headwrap">
            <button
              type="button"
              class="ev__head"
              :aria-expanded="openId === e.id"
              :aria-controls="`ev-panel-${e.id}`"
              @click="toggle(e.id)"
            >
              <span class="ev__year">{{ e.year }}</span>
              <span class="ev__titles">
                <span class="ev__title">{{ e.title }}</span>
                <span class="ev__era">{{ e.era }}　·　{{ e.place }}</span>
              </span>
              <span class="ev__icon" aria-hidden="true"></span>
            </button>
          </h3>

          <div :id="`ev-panel-${e.id}`" class="ev__panel" role="region">
            <div class="ev__inner">
              <figure class="ev__media">
                <img :src="asset(e.img)" :alt="`${e.title} 相关历史图像`" loading="lazy" decoding="async" />
                <figcaption>{{ e.place }}</figcaption>
              </figure>

              <div class="ev__body">
                <div class="ev__part">
                  <h4>起因</h4>
                  <p>{{ e.cause }}</p>
                </div>
                <div class="ev__part">
                  <h4>经过</h4>
                  <p>{{ e.process }}</p>
                </div>
                <div class="ev__part">
                  <h4>结果</h4>
                  <p>{{ e.result }}</p>
                </div>
                <div class="ev__part ev__part--mark">
                  <h4>历史意义</h4>
                  <p>{{ e.significance }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.events {
  background:
    radial-gradient(60% 40% at 100% 0%, rgba(213, 224, 218, 0.28) 0%, rgba(244, 237, 223, 0) 60%),
    var(--paper);
}

.ev {
  border-top: 1px solid var(--ink);
}

.ev__item {
  border-bottom: 1px solid var(--line);
}

.ev__headwrap {
  margin: 0;
  font-weight: inherit;
}

.ev__head {
  display: grid;
  grid-template-columns: minmax(80px, 0.42fr) minmax(0, 3fr) 40px;
  align-items: center;
  gap: clamp(12px, 2.4vw, 30px);
  width: 100%;
  padding: clamp(18px, 2.4vw, 28px) 0;
  text-align: left;
  transition: padding 400ms var(--ease);
}

.ev__year {
  font-size: clamp(15px, 1.5vw, 18px);
  letter-spacing: 0.14em;
  color: var(--cinnabar);
  transition: color 300ms ease;
}

.ev__titles {
  display: flex;
  align-items: baseline;
  gap: clamp(10px, 2vw, 26px);
  flex-wrap: wrap;
}

.ev__title {
  font-size: clamp(21px, 2.6vw, 32px);
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.4;
  transition: transform 460ms var(--ease), color 300ms ease;
}

.ev__era {
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--ink-faint);
}

.ev__head:hover .ev__title {
  transform: translateX(6px);
}

.ev__head:hover .ev__year {
  color: var(--ink);
}

.ev__icon {
  position: relative;
  width: 18px;
  height: 18px;
  justify-self: end;
}

.ev__icon::before,
.ev__icon::after {
  content: "";
  position: absolute;
  background: var(--ink-soft);
  transition: transform 460ms var(--ease), background 300ms ease;
}

.ev__icon::before {
  left: 0;
  top: 8.5px;
  width: 18px;
  height: 1px;
}

.ev__icon::after {
  left: 8.5px;
  top: 0;
  width: 1px;
  height: 18px;
}

.is-open .ev__icon::after {
  transform: rotate(90deg);
  background: var(--cinnabar);
}

.is-open .ev__icon::before {
  background: var(--cinnabar);
}

/* 展开动画 */
.ev__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 620ms var(--ease);
}

.is-open .ev__panel {
  grid-template-rows: 1fr;
}

.ev__inner {
  overflow: hidden;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
  gap: clamp(20px, 3.4vw, 48px);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 500ms ease 90ms, transform 560ms var(--ease) 90ms;
}

.is-open .ev__inner {
  opacity: 1;
  transform: none;
  padding-bottom: clamp(26px, 3.4vw, 44px);
}

.ev__media {
  margin: 0;
  align-self: start;
  position: relative;
  border: 1px solid var(--line-soft);
  background: var(--paper-2);
}

.ev__media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  filter: grayscale(0.55) sepia(0.22) contrast(1.02);
}

.ev__media figcaption {
  padding: 8px 10px;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--ink-faint);
  border-top: 1px solid var(--line-soft);
}

.ev__body {
  display: grid;
  gap: clamp(14px, 1.8vw, 22px);
}

.ev__part {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: clamp(10px, 1.6vw, 20px);
}

.ev__part h4 {
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.26em;
  color: var(--ink-faint);
  padding-top: 6px;
  border-top: 1px solid var(--line);
}

.ev__part p {
  margin: 0;
  font-size: clamp(13.5px, 1.2vw, 15px);
  line-height: 2.15;
  color: var(--ink-soft);
  text-align: justify;
}

.ev__part--mark h4 {
  color: var(--cinnabar);
  border-top-color: rgba(156, 59, 46, 0.4);
}

.ev__part--mark p {
  color: var(--ink);
  background: linear-gradient(180deg, rgba(213, 224, 218, 0.35), rgba(213, 224, 218, 0));
  padding: 10px 14px 12px;
  border-left: 2px solid var(--celadon);
}

@media (max-width: 900px) {
  .ev__inner {
    grid-template-columns: 1fr;
  }
  .ev__media img {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 620px) {
  .ev__head {
    grid-template-columns: 56px minmax(0, 1fr) 24px;
  }
  .ev__part {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  .ev__part h4 {
    border-top: 0;
    padding-top: 0;
  }
}
</style>
