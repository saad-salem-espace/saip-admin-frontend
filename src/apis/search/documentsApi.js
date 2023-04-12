const documentApi = ({ workstreamId, documentId }) => ({
  url: `/workstreams/${workstreamId}/documents/${documentId}`,
  method: 'GET',
});

// eslint-disable-next-line import/prefer-default-export
export { documentApi };
