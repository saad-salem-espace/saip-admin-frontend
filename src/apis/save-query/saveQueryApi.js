import axios from 'axios';

const saveQueryApi = ({
  workStreamId, query, resultCount, enableSynonyms, documentId, fav,
}, configOnly = false) => {
  const config = {
    url: 'favouriteSearchQuery',
    method: 'POST',
    data: {
      workStreamId,
      resultCount,
      queryString: query,
      synonyms: enableSynonyms || false,
      documentId,
      fav,
    },
  };
  return configOnly ? config : axios.request(config);
};

export default saveQueryApi;
