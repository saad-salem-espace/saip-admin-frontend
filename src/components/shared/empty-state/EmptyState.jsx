import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

function EmptyState({
  title, msg, img, className,
}) {
  return (
    <div className={`d-flex align-items-center justify-content-center ${className}`}>
      <div className="text-center">
        <Image src={img} className="mb-10" />
        <h5 className="mb-4">{title}</h5>
        <p>{msg}</p>
      </div>
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  className: PropTypes.string,
};

EmptyState.defaultProps = {
  className: '',
};

export default EmptyState;
