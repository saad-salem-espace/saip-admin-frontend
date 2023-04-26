import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorHandler from './ErrorHandler';

/**
 * Error boundary can be used to wrap any component to handle errors
 */
// eslint-disable-next-line functional/no-class
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // To be used to log errors to error service logger
  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, info) {
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <ErrorHandler error={error} />
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
