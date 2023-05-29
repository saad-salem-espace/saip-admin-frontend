import axios from 'axios';

const saveNoteApi = ({
  id, noteText, activeNote,
}, configOnly = false) => {
  const config = {
    url: `dashboard/${id}/notes?noteId=${activeNote ? activeNote.id : '0'}`,
    method: 'POST',
    data: noteText,
  };
  return configOnly ? config : axios.request(config);
};

export default saveNoteApi;
