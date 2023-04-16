/* eslint-env browser */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';
import roleMapper from 'utils/roleMapper';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { CacheProvider } from './contexts/CacheContext';

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
    <CacheProvider>
      <Suspense fallback="Loading ...">
        <BrowserRouter>
          <AuthProvider {...(appType === 'user_app' ? { ...oidcConfigExternal } : { ...oidcConfigInternal })} autoSignIn={false}>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
