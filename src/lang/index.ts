import { createI18n } from 'vue3-i18n'
import { en } from './en'
import { vie } from './vie'

const messages = {
    en: en,
    vie: vie,
}

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
} as any)

export default i18n
