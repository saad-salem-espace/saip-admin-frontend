import React from 'react';
// import PropTypes from 'prop-types';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import RadioButtonStyle from './RadioButton.module.scss';

function RadioButton({
  value, name, children,
}) {
  return (
    <Field name={name}>
      {({ field }) => (
        <label htmlFor={`${field.name}-${value}`} className={field.value === value ? RadioButtonStyle.checked : ''}>
          <input {...field} type="radio" id={`${field.name}-${value}`} value={value} checked={field.value === value} />
          {children}
        </label>
      )}
    </Field>
  );
}

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RadioButton;
