<script setup>
import SectionHeading from './SectionHeading.vue'
import { legacy } from '../data/song.js'
</script>

<template>
  <section id="legacy" class="section legacy">
    <div class="wrap">
      <SectionHeading
        no="柒"
        title="回响"
        en="Legacy"
        lead="北宋早已结束，但它定义的许多东西仍在运行：城市的形态、读书人的角色、纸币的逻辑、以及一种偏爱素淡的审美。以下四点，是我认为它留给今天最实在的遗产。"
      />

      <div class="legacy__grid">
        <article v-for="(l, i) in legacy" :key="l.no" class="legacy__item" v-reveal="{ delay: i * 90 }">
          <span class="legacy__no">{{ l.no }}</span>
          <div class="legacy__body">
            <h3>{{ l.title }}</h3>
            <p>{{ l.text }}</p>
          </div>
        </article>
      </div>

      <div class="legacy__ribbon" v-reveal>
        <span class="legacy__ribbon-line" aria-hidden="true"></span>
        <p>
          从汴京到临安，从交子到纸币，从《营造法式》到今天的建筑模数——
          <em>一个王朝的尺度，往往比它的疆域活得更久。</em>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legacy {
  background:
    radial-gradient(50% 50% at 20% 10%, rgba(213, 224, 218, 0.4) 0%, rgba(244, 237, 223, 0) 60%),
    var(--paper);
}

.legacy__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
}

.legacy__item {
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr);
  gap: clamp(10px, 2vw, 24px);
  padding: clamp(24px, 3.2vw, 40px) clamp(0px, 2vw, 26px) clamp(24px, 3.2vw, 40px) 0;
  border-bottom: 1px solid var(--line);
  position: relative;
  transition: background 500ms ease;
}

.legacy__item:nth-child(odd) {
  padding-right: clamp(20px, 3vw, 44px);
  border-right: 1px solid var(--line);
}

.legacy__item:nth-child(even) {
  padding-left: clamp(20px, 3vw, 44px);
}

.legacy__item:hover {
  background: rgba(255, 255, 255, 0.32);
}

.legacy__no {
  font-size: clamp(24px, 2.6vw, 34px);
  line-height: 1;
  font-weight: 300;
  color: transparent;
  -webkit-text-stroke: 1px var(--ink-faint);
  letter-spacing: 0.02em;
  transition: -webkit-text-stroke-color 400ms ease, color 400ms ease;
}

.legacy__item:hover .legacy__no {
  color: var(--cinnabar);
  -webkit-text-stroke-color: var(--cinnabar);
}

.legacy__body h3 {
  margin: 0 0 12px;
  font-size: clamp(17px, 1.8vw, 21px);
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.5;
}

.legacy__body p {
  margin: 0;
  font-size: clamp(13.5px, 1.15vw, 14.5px);
  line-height: 2.15;
  color: var(--ink-soft);
  text-align: justify;
}

.legacy__ribbon {
  margin-top: clamp(46px, 6vw, 80px);
  display: flex;
  align-items: center;
  gap: clamp(16px, 3vw, 36px);
}

.legacy__ribbon-line {
  flex: 0 0 clamp(40px, 8vw, 110px);
  height: 1px;
  background: var(--cinnabar);
  opacity: 0.6;
}

.legacy__ribbon p {
  margin: 0;
  font-family: var(--kai);
  font-size: clamp(15px, 1.6vw, 20px);
  line-height: 1.95;
  letter-spacing: 0.06em;
  color: var(--ink-soft);
}

.legacy__ribbon em {
  font-style: normal;
  color: var(--cinnabar-deep);
  border-bottom: 1px solid rgba(156, 59, 46, 0.3);
}

@media (max-width: 760px) {
  .legacy__grid {
    grid-template-columns: 1fr;
  }
  .legacy__item:nth-child(odd),
  .legacy__item:nth-child(even) {
    padding: 24px 0;
    border-right: 0;
  }
  .legacy__ribbon {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
