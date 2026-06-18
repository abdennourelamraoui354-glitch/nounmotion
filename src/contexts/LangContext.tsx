import { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from '../i18n/translations'
import { translations } from '../i18n/translations'

type AnyTranslation = typeof translations['en'] | typeof translations['ar']

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: AnyTranslation
  isAr: boolean
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  isAr: false,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (l: Lang) => {
    setLangState(l)
    document.documentElement.lang = l
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], isAr: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
