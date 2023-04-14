import PropTypes from 'prop-types';
import { lazy } from 'react';

const errorHandlers = {
  not_found: lazy(() => import('errors/error-pages/NotFoundError')),
  unauthorized: lazy(() => import('errors/error-pages/UnAuthorizedError')),
  server_error: lazy(() => import('errors/error-pages/ServerError')),
  invalid_state: lazy(() => import('errors/error-pages/InvalidState')),
};

const AxiosErrorHandler = ({ error }) => {
  const RenderedComponent = errorHandlers[error.error.code] || errorHandlers.invalid_state;

  return (
    <RenderedComponent />
  );
};

AxiosErrorHandler.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.string.isRequired,
    error: PropTypes.shape({
      status: PropTypes.number,
      type: PropTypes.string,
      code: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AxiosErrorHandler;
