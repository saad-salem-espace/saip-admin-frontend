const getAssigned = ({ workstreamId, sortBy, page }) => ({
  url: 'dashboard/assigment_document',
  method: 'GET',
  params: {
    workstreamId,
    sortBy,
    page,
  },
});

export default getAssigned;
