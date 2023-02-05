import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';

const resources = {
  en: {
    translation: translationEn,
  },
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
