import { toast } from 'react-toastify';

const toastify = (status, message, options = {}) => {
  toast.dismiss();
  toast[status](message, { ...options });
};
export default toastify;
