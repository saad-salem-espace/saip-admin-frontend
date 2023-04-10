import './assets/styles/App.scss';
import Routes from 'components/routes/Routes';
import ThemeProvider from 'components/theme/ThemeProvider';
import AppNavbar from 'components/layout/app-navbar/AppNavbar';
//  import ChangeLanguage from 'components/change-language/ChangeLanguage';

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
      </div>
    </ThemeProvider>

  );
}

export default App;
