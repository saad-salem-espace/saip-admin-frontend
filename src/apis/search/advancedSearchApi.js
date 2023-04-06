const advancedSearchApi = ({
  workstreamId, query, imageName, enableSynonyms, page,
}) => ({
  url: 'advanced-search',
  method: 'GET',
  params: {
    workstreamId,
    q: query,
    ...(imageName && { imageName }),
    ...(enableSynonyms && { enableSynonyms }),
    page: page || 1,
  },
});

export default advancedSearchApi;
