import axios from 'axios';

const advancedSearchApi = ({ workstreamId, query, page }, configOnly = false) => {
  const config = {
    url: 'advanced-search',
    method: 'GET',
    params: {
      workstreamId,
      q: query,
      page: page || 1,
    },
  };
  return configOnly ? config : axios.request(config);
};

export default advancedSearchApi;
