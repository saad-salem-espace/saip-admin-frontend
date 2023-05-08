import axios from 'axios';

const saveNoteApi = ({
  id, noteText,
}, configOnly = false) => {
  const config = {
    url: `dashboard/${id}/notes`,
    method: 'POST',
    data: noteText,
  };
  return configOnly ? config : axios.request(config);
};

export default saveNoteApi;
