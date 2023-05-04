import React from 'react';
// import PropTypes from 'prop-types';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import RadioButtonStyle from './RadioButton.module.scss';
import FormikErrorMessage from '../formik-error-message/FormikErrorMessage';

function RadioButton({
  value, name, children, errorClassName, showError,
}) {
  return (
    <>
      <Field name={name}>
        {({ field }) => (
          <label htmlFor={`${field.name}-${value}`} className={field.value === value ? RadioButtonStyle.checked : ''}>
            <input {...field} type="radio" id={`${field.name}-${value}`} value={value} checked={field.value === value} />
            {children}
          </label>
        )}
      </Field>
      {showError && <FormikErrorMessage name={name} className={errorClassName} /> }
    </>
  );
}

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  errorClassName: PropTypes.string,
  showError: PropTypes.bool,
};

RadioButton.defaultProps = {
  showError: false,
  errorClassName: '',
};

export default RadioButton;
