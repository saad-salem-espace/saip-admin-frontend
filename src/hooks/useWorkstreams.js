import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import { search } from 'utils/arrays';

const useWorkstreams = (workstreamId) => {
  const { cachedRequests } = useContext(CacheContext);
  const [responseIdentifiers] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${workstreamId}/identifiers` });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (responseIdentifiers) setIsReady(true);
  }, [responseIdentifiers]);

  const getIdentifierByStrId = useCallback((strId) => (
    search(responseIdentifiers.data, 'identiferStrId', strId).identiferName
  ), [responseIdentifiers]);

  return { getIdentifierByStrId, isReady };
};
export default useWorkstreams;
