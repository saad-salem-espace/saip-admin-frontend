const getAggrFiltersApi = ({
  workstreamId, query, strId,
  enableSynonyms,
}) => ({
  url: 'filter',
  method: 'POST',
  params: {
    workstreamId,
    strId,
    ...(enableSynonyms && { enableSynonyms }),
  },
  data: {
    qJson: query,
    filters: [],
  },
});

export default getAggrFiltersApi;
