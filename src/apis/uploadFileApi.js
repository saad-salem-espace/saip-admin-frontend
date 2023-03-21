import apiInstance from 'apis/apiInstance';

function uploadFileApi(file) {
  return apiInstance.post('/files/upload', file, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => ({
      res,
      err: null,
    }))
    .catch((error) => ({
      res: null,
      err: error?.response?.data?.message,
    }));
}

export default uploadFileApi;
