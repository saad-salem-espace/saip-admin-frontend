import axios from 'axios';

const deleteQueryApi = ({
  queryId,
}, configOnly = false) => {
  const config = {
    url: `favouriteSearchQuery/${queryId}`,
    method: 'DELETE',
  };
  return configOnly ? config : axios.request(config);
};

export default deleteQueryApi;
