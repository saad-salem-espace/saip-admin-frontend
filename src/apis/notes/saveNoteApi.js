import axios from 'axios';

const saveNoteApi = ({
  id, noteText,
}, configOnly = false) => {
  const config = {
    url: `dashboard/${id}/notes?note_txt=${noteText}`,
    method: 'POST',
  };
  return configOnly ? config : axios.request(config);
};

export default saveNoteApi;
