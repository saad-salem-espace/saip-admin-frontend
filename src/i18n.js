import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import searchEn from './locales/en/search.json';
import commonEn from './locales/en/common.json';
import errorEn from './locales/en/errors.json';
import layoutEn from './locales/en/layout.json';
import dashboardEn from './locales/en/dashboard.json';
import translationAr from './locales/ar/translation.json';
import searchAr from './locales/ar/search.json';
import commonAr from './locales/ar/common.json';
import errorAr from './locales/ar/errors.json';
import layoutAr from './locales/ar/layout.json';
import queriesEn from './locales/en/queries.json';
import queriesAr from './locales/ar/queries.json';
import dashboardAr from './locales/ar/dashboard.json';
import notesEn from './locales/en/notes.json';
import notesAr from './locales/ar/notes.json';
import validationsEn from './locales/en/validations.json';
import validationsAr from './locales/ar/validations.json';
import tipsEn from './locales/en/tips.json';
import tipsAr from './locales/ar/tips.json';
import historyEn from './locales/en/history.json';
import historyAr from './locales/ar/history.json';
import activityEn from './locales/en/activity.json';
import activityAr from './locales/ar/activity.json';

const resources = {
  en: {
    translation: translationEn,
    search: searchEn,
    common: commonEn,
    error: errorEn,
    layout: layoutEn,
    queries: queriesEn,
    dashboard: dashboardEn,
    notes: notesEn,
    validations: validationsEn,
    tips: tipsEn,
    history: historyEn,
    activity: activityEn,
  },
  ar: {
    translation: translationAr,
    search: searchAr,
    common: commonAr,
    error: errorAr,
    layout: layoutAr,
    queries: queriesAr,
    dashboard: dashboardAr,
    notes: notesAr,
    validations: validationsAr,
    tips: tipsAr,
    history: historyAr,
    activity: activityAr,
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
