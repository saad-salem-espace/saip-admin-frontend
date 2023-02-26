import React from 'react';
// import PropTypes from 'prop-types';
import { Field, useField } from 'formik';
import PropTypes from 'prop-types';
import RadioButtonStyle from './RadioButton.module.scss';

function RadioButton({
  value, name, children, checked,
}) {
  const [field, , { setTouched }] = useField(name);
  const onChange = (e) => {
    setTouched(true);
    field.onChange(e);
  };
  return (
    <label htmlFor={value} className={checked ? RadioButtonStyle.checked : ''}>
      <Field id={value} type="radio" name={name} value={value} onChange={onChange} checked={checked} />
      {children}
    </label>
  );
}

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default RadioButton;
