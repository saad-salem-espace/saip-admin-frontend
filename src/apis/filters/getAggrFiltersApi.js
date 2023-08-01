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
    docImage: false,
  },
  data: {
    qJson: query,
    filters: [],
  },
});

export default getAggrFiltersApi;
