import { toast } from 'react-toastify';

const toastify = (status, message, delay = 3000, options = {}) => {
  toast.dismiss();
  toast[status](message, { delay, ...options });
};
export default toastify;
