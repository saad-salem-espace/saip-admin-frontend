import apiInstance from '../apiInstance';

const markAsReadApi = (id, configOnly = false) => {
  const config = {
    url: `/notifications/${id}/read`,
    method: 'GET',
  };
  return configOnly ? config : apiInstance.request(config);
};

export default markAsReadApi;
