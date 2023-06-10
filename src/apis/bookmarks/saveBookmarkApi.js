import axios from 'axios';

const saveBookmarkApi = ({
  workstreamId, assignmentId, filingNumber,
}, configOnly = false) => {
  const config = {
    url: 'bookmarks',
    method: 'POST',
    data: {
      workstreamId,
      documentId: assignmentId || 0,
      filingNumber,
    },
  };
  return configOnly ? config : axios.request(config);
};

export default saveBookmarkApi;
