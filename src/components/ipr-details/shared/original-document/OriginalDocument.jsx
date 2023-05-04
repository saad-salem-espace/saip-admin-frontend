import attachmentApi from 'apis/common/attachmentApi';
import MyDocument from './MyDocument';

function OriginalDocument() {
  const config = attachmentApi({
    workstreamId: 1,
    fileType: 'pdf',
    id: 'US, 13797521',
    fileName: '2022045839.pdf',
    responseType: 'arraybuffer',
  });
  return (
    <MyDocument config={config} />
  );
}

export default OriginalDocument;
