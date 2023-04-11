import './assets/styles/App.scss';
import Routes from 'components/routes/Routes';
import ThemeProvider from 'components/theme/ThemeProvider';
import AppNavbar from 'components/layout/app-navbar/AppNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/common/toast.scss';

// import ChangeLanguage from 'components/change-language/ChangeLanguage';

function App() {
  // const [lang, setLang] = useState('en');
  // const changeLang = () => {
  //   setLang(lang === 'ar' ? 'en' : 'ar');
  // };

  return (
    <ThemeProvider
      // lang={lang}
      // eslint-disable-next-line react/jsx-closing-bracket-location
    >
      <div className="app">
        {/* <ChangeLanguage changeLang={changeLang} /> */}
        <Routes />
        <AppNavbar />
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
      </div>
    </ThemeProvider>

  );
}

export default App;
