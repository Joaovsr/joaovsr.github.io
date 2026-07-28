import { ref, watch, type Ref } from 'vue'
import { getPortfolioContent, type PortfolioContent } from '@/api/content'
import type { Locale } from '@/plugins/i18n'

const content = ref<PortfolioContent | null>(null)
const loading = ref(false)
const error = ref(false)
let activeLocale: Locale | null = null
let pendingLoad: Promise<void> | null = null

export function usePortfolioContent(locale: Ref<Locale>) {
  watch(
    locale,
    async nextLocale => {
      if (activeLocale === nextLocale && content.value) return
      activeLocale = nextLocale
      loading.value = true
      error.value = false
      pendingLoad = getPortfolioContent(nextLocale)
        .then(nextContent => {
          if (activeLocale === nextLocale) content.value = nextContent
        })
        .catch(() => {
          if (activeLocale === nextLocale) error.value = true
        })
        .finally(() => {
          if (activeLocale === nextLocale) loading.value = false
        })
      await pendingLoad
    },
    { immediate: true }
  )

  return { content, loading, error }
}
