import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)

/**
 * v-reveal —— 滚动入场指令
 * 用法：v-reveal 或 v-reveal="{ delay: 120, y: 28 }"
 * 仅在元素首次进入视口时触发一次，尊重 prefers-reduced-motion。
 */
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer = null
if (typeof window !== 'undefined' && 'IntersectionObserver' in window && !reduceMotion) {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
}

app.directive('reveal', {
  mounted(el, binding) {
    const opts = binding.value || {}
    el.classList.add('reveal')
    if (opts.delay) el.style.setProperty('--reveal-delay', `${opts.delay}ms`)
    if (opts.y) el.style.setProperty('--reveal-y', `${opts.y}px`)
    if (!observer) {
      el.classList.add('is-revealed')
      return
    }
    observer.observe(el)
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  },
})

app.mount('#app')
