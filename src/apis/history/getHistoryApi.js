const getHistoryApi = ({
  workstreamId, type,
}) => ({
  url: `activities/${type}`,
  method: 'GET',
  params: {
    workstreamId,
  },
});

export default getHistoryApi;
