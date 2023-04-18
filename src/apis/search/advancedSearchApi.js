const advancedSearchApi = ({
  workstreamId, query, imageName, enableSynonyms, page, sort,
}) => ({
  url: 'advanced-search',
  method: 'GET',
  params: {
    workstreamId,
    q: query,
    sort: sort || 'mostRelevant',
    ...(imageName && { imageName }),
    ...(enableSynonyms && { enableSynonyms }),
    page: page || 1,
  },
});

export default advancedSearchApi;
