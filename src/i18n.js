import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import searchEn from './locales/en/search.json';
import commonEn from './locales/en/common.json';
import errorEn from './locales/en/errors.json';
import layoutEn from './locales/en/layout.json';
import dashboardEn from './locales/en/dashboard.json';
import layoutAr from './locales/ar/layout.json';
import dashboardAr from './locales/ar/dashboard.json';
import notesEn from './locales/en/notes.json';
import notesAr from './locales/ar/notes.json';

const resources = {
  en: {
    translation: translationEn,
    search: searchEn,
    common: commonEn,
    error: errorEn,
    layout: layoutEn,
    dashboard: dashboardEn,
    notes: notesEn,
  },
  ar: {
    layout: layoutAr,
    dashboard: dashboardAr,
    notes: notesAr,
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
