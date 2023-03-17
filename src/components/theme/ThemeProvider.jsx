import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext({
  language: 'en',
});

const ThemeProvider = ({ children, lang }) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <ThemeContext.Provider value={{ language: lang }}>
    {children}
  </ThemeContext.Provider>
);
export default ThemeProvider;
export { ThemeContext };

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,
};
