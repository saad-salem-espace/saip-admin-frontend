import axios from 'axios';

const getNotesApi = (id, page, configOnly = false) => {
  const config = {
    url: `dashboard/${id}/notes`,
    method: 'GET',
    params: {
      id,
      page: page || 1,
    },
  };
  return configOnly ? config : axios.request(config);
};

export default getNotesApi;
