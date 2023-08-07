/* eslint-env browser */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from 'contexts/CacheContext';
import './index.css';
import { AppAuthProvider } from 'contexts/AppAuthContext';
import { initDB } from 'react-indexed-db';
import { pdfjs } from 'react-pdf';
import dbConfig from 'dbConfig';
import Spinner from 'components/shared/spinner/Spinner';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

initDB(dbConfig);

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner />
        </div>
      }
    >
      <CacheProvider>
        <BrowserRouter>
          <AppAuthProvider>
            <App />
          </AppAuthProvider>
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
