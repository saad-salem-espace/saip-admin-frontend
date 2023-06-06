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
import Footer from 'components/layout/footer/Footer';
import SelectedWorkStreamIdContext from 'contexts/SelectedWorkStreamIdContext';

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

  const focusId = JSON.parse(localStorage.getItem('FocusDoc'))?.doc?.filingNumber;
  const focusTitle = JSON.parse(localStorage.getItem('FocusDoc'))?.doc?.applicationTitle;
  const [showFocusArea, setShowFocusArea] = useState(null);
  const [selectedWorkStreamId, setSelectedWorkStreamId] = useState('1');

  const hideFocusArea = () => {
    setShowFocusArea(false);
    localStorage.removeItem('FocusDoc');
  };

  useEffect(() => {
    setShowFocusArea(!!focusId);
  }, []);

  const updateWorkStreamId = (id) => {
    setSelectedWorkStreamId(id);
  };
  return (
    <ThemeProvider
      lang={lang}
      // eslint-disable-next-line react/jsx-closing-bracket-location
    >
      <SelectedWorkStreamIdContext.Provider value={selectedWorkStreamId}>
        <div className="app" translate="no">
          <Routes
            updateFocusArea={(flag) => setShowFocusArea(flag)}
            showFocusArea={showFocusArea}
            updateWorkStreamId={updateWorkStreamId}
          />
          <AppNavbar
            lang={lang}
            changeLang={changeLang}
            hideFocusArea={hideFocusArea}
            updateWorkStreamId={updateWorkStreamId}
          />
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
          <Footer />
        </div>
      </SelectedWorkStreamIdContext.Provider>
    </ThemeProvider>

  );
}

export default App;
