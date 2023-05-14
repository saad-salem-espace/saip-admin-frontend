/* eslint-env browser */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from 'contexts/CacheContext';
import ErrorBoundary from 'errors/ErrorBoundary';
import './index.css';
import { AuthProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';
import { initDB } from 'react-indexed-db';
import { pdfjs } from 'react-pdf';
import roleMapper from 'utils/roleMapper';
import dbConfig from 'dbConfig';
import toastify from 'utils/toastify';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

initDB(dbConfig);

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const urlParams = new URLSearchParams(window.location.search);
const appType = urlParams?.get('app_type');
const externalRedirectUri = `${process.env.REACT_APP_ENTITY_URL}?app_type=user_app`;
const oidcConfigExternal = {
  authority: process.env.REACT_APP_KEYCLOAK_AUTHORITY_EXTERNAL,
  client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID_EXTERNAL,
  client_secret: process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET_EXTERNAL,
  redirect_uri: externalRedirectUri,
  post_logout_redirect_uri: externalRedirectUri,
  automaticSilentRenew: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: localStorage }),
};

const oidcConfigInternal = {
  onSigninCallback: (userData) => {
    if (userData?.profile.preferred_username === undefined
      || userData?.profile?.clientRoles === undefined) {
      if (appType === 'user_app') {
        localStorage.removeItem(`oidc.user:${process.env.REACT_APP_KEYCLOAK_AUTHORITY_EXTERNAL}:${process.env.REACT_APP_KEYCLOAK_CLIENT_ID_EXTERNAL}`);
      } else {
        localStorage.removeItem(`oidc.user:${process.env.REACT_APP_KEYCLOAK_AUTHORITY_INTERNAL}:${process.env.REACT_APP_KEYCLOAK_CLIENT_ID_INTERNAL}`);
      }
      window.location.href = escape('/');
      // eslint-disable-next-line
      const currentLang = ('; ' + document.cookie).split('; lang=').pop().split(';')[0];
      toastify(
        'error',
        <div>
          <p className="toastifyTitle">
            {currentLang === 'ar' ? 'معلومات الدخول غير معرفة. برجاء التواصل مع مدير الموقع.' : 'The login information is not defined. Please, contact the system administrator.' }
          </p>
        </div>,
      );
    }
    if (roleMapper(userData?.profile?.clientRoles[0]) === 'External_Examiner'
    || roleMapper(userData?.profile?.clientRoles[0]) === 'Internal_Examiner') {
      window.location.href = escape('/dashboard');
    } else if (roleMapper(userData?.profile?.clientRoles[0]) === 'Platform_Administrator') {
      window.location.href = escape('/admin');
    }
  },
  authority: process.env.REACT_APP_KEYCLOAK_AUTHORITY_INTERNAL,
  client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID_INTERNAL,
  redirect_uri: process.env.REACT_APP_ENTITY_URL,
  post_logout_redirect_uri: process.env.REACT_APP_ENTITY_URL,
  automaticSilentRenew: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: localStorage }),
};
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="Loading ...">
      <CacheProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <AuthProvider {...(appType === 'user_app' ? { ...oidcConfigExternal } : { ...oidcConfigInternal })} autoSignIn={false}>
              <App />
            </AuthProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </CacheProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
