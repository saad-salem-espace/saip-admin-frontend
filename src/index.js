/* eslint-env browser */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { CacheProvider } from './contexts/CacheContext';

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider>
      <Suspense fallback="Loading ...">
        <BrowserRouter>
          <App />
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
