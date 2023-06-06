import apiInstance from '../apiInstance';

const markAllAsReadApi = (configOnly = false) => {
  const config = {
    url: '/notifications/markAllAsRead',
    method: 'GET',
  };
  return configOnly ? config : apiInstance.request(config);
};

export default markAllAsReadApi;
