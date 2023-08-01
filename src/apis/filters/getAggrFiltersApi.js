const getAggrFiltersApi = ({
  workstreamId, query, strId, imageName,
  enableSynonyms,
}) => ({
  url: 'filter',
  method: 'POST',
  params: {
    workstreamId,
    strId,
    ...(imageName && { imageName }),
    ...(enableSynonyms && { enableSynonyms }),
  },
  data: {
    qJson: query,
    filters: [],
  },
});

export default getAggrFiltersApi;
