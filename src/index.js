/* eslint-env browser */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from 'contexts/CacheContext';
import ErrorBoundary from 'errors/ErrorBoundary';
import './index.css';
import { AuthProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';
import roleMapper from 'utils/roleMapper';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const oidcConfig = {
  onSigninCallback: (userData) => {
    if (roleMapper(userData?.profile?.clientRoles[0]) === 'External_Examiner'
    || roleMapper(userData?.profile?.clientRoles[0]) === 'Internal_Examiner') {
      window.location.href = escape('/dashboard');
    } else if (roleMapper(userData?.profile?.clientRoles[0]) === 'Platform_Administrator') {
      window.location.href = escape('/admin');
    }
  },
  authority: process.env.REACT_APP_KEYCLOAK_AUTHORITY,
  client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
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
            <AuthProvider {...oidcConfig} autoSignIn={false}>
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
