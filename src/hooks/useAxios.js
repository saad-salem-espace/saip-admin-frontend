import { makeUseAxios } from 'axios-hooks';
import apiInstance from 'apis/apiInstance';
import { useEffect } from 'react';

/**
 * useAxiosWrapper to handle errors
 * @param config {string|object}
 * @param options {{
 *   manual: boolean=,
 *   ssr: boolean=,
 *   useCache: boolean=,
 *   autoCancel: boolean=,
 * }=}
 * @param customInstance {CreateAxiosDefaults=}
 * @return {UseAxiosResult<any, any, any>}
 */
const useAxios = (config, options, customInstance) => {
  const axios = makeUseAxios({ axios: customInstance ?? apiInstance });
  const response = axios(config, options);

  useEffect(() => {
    if (response[0].error) {
      switch (response[0].error.response.data.type) {
        case 'custom':
          break;
        case 'warning':
          // TODO Call warning toast or flash message (use the toast/modal context)
          break;
        default:
          throw response[0].error;
      }
    }
  }, [response]);

  return response;
};

export default useAxios;
