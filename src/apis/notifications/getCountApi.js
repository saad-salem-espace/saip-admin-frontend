import apiInstance from '../apiInstance';

const getCountApi = (configOnly = false) => {
  const config = {
    url: '/getCount',
    method: 'GET',
  };
  return configOnly ? config : apiInstance.request(config);
};

export default getCountApi;
