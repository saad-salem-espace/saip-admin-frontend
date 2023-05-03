import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import searchEn from './locales/en/search.json';
import commonEn from './locales/en/common.json';
import errorEn from './locales/en/errors.json';
import layoutEn from './locales/en/layout.json';
import translationAr from './locales/ar/translation.json';
import searchAr from './locales/ar/search.json';
import commonAr from './locales/ar/common.json';
import errorAr from './locales/ar/errors.json';
import dashboardEn from './locales/en/dashboard.json';
import layoutAr from './locales/ar/layout.json';
import dashboardAr from './locales/ar/dashboard.json';

const resources = {
  en: {
    translation: translationEn,
    search: searchEn,
    common: commonEn,
    error: errorEn,
    layout: layoutEn,
    dashboard: dashboardEn,
  },
  ar: {
    translation: translationAr,
    search: searchAr,
    common: commonAr,
    error: errorAr,
    layout: layoutAr,
    dashboard: dashboardAr,
  },
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ar',
    debug: false,
    resources,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
