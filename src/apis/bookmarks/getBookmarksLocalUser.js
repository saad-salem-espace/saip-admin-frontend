import axios from 'axios';

const getBookmarksLocalUser = ({
  workstreamId, filingNumbers,
}, configOnly = false) => {
  const config = {
    url: `bookmarks/workstream/${workstreamId}/list`,
    method: 'POST',
    data: filingNumbers,
  };
  return configOnly ? config : axios.request(config);
};

export default getBookmarksLocalUser;
