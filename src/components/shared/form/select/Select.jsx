import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import style from './style.module.scss';

function Select({
  id,
  fieldName,
  className,
  options,
  onChangeSelect,
  moduleClassName,
}) {
  return (
    <div className={className}>
      <Field id={id} as="select" name={fieldName} onChange={onChangeSelect} className={`${style[moduleClassName]} ${style.select} border border-end-0`}>
        {options.map(({ key, value }) => (
          <option
            key={`${fieldName}-${key}-${value}`}
            value={key}
            className="f-14"
          >
            {value}
          </option>
        ))}
      </Field>
    </div>
  );
}

Select.propTypes = {
  moduleClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  onChangeSelect: PropTypes.func.isRequired,
};
Select.defaultProps = {
  moduleClassName: '',
  fieldName: null,
  className: null,
};
export default Select;
