import apiInstance from 'apis/apiInstance';
import attachmentApi from 'apis/common/attachmentApi';

const getAttachmentURL = ({
  workstreamId, fileName, id, fileType,
}) => apiInstance.getUri(attachmentApi({
  workstreamId, id, fileName, fileType: fileType || 'image',
}));

const imageUrlToBase64 = (imageUrl) => (
  fetch(imageUrl)
    .then((response) => response.blob())
    .then(
      (blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }),
    )
    .then((dataUrl) => dataUrl.split(',')[1])
);

export { getAttachmentURL, imageUrlToBase64 };
