<script setup>
import SectionHeading from './SectionHeading.vue'
import { background } from '../data/song.js'

const numerals = ['01', '02', '03', '04']
</script>

<template>
  <section id="background" class="section bg">
    <div class="wrap">
      <SectionHeading :no="background.no" :title="background.title" :en="background.en" :lead="background.lead" />

      <div class="bg__list">
        <article
          v-for="(b, i) in background.blocks"
          :key="b.tag"
          class="bg__row"
          v-reveal="{ delay: i * 80 }"
        >
          <div class="bg__left">
            <span class="bg__idx">{{ numerals[i] }}</span>
            <span class="bg__tag">{{ b.tag }}</span>
          </div>
          <div class="bg__right">
            <h3 class="bg__title">{{ b.title }}</h3>
            <p class="bg__text">{{ b.text }}</p>
          </div>
        </article>
      </div>

      <figure class="bg__quote" v-reveal>
        <div class="bg__verse">
          <p class="bg__vline">举目则青楼画阁，绣户珠帘。</p>
          <p class="bg__vline">雕车竞驻于天街，宝马争驰于御路。</p>
        </div>
        <figcaption class="bg__sign">
          <span>孟元老《东京梦华录·序》</span>
          <em>追忆北宋东京的繁华</em>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.bg {
  background:
    radial-gradient(80% 60% at 100% 0%, rgba(213, 224, 218, 0.34) 0%, rgba(244, 237, 223, 0) 60%),
    var(--paper);
}

.bg__list {
  border-top: 1px solid var(--line);
}

.bg__row {
  display: grid;
  grid-template-columns: minmax(150px, 0.5fr) minmax(0, 1.7fr);
  gap: clamp(20px, 4vw, 64px);
  padding-block: clamp(28px, 3.6vw, 46px);
  border-bottom: 1px solid var(--line);
  position: relative;
}

.bg__row::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 1px;
  width: 0;
  background: var(--cinnabar);
  transition: width 900ms var(--ease);
}

.bg__row:hover::after {
  width: 100%;
}

.bg__left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-top: 4px;
}

.bg__idx {
  font-family: var(--serif);
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--cinnabar);
}

.bg__tag {
  font-family: var(--kai);
  font-size: 13px;
  letter-spacing: 0.3em;
  color: var(--ink-mute);
  writing-mode: vertical-rl;
  text-orientation: upright;
  line-height: 1.75;
}

.bg__title {
  margin: 0 0 14px;
  font-size: clamp(19px, 2vw, 25px);
  font-weight: 600;
  letter-spacing: 0.05em;
  line-height: 1.5;
}

.bg__text {
  margin: 0;
  font-size: clamp(14.5px, 1.25vw, 16px);
  line-height: 2.2;
  color: var(--ink-soft);
  text-align: justify;
  max-width: 74ch;
}

/* 引文：两行竖排题跋 + 左侧落款 */
.bg__quote {
  margin: clamp(48px, 6vw, 86px) 0 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(20px, 3vw, 42px);
}

.bg__verse {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  gap: clamp(14px, 2vw, 30px);
}

.bg__vline {
  margin: 0;
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-family: var(--kai);
  font-size: clamp(17px, 1.9vw, 25px);
  line-height: 1.5;
  letter-spacing: 0.2em;
  color: var(--ink);
}

.bg__sign {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 12px;
  letter-spacing: 0.22em;
  line-height: 1.8;
  color: var(--ink-soft);
}

.bg__sign em {
  font-style: normal;
  font-size: 10.5px;
  color: var(--ink-mute);
}

.bg__sign span::after {
  content: "　";
}

@media (max-width: 860px) {
  .bg__row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .bg__tag {
    writing-mode: horizontal-tb;
  }
  .bg__quote {
    flex-direction: column;
    align-items: flex-start;
  }
  .bg__verse {
    gap: 10px;
  }
  .bg__vline {
    font-size: 17px;
    letter-spacing: 0.14em;
  }
  .bg__quote {
    align-items: flex-start;
  }
}
</style>
