import apiInstance from '../apiInstance';

const getLimitApi = ({ workstreamId, code }, configOnly = false) => {
  const config = {
    url: `/limits/${workstreamId}/${code}`,
    method: 'GET',
  };
  return configOnly ? config : apiInstance.request(config);
};

export default getLimitApi;
