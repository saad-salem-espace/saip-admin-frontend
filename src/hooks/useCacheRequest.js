import {
  useEffect, useRef, useState,
} from 'react';
import apiInstance from 'apis/apiInstance';
import { getCachedRequest, setCacheResponse } from 'utils/cacheStorage';
import useAxios from 'hooks/useAxios';

const useCacheRequest = (config, axiosConfig, options = {}) => {
  const axiosInstance = options.axiosInstance || apiInstance;
  const URI = axiosInstance.getUri(axiosConfig);
  const [{ data }, execute] = useAxios(axiosConfig, { manual: true });
  const [response, setResponse] = useState(null);
  const isMounted = useRef(false);
  const [reload, setReload] = useState(0);
  const refresh = () => {
    setReload(reload + 1);
  };

  useEffect(() => {
    if (data) {
      setResponse(data);
      setCacheResponse(config.keyName, URI, data);
    }
  }, [data]);

  useEffect(() => {
    if (isMounted.current) {
      execute();
    }
  }, [reload]);

  useEffect(() => {
    const isValid = options.dependencies?.reduce(
      (acc, curr) => acc || Boolean(curr),
      false,
    ) ?? true;

    if (isValid) {
      const responseBody = getCachedRequest(config.keyName, URI, config.expiredRangeMillis);
      if (!responseBody) {
        execute();
      } else {
        setResponse(responseBody.response);
      }
    }

    isMounted.current = true;
  }, options.dependencies || []);

  return [response, refresh];
};

export default useCacheRequest;
