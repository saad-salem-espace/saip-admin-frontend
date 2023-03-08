import apiInstance from 'apis/apiInstance';

function uploadFileApi(file) {
  return apiInstance.post('/files/upload', file, { headers: { 'Content-Type': 'multipart/form-data' } })
    /* eslint-disable */
    .then((res) => {
      return {
        res: res,
        err: null,
      };
    })
    .catch((error) => {
      return {
        res: null,
        err: error?.response?.data?.message,
      };
    });
}

export default uploadFileApi;