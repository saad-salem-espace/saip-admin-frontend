import {
  useEffect, useRef, useState,
} from 'react';
import apiInstance from 'apis/apiInstance';
import { getCachedRequest, setCacheResponse } from 'utils/cacheStorage';

const useCacheRequest = (config, axiosConfig, options = {}) => {
  const axiosInstance = options.axiosInstance || apiInstance;
  const URI = axiosInstance.getUri(axiosConfig);
  const [response, setResponse] = useState(null);
  const isMounted = useRef(false);
  // eslint-disable-next-line
  console.log("backend_url", process.env.REACT_APP_BACKEND_URL);
  const [reload, setReload] = useState(0);
  const refresh = () => {
    setReload(reload + 1);
  };

  const updateRequest = async () => {
    const fetchedResponse = await axiosInstance.request(axiosConfig);
    setResponse(fetchedResponse.data);
    setCacheResponse(config.keyName, URI, fetchedResponse.data);
  };

  useEffect(() => {
    if (isMounted.current) {
      updateRequest();
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
        updateRequest();
      } else {
        setResponse(responseBody.response);
      }
    }

    isMounted.current = true;
  }, options.dependencies || []);

  return [response, refresh];
};

export default useCacheRequest;
