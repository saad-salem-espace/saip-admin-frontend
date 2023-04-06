import { Suspense } from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from 'contexts/CacheContext';
import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: 'qqq',
  client_id: 'qqq',
  redirect_uri: 'qq',
  automaticSilentRenew: true,
  loadUserInfo: true,
  userStore: { store: localStorage },
};

function AllTheProviders({ children }) {
  return (
    <CacheProvider>
      <Suspense fallback="Loading ...">
        <BrowserRouter>
          <AuthProvider {...oidcConfig} autoSignIn={false}>
            {children}
          </AuthProvider>
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
