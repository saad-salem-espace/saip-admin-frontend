import { Field } from 'formik';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.scss';

function Checkbox({
  fieldFor,
  disabled,
  name,
  text,
  checked,
  className,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={fieldFor}
      >
        <Field
          type="checkbox"
          name={name}
          id={fieldFor}
          disabled={disabled}
          checked={checked}
          className={style.checkbox}
        />
        {text}
        <span className={`${style.checkmark}`}>
          <FontAwesomeIcon icon={faCheck} className="text-white" />
        </span>
      </label>
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
};

Checkbox.defaultProps = {
  text: null,
  disabled: false,
  checked: undefined,
  className: '',
};

export default Checkbox;
