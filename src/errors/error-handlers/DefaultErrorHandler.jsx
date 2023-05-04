import { lazy } from 'react';

const InvalidState = lazy(() => import('errors/error-pages/InvalidState'));

const DefaultErrorHandler = () => <InvalidState />;

export default DefaultErrorHandler;
