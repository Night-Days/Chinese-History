<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  title: { type: String, default: '' },
  meta: { type: String, default: '' },
})
</script>

<template>
  <figure class="band">
    <div class="band__frame">
      <img :src="src" :alt="alt" loading="lazy" decoding="async" />
      <div class="band__tones" aria-hidden="true"></div>
    </div>
    <figcaption class="band__cap">
      <span class="band__title vertical">{{ title }}</span>
      <span class="band__meta">{{ meta }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.band {
  margin: 0;
  position: relative;
  z-index: 1;
  background: #1a1712;
  isolation: isolate;
}

.band__frame {
  position: relative;
  height: clamp(220px, 31vw, 400px);
  overflow: hidden;
}

.band__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 46%;
  transform: scale(1.02);
  transition: transform 1.6s var(--ease);
  filter: saturate(0.94) contrast(1.02);
}

.band__frame:hover img {
  transform: scale(1.06);
}

/* 上下压暗，做出卷轴边缘的层次 */
.band__tones {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(20, 17, 12, 0.5) 0%, rgba(20, 17, 12, 0) 26%, rgba(20, 17, 12, 0) 62%, rgba(20, 17, 12, 0.62) 100%),
    linear-gradient(90deg, rgba(20, 17, 12, 0.42) 0%, rgba(20, 17, 12, 0) 38%);
  pointer-events: none;
}

.band__cap {
  position: absolute;
  left: var(--gutter);
  bottom: clamp(18px, 2.6vw, 34px);
  display: flex;
  align-items: flex-end;
  gap: clamp(10px, 1.6vw, 20px);
  color: #f4ecdb;
}

.band__title {
  font-family: var(--kai);
  font-size: clamp(15px, 1.5vw, 19px);
  letter-spacing: 0.24em;
  line-height: 1.6;
  max-height: 150px;
}

.band__meta {
  font-size: 10.5px;
  letter-spacing: 0.2em;
  color: rgba(244, 236, 219, 0.66);
  padding-bottom: 2px;
}

@media (max-width: 760px) {
  .band__title {
    writing-mode: horizontal-tb;
  }
  .band__cap {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
