import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import store from '@/store'
import { mergeSetting } from '@/store/actions'

i18n
	// load translation using http -> see /public/locales
	// learn more: https://github.com/i18next/i18next-http-backend
	.use(Backend)
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		fallbackLng: 'zh',
		debug: false,

		react: {
			useSuspense: true // https://github.com/i18next/react-i18next/issues/766
		},

		interpolation: {
			escapeValue: false // not needed for react as it escapes by default
		}
	})

// detect lange sync to store, only once.


function asyncToStore() {
	let detected = false
	return lang => {
		if (detected) return
		detected = true

		if (lang === 'zh') {
			lang = 'zh-CN'
		} else if (lang === 'en') {
			lang = 'en-US'
		}
		store.dispatch(mergeSetting({ lang }))
	}
}
i18n.on('languageChanged', asyncToStore())
export default i18n
