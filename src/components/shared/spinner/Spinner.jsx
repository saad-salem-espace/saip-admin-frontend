import BootstrapSpinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

function Spinner({ className }) {
  return (
    <BootstrapSpinner animation="border" role="status" className={` ${className} text-primary-dark`} />
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
};

export default Spinner;
