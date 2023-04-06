import PropTypes from 'prop-types';
import AxiosErrorHandler from './error-handlers/AxiosErrorHandler';
import DefaultErrorHandler from './error-handlers/DefaultErrorHandler';

const ErrorHandler = ({ error }) => {
  switch (error.name) {
    case 'AxiosError': {
      return <AxiosErrorHandler error={error} />;
    }
    default:
      return <DefaultErrorHandler error={error} />;
  }
};

ErrorHandler.propTypes = {
  error: PropTypes.oneOfType([Object]).isRequired,
};

export default ErrorHandler;
