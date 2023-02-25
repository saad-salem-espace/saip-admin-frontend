import PropTypes from 'prop-types';
import RadioButtonStyle from './RadioButton.module.scss';

function RadioButtonGroup({
  children, className,
}) {
  return (
    <div className={` ${RadioButtonStyle.customRadio} ${className} `}>
      {children}
    </div>
  );
}

RadioButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

RadioButtonGroup.defaultProps = {
  className: '',
};
export default RadioButtonGroup;
