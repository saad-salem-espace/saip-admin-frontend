import axios from 'axios';

const getBookmarksApi = (
  workstreamId,
  assignmentId,
  configOnly = false,
) => {
  const config = {
    url: `bookmarks/workstream/${workstreamId}/list?docId=${assignmentId || 0}`,
    method: 'GET',
  };

  return configOnly ? config : axios.request(config);
};

export default getBookmarksApi;
