const getAggrFiltersApi = ({
  workstreamId, q, strId,
}) => ({
  url: 'filter',
  method: 'GET',
  params: {
    workstreamId,
    q,
    strId,
  },
});

export default getAggrFiltersApi;
