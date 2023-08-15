import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

function EmptyState({
  title, msg, img, className, titleClassName,
}) {
  return (
    <div className={`d-flex align-items-center justify-content-center ${className}`}>
      <div className="text-center">
        <Image src={img} className="mb-10" />
        <h5 className={`mb-4 ${titleClassName}`}>{title}</h5>
        {msg && (
          <p>{msg}</p>
        )}
      </div>
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.string,
  img: PropTypes.string.isRequired,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
};

EmptyState.defaultProps = {
  className: '',
  titleClassName: '',
  msg: null,
};

export default EmptyState;
