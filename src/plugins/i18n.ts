import { createI18n } from 'vue-i18n'
import ptBR from '@/locales/pt-BR.json'
import enUS from '@/locales/en-US.json'

export type Locale = 'pt-BR' | 'en-US'

const savedLocale = (localStorage.getItem('portfolio:locale') as Locale) || 'pt-BR'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
    'en-US': enUS
  }
})

export function toggleLocale() {
  const current = i18n.global.locale.value as Locale
  const next: Locale = current === 'pt-BR' ? 'en-US' : 'pt-BR'
  i18n.global.locale.value = next
  localStorage.setItem('portfolio:locale', next)
  document.documentElement.lang = next
}
