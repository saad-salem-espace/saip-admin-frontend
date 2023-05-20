import './assets/styles/App.scss';
import Routes from 'components/routes/Routes';
import ThemeProvider from 'components/theme/ThemeProvider';
import AppNavbar from 'components/layout/app-navbar/AppNavbar';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/common/toast.scss';
import { useTranslation } from 'react-i18next';
import FocusArea from 'components/shared/focus-area/FocusArea';

function App() {
  const { i18n } = useTranslation();
  // eslint-disable-next-line
  const langCookie = ('; ' + document.cookie).split('; lang=').pop().split(';')[0];
  const [lang, setLang] = useState(langCookie || 'ar');
  const changeLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    const wrapperElement = document.getElementsByTagName('html');
    wrapperElement[0].setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.cookie = `lang=${lang}`;
    i18n.changeLanguage(lang);
  }, [lang]);

  const focusId = JSON.parse(localStorage.getItem('FocusDoc'))?.saipId;
  const focusTitle = JSON.parse(localStorage.getItem('FocusDoc'))?.title;
  const [showFocusArea, setShowFocusArea] = useState(null);
  const hideFocusArea = () => {
    setShowFocusArea(false);
    localStorage.removeItem('FocusDoc');
  };

  useEffect(() => {
    setShowFocusArea(!!focusId);
  }, []);

  return (
    <ThemeProvider
      lang={lang}
      // eslint-disable-next-line react/jsx-closing-bracket-location
    >
      <div className="app" translate="no">
        <Routes
          updateFocusArea={(flag) => setShowFocusArea(flag)}
          showFocusArea={showFocusArea}
        />
        <AppNavbar lang={lang} changeLang={changeLang} />
        <ToastContainer
          position="bottom-left"
          autoClose={8000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
        {
          showFocusArea && (
            <FocusArea
              hideFocusArea={hideFocusArea}
              filingNumber={focusId}
              applicationTitle={focusTitle}
            />
          )
        }
      </div>
    </ThemeProvider>

  );
}

export default App;
