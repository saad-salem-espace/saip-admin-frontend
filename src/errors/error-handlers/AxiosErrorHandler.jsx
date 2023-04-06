import PropTypes from 'prop-types';
import { lazy } from 'react';
import routes from 'components/routes/routes.json';

const errorHandlers = {
  not_found: lazy(() => import('errors/error-pages/NotFoundError')),
  unauthorized: lazy(() => import('errors/error-pages/UnAuthorizedError')),
  server_error: lazy(() => import('errors/error-pages/ServerError')),
  invalid_state: lazy(() => import('errors/error-pages/InvalidState')),
};

const AxiosErrorHandler = ({ error }) => {
  const RenderedComponent = errorHandlers[error.response.data.code] || errorHandlers.invalid_state;

  return (
    <>
      <h1>Axios Error</h1>
      <RenderedComponent />
      <a href={routes.home}>Go Home</a>
    </>
  );
};

AxiosErrorHandler.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.string.isRequired,
    response: PropTypes.shape({
      data: PropTypes.shape({
        status: PropTypes.number,
        type: PropTypes.string,
        code: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AxiosErrorHandler;
