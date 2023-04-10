import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import citationEn from './locales/en/citation.json';
import commonEn from './locales/en/common.json';
import layoutEn from './locales/en/layout.json';
import layoutAr from './locales/ar/layout.json';
import searchEn from './locales/en/search.json';
import translationEn from './locales/en/translation.json';
import queriesEn from './locales/en/queries.json';

const resources = {
  en: {
    translation: translationEn,
    search: searchEn,
    citation: citationEn,
    common: commonEn,
    layout: layoutEn,
    queries: queriesEn,
  },
  ar: {
    layout: layoutAr,
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
