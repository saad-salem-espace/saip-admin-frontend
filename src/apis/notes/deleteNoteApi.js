import axios from 'axios';

const deleteNoteApi = ({
  id,
}, configOnly = false) => {
  const config = {
    url: `dashboard/notes/${id}`,
    method: 'DELETE',
  };
  return configOnly ? config : axios.request(config);
};

export default deleteNoteApi;
