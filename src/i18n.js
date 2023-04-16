import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import searchEn from './locales/en/search.json';
import commonEn from './locales/en/common.json';
import layoutEn from './locales/en/layout.json';
import dashboardEn from './locales/en/dashboard.json';
import layoutAr from './locales/ar/layout.json';
import dashboardAr from './locales/ar/dashboard.json';

const resources = {
  en: {
    translation: translationEn,
    search: searchEn,
    common: commonEn,
    layout: layoutEn,
    dashboard: dashboardEn,
  },
  ar: {
    layout: layoutAr,
    dashboard: dashboardAr,
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
