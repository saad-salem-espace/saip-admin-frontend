import axios from 'axios';

const getSavedQueryApi = (workStreamId, docId, page, configOnly = false) => {
  const url = docId ? `favouriteSearchQuery/workstream/${workStreamId}/list?docId=${docId}`
    : `favouriteSearchQuery/workstream/${workStreamId}/list`;
  const config = {
    url,
    method: 'GET',
    page,
  };
  return configOnly ? config : axios.request(config);
};

export default getSavedQueryApi;
