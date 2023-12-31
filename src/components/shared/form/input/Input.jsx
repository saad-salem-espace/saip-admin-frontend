import { Field } from 'formik';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import FormikErrorMessage from '../formik-error-message/FormikErrorMessage';

function Input({
  id,
  type,
  name,
  placeholder,
  moduleClassName,
  disabled,
  imageSearch,
  className,
  showError,
  errorClassName,
}) {
  const styleClassNames = classNames.bind(style);
  const inputClassName = styleClassNames(moduleClassName);

  return (
    <div className={`position-relative h-100 ${inputClassName}`}>
      <Field name={name}>
        {
          ({ field, meta }) => {
            const isInvalid = !!(meta.touched && meta.error);
            return (
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                  // please add class ${style['has-value']} if the input has value
                className={`border ${isInvalid && !imageSearch ? style.error : ''} w-100 ${style.input} ${className} `}
                disabled={disabled}
                data-testid={`test-${name}`}
                {...field}
              />
            );
          }
        }
      </Field>
      {showError && <FormikErrorMessage name={name} className={errorClassName} /> }
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  moduleClassName: PropTypes.string,
  disabled: PropTypes.bool,
  imageSearch: PropTypes.bool,
  className: PropTypes.string,
  showError: PropTypes.bool,
  errorClassName: PropTypes.string,
};
Input.defaultProps = {
  type: 'text',
  placeholder: null,
  name: null,
  value: '',
  moduleClassName: '',
  className: '',
  disabled: false,
  imageSearch: false,
  showError: true,
  errorClassName: '',
};

export default Input;
