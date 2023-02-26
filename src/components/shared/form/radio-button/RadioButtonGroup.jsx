import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import RadioButtonStyle from './RadioButton.module.scss';

function RadioButtonGroup({
  children, className, moduleClassName,
}) {
  const styleClassNames = classNames.bind(RadioButtonStyle);
  const groupClassName = styleClassNames(moduleClassName);

  return (
    <div className={` ${groupClassName} ${className} `}>
      {children}
    </div>
  );
}

RadioButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  moduleClassName: PropTypes.string,
};

RadioButtonGroup.defaultProps = {
  className: '',
  moduleClassName: '',
};
export default RadioButtonGroup;
