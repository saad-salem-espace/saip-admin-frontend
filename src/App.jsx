import './assets/styles/App.scss';
import Routes from 'components/routes/Routes';
import ThemeProvider from 'components/theme/ThemeProvider';
import NavBar from 'components/nav-bar/NavBar';
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
        <NavBar />
        <Routes />
      </div>
    </ThemeProvider>

  );
}

export default App;
