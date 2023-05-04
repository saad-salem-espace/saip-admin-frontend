import { constructFormData } from '../utils/forms';

const uploadFileApi = (file) => ({
  url: '/files/upload',
  data: constructFormData({ file }),
  method: 'POST',
  headers: { 'Content-Type': 'multipart/form-data' },
});

export default uploadFileApi;
