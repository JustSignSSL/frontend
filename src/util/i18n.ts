import { createI18n } from 'vue-i18n'
import zhCN from '../locales/zh-CN'
import enUS from '../locales/en-US'
import { langEnum, locale } from '../locales/defines'

const messages = {
    "zh-CN": zhCN,
    "en-US": enUS
}

export const i18n = createI18n({
    locale: navigator.language.startsWith("zh") ? "zh-CN" : "en-US",
    fallbackLocale: 'en-US',
    messages
})

export const t = (query: keyof locale) => {
    let currLang: langEnum = navigator.language in messages
        ? navigator.language as langEnum
        : "en-US"
    return messages[currLang][query]
}