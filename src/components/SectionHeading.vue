<script setup>
defineProps({
  no: { type: String, required: true },
  title: { type: String, required: true },
  en: { type: String, default: '' },
  lead: { type: String, default: '' },
})
</script>

<template>
  <header class="sec-head">
    <div v-reveal>
      <div class="sec-head__no">
        <span>{{ no }}</span>
        <span>Chapter</span>
      </div>
      <h2 class="sec-head__title">{{ title }}</h2>
      <p v-if="en" class="sec-head__en">{{ en }}</p>
    </div>
    <div v-if="lead || $slots.lead" class="sec-head__body" v-reveal="{ delay: 120 }">
      <slot name="lead">
        <p class="sec-head__lead">{{ lead }}</p>
      </slot>
    </div>
  </header>
</template>

<style scoped>
.sec-head__body {
  padding-top: 6px;
}

@media (max-width: 860px) {
  .sec-head__body {
    padding-top: 0;
  }
}
</style>
