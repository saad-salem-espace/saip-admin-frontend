import { useTranslation } from 'react-i18next';
import logo from './logo.svg';
import './App.css';

function App() {
  const { t } = useTranslation();
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('learnReact')}
        </a>
      </header>
    </div>
  );
}

export default App;
