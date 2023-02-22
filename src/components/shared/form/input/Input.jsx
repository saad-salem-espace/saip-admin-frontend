import { Field } from 'formik';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.module.scss';

function Input({
  id,
  type,
  name,
  placeholder,
  value,
  setInputValue,
  moduleClassName,
}) {
  const styleClassNames = classNames.bind(style);
  const inputClassName = styleClassNames(moduleClassName);

  return (
    <div className={`position-relative h-100 ${inputClassName}`}>
      <Field name={name}>
        {
          ({ field, form }) => {
            const isInvalid = !!(form.touched[field.name] && form.errors[field.name]);
            return (
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                  // please add class ${style['has-value']} if the input has value
                className={`border ${isInvalid ? 'error' : ''} w-100 ${style.input} `}
                onChange={(e) => setInputValue(e.target.value)}
                value={value}
              />
            );
          }
        }
      </Field>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};
Input.defaultProps = {
  type: 'text',
  placeholder: null,
  name: null,
};

export default Input;
