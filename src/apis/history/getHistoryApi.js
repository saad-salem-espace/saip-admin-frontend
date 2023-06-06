const getHistoryApi = ({
  workstreamId, type, page, sort,
}) => ({
  url: `activities/${type}`,
  method: 'GET',
  params: {
    workstreamId,
    page: page || 1,
    sort,
  },
});

export default getHistoryApi;
