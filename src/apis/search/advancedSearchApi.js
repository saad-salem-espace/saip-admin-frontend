import axios from 'axios';

const advancedSearchApi = ({
  workstreamId, query, imageName, enableSynonyms, page,
}, configOnly = false) => {
  const config = {
    url: 'advanced-search',
    method: 'GET',
    params: {
      workstreamId,
      q: query,
      ...(imageName && { imageName }),
      ...(enableSynonyms && { enableSynonyms }),
      page: page || 1,
    },
  };
  return configOnly ? config : axios.request(config);
};

export default advancedSearchApi;
