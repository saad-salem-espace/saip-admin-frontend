const similarDocSearchApi = ({
  workstreamId, similarDocId, page, sort, filters,
}) => ({
  url: 'similar-docs',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  params: {
    workstreamId,
    similarDocId,
    sort: sort || 'mostRelevant',
    page: page || 1,
  },
  data: {
    qJson: [],
    filters,
    qString: '',
  },
});

export default similarDocSearchApi;
