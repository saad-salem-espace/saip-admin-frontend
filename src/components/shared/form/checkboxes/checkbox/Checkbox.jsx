import { Field } from 'formik';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.scss';
import FormikErrorMessage from '../../formik-error-message/FormikErrorMessage';

function Checkbox({
  fieldFor,
  disabled,
  name,
  text,
  checked,
  className,
  showError,
  errorClassName,
  onChange,
  disablePropagation,
  labelClassName,
}) {
  return (
    <div
      className={className}
      role="presentation"
      {...(disablePropagation && { onClick: (e) => { e.stopPropagation(); } })}
    >
      <label
        htmlFor={fieldFor}
        className={labelClassName}
      >
        <Field
          type="checkbox"
          name={name}
          id={fieldFor}
          disabled={disabled}
          className={style.checkbox}
          {...(checked && { checked })}
          {...(onChange && { onChange })}
        />
        {text}
        <span className={`${style.checkmark}`}>
          <FontAwesomeIcon icon={faCheck} className="text-white" />
        </span>
      </label>
      {/* TODO remove name when we make sure we always send a name */}
      {name && showError && <FormikErrorMessage name={name} className={errorClassName} /> }
    </div>
  );
}

Checkbox.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  fieldFor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  showError: PropTypes.bool,
  errorClassName: PropTypes.string,
  onChange: PropTypes.func,
  disablePropagation: PropTypes.bool,
};

Checkbox.defaultProps = {
  text: null,
  disabled: false,
  checked: undefined,
  className: '',
  labelClassName: '',
  showError: true,
  errorClassName: '',
  onChange: null,
  disablePropagation: true,
};

export default Checkbox;
