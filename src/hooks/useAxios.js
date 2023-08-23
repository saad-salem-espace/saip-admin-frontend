import { makeUseAxios } from 'axios-hooks';
import apiInstance from 'apis/apiInstance';
import { useAuth } from 'react-oidc-context';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toastify from 'utils/toastify';

/**
 * useAxiosWrapper to handle errors
 * @param config {string|object}
 * @param options {{
 *   manual: boolean=,
 *   ssr: boolean=,
 *   useCache: boolean=,
 *   autoCancel: boolean=,
 *   onError: string=,
 * }=}
 * @param customInstance {CreateAxiosDefaults=}
 * @return {UseAxiosResult<any, any, any>}
 */
const useAxios = (config, options, customInstance) => {
  const { user } = useAuth();
  if (user?.access_token) {
    apiInstance.defaults.headers.common.Authorization = user ? `Bearer ${user.access_token}` : undefined;
  } else {
    apiInstance.defaults.headers.common.Authorization = undefined;
  }
  const { onError, ...axiosOptions } = options || {};

  const axios = makeUseAxios({ axios: customInstance ?? apiInstance });
  const response = axios(config, axiosOptions);
  const { t } = useTranslation('error', { keyPrefix: 'serverErrors' });

  useEffect(() => {
    const axiosError = response[0].error;
    if (axiosError) {
      let errorType = onError || axiosError.response.data?.error?.type;
      const errorCode = axiosError.response.data?.error?.code;
      if (axiosError.config?.url.includes('attachments')) errorType = 'custom';
      switch (errorType) {
        case 'custom':
          break;
        case 'warning':
          toastify(
            'error',
            <div>
              <p className="toastifyTitle">{t(errorCode)}</p>
            </div>,
          );
          break;
        default:
          throw response[0].error;
      }
    }
  }, [response[0].loading]);

  return response;
};

export default useAxios;
