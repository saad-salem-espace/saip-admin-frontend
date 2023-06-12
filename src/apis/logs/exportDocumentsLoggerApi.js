const exportDocumentsLoggerApi = ({ workstreamId, type, filingNumbers }) => ({
  url: `logger/exports/${workstreamId}/${type}`,
  method: 'POST',
  data: { documentsIds: filingNumbers },
});

export default exportDocumentsLoggerApi;
