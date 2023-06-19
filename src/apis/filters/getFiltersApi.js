const getFiltersApi = ({
  workstreamId,
}) => ({
  url: `filters/${workstreamId}`,
  method: 'GET',
});

export default getFiltersApi;
