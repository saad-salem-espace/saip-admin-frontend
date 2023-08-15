import axios from 'axios';

const saveQueryApi = ({
  workStreamId, query, resultCount, enableSynonyms, documentId, fav,
  imageName, docImage,
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
      docImage,
      imageName,
    },
  };
  return configOnly ? config : axios.request(config);
};

export default saveQueryApi;
