// composables/useTheme.ts
import { ref, watch, onMounted } from 'vue'
const KEY = 'theme'

export function useTheme() {
  const theme = ref<'light' | 'dark'>('light')

  onMounted(() => {
    theme.value =
      (localStorage.getItem(KEY) as 'light' | 'dark' | null)
      ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    apply(theme.value)
  })

  watch(theme, val => {
    localStorage.setItem(KEY, val)
    apply(val)
  })

  function apply(val: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', val)
  }
  function toggle() { theme.value = theme.value === 'light' ? 'dark' : 'light' }

  return { theme, toggle }
}
