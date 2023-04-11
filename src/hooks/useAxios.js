import { makeUseAxios } from 'axios-hooks';
import apiInstance from 'apis/apiInstance';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('error', { keyPrefix: 'serverErrors' });

  useEffect(() => {
    const axiosError = response[0].error;
    if (axiosError) {
      const errorType = axiosError.response.data?.error?.type;
      const errorCode = axiosError.response.data?.error?.code;
      switch (errorType) {
        case 'custom':
          break;
        case 'warning':
          toast.warn(t(errorCode));
          break;
        default:
          throw response[0].error;
      }
    }
  }, [response]);

  return response;
};

export default useAxios;
