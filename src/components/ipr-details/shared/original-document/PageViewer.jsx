import PropTypes from 'prop-types';
import { useEffect } from 'react';

const PageViewer = ({ step, setStep, children }) => {
  useEffect(() => {
    setStep(step);
  }, []);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

PageViewer.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageViewer;
