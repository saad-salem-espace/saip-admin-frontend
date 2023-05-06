import axios from 'axios';

const getSavedQueryApi = (workStreamId, page, configOnly = false) => {
  const config = {
    url: `favouriteSearchQuery/workstream/${workStreamId}/list`,
    method: 'GET',
    page,
  };
  return configOnly ? config : axios.request(config);
};

export default getSavedQueryApi;
