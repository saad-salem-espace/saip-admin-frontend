import apiInstance from '../apiInstance';

const getListApi = (page, configOnly = false) => {
  const config = {
    url: '/notifications',
    method: 'GET',
    params: {
      page: page || 1,
    },
  };
  return configOnly ? config : apiInstance.request(config);
};

export default getListApi;
