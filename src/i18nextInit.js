import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import tm from './locales/tm.json';
import ml from './locales/ml.json';
i18n
 .use(initReactI18next)
  // init i18next
  .init({
    resources: {
      en: { // translation is the default namespace
        translation: en
      },
      tm: {
        translation: tm
      },
      ml: {
        translation: ml
      }},
    fallbackLng: 'en',
    debug: true,
interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });
export default i18n;