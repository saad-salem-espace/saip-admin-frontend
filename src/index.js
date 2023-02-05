/* eslint-env browser */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// eslint-disable-next-line import/no-named-as-default-member
import reportWebVitals from './reportWebVitals';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="Loading ...">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
