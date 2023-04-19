import axios from 'axios';

const getSavedQueryApi = (workStreamId, configOnly = false) => {
  const config = {
    url: `favouriteSearchQuery/workstream/${workStreamId}/list`,
    method: 'GET',
  };
  return configOnly ? config : axios.request(config);
};

export default getSavedQueryApi;
