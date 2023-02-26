import { Suspense } from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from 'contexts/CacheContext';
import CacheMock from 'browser-cache-mock';

const cacheMock = new CacheMock();

// eslint-disable-next-line no-undef
window.caches = {
  // eslint-disable-next-line no-undef
  ...window.caches,
  open: async () => cacheMock,
  ...cacheMock,
};

function AllTheProviders({ children }) {
  return (
    <CacheProvider>
      <Suspense fallback="Loading ...">
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Suspense>
    </CacheProvider>
  );
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
