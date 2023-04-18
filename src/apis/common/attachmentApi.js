const attachmentApi = ({
  workstreamId, fileType, id, fileName,
}) => ({
  url: `attachments/${workstreamId}/${fileType}/${id}/${fileName}`,
  method: 'GET',
});

export default attachmentApi;
