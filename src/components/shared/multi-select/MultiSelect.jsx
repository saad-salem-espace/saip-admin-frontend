import PropTypes from 'prop-types';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
// import ErrorMessage from '../error-message/ErrorMessage';
import './MultiSelect.scss';

function MultiSelect({
  options, className, label,
  //  errorMsg,
}) {
  return (
    <>
      <div className={`multiSelect ${className}`}>
        <span className="position-absolute label">{label}</span>
        <div>
          <ReactMultiSelectCheckboxes options={options} />
        </div>
      </div>
      {/* <ErrorMessage msg={errorMsg} className="mt-2 mb-0" /> */}
    </>
  );
}

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  // errorMsg: PropTypes.string,
};

MultiSelect.defaultProps = {
  label: null,
  // errorMsg: null,
};

export default MultiSelect;
