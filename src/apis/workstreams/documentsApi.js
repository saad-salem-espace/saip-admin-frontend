import apiInstance from '../apiInstance';

const documentApi = ({ workstreamId, documentId }) => apiInstance.get(`/workstreams/${workstreamId}/documents/${documentId}`);

// eslint-disable-next-line import/prefer-default-export
export { documentApi };
