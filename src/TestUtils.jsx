import { Suspense } from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from 'contexts/CacheContext';
import { AuthProvider } from 'react-oidc-context';
import 'fake-indexeddb/auto';
import { initDB } from 'react-indexed-db';
import dbConfig from 'dbConfig';
import { ToastContainer } from 'react-toastify';
import { UserManager } from 'oidc-client-ts';
import { loggedInUserMock } from './testing-resources/mocks/loggedInUserMock';

initDB(dbConfig);

const oidcConfig = {
  authority: 'qqq',
  client_id: 'qqq',
  redirect_uri: 'qq',
  automaticSilentRenew: true,
  loadUserInfo: true,
  userStore: { store: localStorage },
};

function AllTheProviders({ children, wrapperProps }) {
  const userManager = new UserManager(oidcConfig);
  // eslint-disable-next-line no-undef
  userManager.getUser = jest.fn().mockResolvedValue(loggedInUserMock(wrapperProps.userType));
  return (
    <CacheProvider>
      <Suspense fallback="Loading ...">
        <BrowserRouter>
          <AuthProvider userManager={userManager}>
            {children}
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
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </CacheProvider>
  );
}

const customRender = (ui, { wrapperProps, ...options } = {}) => render(
  ui,
  { wrapper: (props) => <AllTheProviders {...props} wrapperProps={wrapperProps} />, ...options },
);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperProps: PropTypes.shape({
    userType: PropTypes.symbol,
  }),
};
AllTheProviders.defaultProps = {
  wrapperProps: {},
};
