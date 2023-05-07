const attachmentApi = ({
  workstreamId, fileType, id, fileName, responseType,
}) => ({
  url: `attachments/${workstreamId}/${fileType}/${id}/${fileName}`,
  method: 'GET',
  ...(responseType && { responseType }),
});

export default attachmentApi;
