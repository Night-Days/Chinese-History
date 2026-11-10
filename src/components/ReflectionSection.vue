<script setup>
import { reflection } from '../data/song.js'
import { asset } from '../utils/asset.js'
</script>

<template>
  <section id="reflection" class="section reflect">
    <div
      class="reflect__bg"
      aria-hidden="true"
      :style="{ backgroundImage: `url(${asset('assets/images/qianli-section.jpg')})` }"
    ></div>

    <div class="wrap reflect__inner">
      <header class="reflect__head" v-reveal>
        <div class="reflect__no">
          <span>{{ reflection.no }}</span>
          <span>Chapter</span>
        </div>
        <h2 class="reflect__title">{{ reflection.title }}</h2>
        <p class="reflect__en">{{ reflection.en }}</p>
      </header>

      <div class="reflect__essay" v-reveal="{ delay: 100 }">
        <p v-for="(p, i) in reflection.paragraphs" :key="i" :class="{ 'is-lead': i === 0 }">
          {{ p }}
        </p>
      </div>

      <figure class="reflect__quote" v-reveal>
        <blockquote>「{{ reflection.quote }}」</blockquote>
        <figcaption>—— {{ reflection.quoteFrom }}</figcaption>
      </figure>

      <div class="reflect__sign" v-reveal>
        <span class="seal seal--lg reflect__seal">{{ reflection.sign }}</span>
        <p class="reflect__byline">
          文 / 图 · 本作品为「中国历史主题前端设计开发」参赛作品<br />
          <em>史料核对：以《宋史》《续资治通鉴长编》《东京梦华录》《梦溪笔谈》及学界通行说法为据</em>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reflect {
  position: relative;
  background: #17140f;
  color: #efe7d6;
  overflow: hidden;
  isolation: isolate;
}

.reflect__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: 50% 40%;
  opacity: 0.16;
  filter: grayscale(0.4) contrast(1.1);
  mix-blend-mode: luminosity;
}

.reflect::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(90% 70% at 50% 30%, rgba(23, 20, 15, 0.4) 0%, rgba(23, 20, 15, 0.94) 74%),
    linear-gradient(180deg, rgba(23, 20, 15, 0.96) 0%, rgba(23, 20, 15, 0.72) 40%, rgba(23, 20, 15, 0.98) 100%);
  pointer-events: none;
}

.reflect__inner {
  position: relative;
  z-index: 2;
}

.reflect__head {
  display: flex;
  align-items: baseline;
  gap: clamp(14px, 2vw, 24px);
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(239, 231, 214, 0.16);
  padding-bottom: clamp(18px, 2.4vw, 26px);
}

.reflect__no {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-family: var(--kai);
  color: #c1543f;
}

.reflect__no span:first-child {
  font-size: clamp(24px, 2.6vw, 34px);
  line-height: 1;
}

.reflect__no span:last-child {
  font-size: 10px;
  letter-spacing: 0.4em;
  color: rgba(239, 231, 214, 0.4);
  font-family: var(--serif);
}

.reflect__title {
  margin: 0;
  font-size: clamp(26px, 3.4vw, 42px);
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1.3;
}

.reflect__en {
  margin: 0;
  margin-left: auto;
  font-size: 10px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(239, 231, 214, 0.42);
}

.reflect__essay {
  margin-top: clamp(30px, 4vw, 52px);
  column-count: 2;
  column-gap: clamp(30px, 5vw, 68px);
  column-rule: 1px solid rgba(239, 231, 214, 0.12);
}

.reflect__essay p {
  margin: 0 0 1.4em;
  font-size: clamp(14px, 1.25vw, 15.5px);
  line-height: 2.35;
  letter-spacing: 0.03em;
  color: rgba(239, 231, 214, 0.8);
  text-align: justify;
  break-inside: avoid;
}

.reflect__essay p.is-lead::first-letter {
  float: left;
  font-family: var(--kai);
  font-size: 3.4em;
  line-height: 1;
  margin: 4px 10px 0 0;
  color: #c1543f;
}

.reflect__quote {
  margin: clamp(36px, 5vw, 64px) 0 0;
  padding: clamp(24px, 3.4vw, 40px) 0;
  border-top: 1px solid rgba(239, 231, 214, 0.16);
  border-bottom: 1px solid rgba(239, 231, 214, 0.16);
  text-align: center;
}

.reflect__quote blockquote {
  margin: 0;
  font-family: var(--kai);
  font-size: clamp(17px, 2.1vw, 26px);
  line-height: 1.9;
  letter-spacing: 0.1em;
  color: #f6efe0;
}

.reflect__quote figcaption {
  margin-top: 14px;
  font-size: 11px;
  letter-spacing: 0.28em;
  color: rgba(239, 231, 214, 0.48);
}

.reflect__sign {
  margin-top: clamp(34px, 4.4vw, 54px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: clamp(18px, 3vw, 40px);
}

.reflect__seal {
  flex: 0 0 auto;
  background: #a83f2d;
  transform: rotate(-3deg);
}

.reflect__byline {
  margin: 0;
  text-align: right;
  font-size: 11px;
  line-height: 2.1;
  letter-spacing: 0.1em;
  color: rgba(239, 231, 214, 0.55);
}

.reflect__byline em {
  font-style: normal;
  font-size: 10px;
  color: rgba(239, 231, 214, 0.36);
}

@media (max-width: 860px) {
  .reflect__essay {
    column-count: 1;
    column-rule: 0;
  }
  .reflect__en {
    margin-left: 0;
    width: 100%;
  }
  .reflect__sign {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .reflect__byline {
    text-align: left;
  }
}
</style>
