import apiInstance from 'apis/apiInstance';
import attachmentApi from 'apis/common/attachmentApi';

const getAttachmentURL = ({
  workstreamId, fileName, id, fileType,
}) => apiInstance.getUri(attachmentApi({
  workstreamId, id, fileName, fileType: fileType || 'image',
}));

// eslint-disable-next-line import/prefer-default-export
export { getAttachmentURL };
