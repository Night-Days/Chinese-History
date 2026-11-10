<script setup>
import { stats } from '../data/song.js'
</script>

<template>
  <section class="stats" aria-label="北宋概况数据">
    <div class="wrap stats__grid">
      <div v-for="(s, i) in stats" :key="s.label" class="stats__item" v-reveal="{ delay: i * 90 }">
        <p class="stats__value">
          <span>{{ s.value }}</span><em>{{ s.unit }}</em>
        </p>
        <p class="stats__label">{{ s.label }}</p>
        <p class="stats__note">{{ s.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  position: relative;
  z-index: 1;
  background: var(--paper-2);
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.stats__item {
  padding: clamp(26px, 3.4vw, 44px) clamp(14px, 2vw, 30px);
  position: relative;
}

.stats__item + .stats__item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22%;
  bottom: 22%;
  width: 1px;
  background: var(--line);
}

.stats__value {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--serif);
  color: var(--ink);
}

.stats__value span {
  font-size: clamp(28px, 3.6vw, 46px);
  line-height: 1.1;
  letter-spacing: 0.01em;
  font-weight: 500;
}

.stats__value em {
  font-style: normal;
  font-size: clamp(11px, 1.1vw, 13px);
  letter-spacing: 0.08em;
  color: var(--cinnabar);
}

.stats__label {
  margin: 10px 0 0;
  font-size: 13.5px;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
}

.stats__note {
  margin: 4px 0 0;
  font-size: 11.5px;
  line-height: 1.7;
  letter-spacing: 0.04em;
  color: var(--ink-faint);
}

@media (max-width: 760px) {
  .stats__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats__item:nth-child(3)::before {
    display: none;
  }
  .stats__item:nth-child(3),
  .stats__item:nth-child(4) {
    border-top: 1px solid var(--line-soft);
  }
}
</style>
