import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cacheRequests from 'utils/cacheRequests.json';

const CacheContext = createContext(null);
export default CacheContext;

const CacheProvider = ({ children }) => {
  const [cachedRequests, setCachedRequests] = useState(cacheRequests);

  const cacheRequestsValue = useMemo(() => ({
    cachedRequests,
    setCachedRequests,
  }), [cachedRequests]);

  return (
    <CacheContext.Provider value={cacheRequestsValue}>
      {children}
    </CacheContext.Provider>
  );
};

CacheProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CacheProvider };
