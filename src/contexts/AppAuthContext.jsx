import {
  createContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { WebStorageStateStore } from 'oidc-client-ts';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { AuthProvider, useAuth } from 'react-oidc-context';
import { roleMapper, roles } from 'utils/roleMapper';
import { useTranslation } from 'react-i18next';
import toastify from 'utils/toastify';
import { findFirstCommonElement } from 'utils/arrays';
import Spinner from 'components/shared/spinner/Spinner';

const AppName = process.env.REACT_APP_NAME;

const AllowedRoles = AppName === 'examiner_app'
  ? [roles.EXTERNAL_EXAMINER, roles.INTERNAL_EXAMINER]
  : [roles.PUBLIC_USER, roles.REGISTERED_USER];

const AppAuthContext = createContext(null);
export default AppAuthContext;

const AppAuthProvider = ({ children, ...props }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasSignedIn, setHasSignedIn] = useState(false);

  const authParams = {
    session_state: searchParams.get('session_state'),
    state: searchParams.get('state'),
    code: searchParams.get('code'),
  };

  const redirectUrl = AppName === 'examiner_app'
    ? `${process.env.REACT_APP_ENTITY_URL}dashboard`
    : process.env.REACT_APP_ENTITY_URL;

  const oidcConfig = {
    onSigninCallback: () => {
      if (Object.values(authParams).every((e) => !!e)) {
        Object.keys(authParams).forEach((key) => searchParams.delete(key));
        setSearchParams(searchParams);
      }
      setHasSignedIn(true);
    },
    authority: process.env.REACT_APP_KEYCLOAK_AUTHORITY,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    client_secret:
      AppName === 'examiner_app'
        ? ''
        : process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET,
    redirect_uri: redirectUrl,
    post_logout_redirect_uri: process.env.REACT_APP_ENTITY_URL,
    automaticSilentRenew: true,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({ store: localStorage }),
  };

  return (
    <AuthProvider {...oidcConfig} autoSignIn={false} {...props}>
      <AppAuthProviderCustom
        hasSignedIn={hasSignedIn}
        setHasSignedIn={setHasSignedIn}
      >
        {children}
      </AppAuthProviderCustom>
    </AuthProvider>
  );
};

AppAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AppAuthProviderCustom = ({ children, hasSignedIn, setHasSignedIn }) => {
  const { t } = useTranslation('error', { keyPrefix: 'authorization' });
  const [role, setRole] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isMasterTab, setIsMasterTab] = useState(false);
  const isMounted = useRef(false);

  const {
    user,
    isLoading,
    signoutSilent,
    isAuthenticated,
    removeUser,
    signinRedirect,
  } = useAuth();

  const requestSignOut = () => {
    if (!localStorage.getItem('MASTER_TAB') && !isMasterTab) {
      setIsMasterTab(true);
      signoutSilent()
        .catch(() => {})
        .then(() => {
          localStorage.setItem('MASTER_TAB', 'requestSignout');
          setTimeout(() => {
            localStorage.removeItem('MASTER_TAB');
          }, 200);
          setIsMasterTab(false);
        });
    } else {
      removeUser();
    }
  };

  const requestSignIn = (masterSignedIn = false) => {
    if (!localStorage.getItem('MASTER_TAB') && !isMasterTab) {
      if (masterSignedIn) {
        setIsMasterTab(true);
        localStorage.setItem('MASTER_TAB', 'requestSignin');
        setTimeout(() => {
          localStorage.removeItem('MASTER_TAB');
        }, 200);
        setIsMasterTab(false);
      } else {
        signinRedirect();
      }
    } else {
      window.location.reload();
    }
  };

  const localRefreshUser = async () => {
    switch (localStorage.getItem('MASTER_TAB')) {
      case 'requestSignout':
        requestSignOut();
        break;
      case 'requestSignin':
        requestSignIn();
        break;
      default:
    }
  };

  useEffect(() => {
    window.addEventListener('storage', localRefreshUser);
    return () => {
      window.removeEventListener('storage', localRefreshUser);
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (hasSignedIn && AllowedRoles.includes(role)) {
        requestSignIn(true);
      }
      setHasSignedIn(false);
    }
  }, [hasSignedIn, role]);
  useEffect(() => {
    const fetchedRoles = user?.profile?.clientRoles;
    const mappedRoles = fetchedRoles?.map((fetchedRole) => roleMapper(fetchedRole)) || [];
    const userFirstCommonRole = findFirstCommonElement(mappedRoles, AllowedRoles);
    const userRole = isAuthenticated ? userFirstCommonRole || roles.PUBLIC_USER
      : userFirstCommonRole;
    setRole(userRole);
    if (user) {
      if (!isAuthenticated || !AllowedRoles.includes(userRole)) {
        signoutSilent().catch(() => {});
        localStorage.removeItem('FocusDoc');
      }
      if (!AllowedRoles.includes(userRole)) {
        toastify(
          'error',
          <div>
            <p className="toastifyTitle">{t('accessDenied')}</p>
            <p className="toastText">{t('accessDeniedMsg')}</p>
          </div>,
        );
      }
    }
    if (isMounted.current) {
      setIsReady(true);
    } else {
      isMounted.current = true;
    }
  }, [user]);

  const AppAuthContextValue = useMemo(
    () => ({
      role,
      setRole,
      localRefreshUser,
      requestSignOut,
    }),
    [role],
  );

  return (
    <AppAuthContext.Provider value={AppAuthContextValue}>
      {isLoading || !isReady ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AppAuthContext.Provider>
  );
};

AppAuthProviderCustom.propTypes = {
  children: PropTypes.node.isRequired,
  hasSignedIn: PropTypes.bool.isRequired,
  setHasSignedIn: PropTypes.func.isRequired,
};

export { AppAuthProvider };
