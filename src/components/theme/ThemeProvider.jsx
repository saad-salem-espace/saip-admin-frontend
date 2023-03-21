import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext({
  language: 'en',
});

const ThemeProvider = ({ children, lang }) => {
  const langValue = useMemo(() => ({ language: lang }), [lang]);
  return (
    <ThemeContext.Provider value={langValue}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
export { ThemeContext };

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,
};
