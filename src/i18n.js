import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import searchEn from './locales/en/search.json';
import citationEn from './locales/en/citation.json';
import commonEn from './locales/en/common.json';
import errorEn from './locales/en/errors.json';

const resources = {
  en: {
    translation: translationEn,
    search: searchEn,
    citation: citationEn,
    common: commonEn,
    error: errorEn,
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
