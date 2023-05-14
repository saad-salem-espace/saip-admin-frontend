const advancedSearchApi = ({
  workstreamId, qArr, imageName, enableSynonyms, page, sort,
}) => ({
  url: 'advanced-search',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  params: {
    workstreamId,
    sort: sort || 'mostRelevant',
    ...(imageName && { imageName }),
    ...(enableSynonyms && { enableSynonyms }),
    page: page || 1,
  },
  data: qArr,
});

export default advancedSearchApi;
