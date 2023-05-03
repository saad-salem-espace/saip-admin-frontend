const getAssigned = ({ workstreamId, sortBy }) => ({
  url: 'dashboard/assigment_document',
  method: 'GET',
  params: {
    workstreamId,
    sortBy,
  },
});

export default getAssigned;
