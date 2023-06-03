import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { getIn, useFormikContext } from 'formik';

/**
 * @param t
 * @param {key, values} object error message { key: 'erros.minimumLength', values: { count: 10 } }
 * @returns object { key: 'error.path', values: { ... } }
 *
 * Converts
 * {
 *   key: 'error.path',
 *   values: {
 *     a: 10,
 *     b: (f) => { f('namespace:field.path') },
 *     c: 'X' }
 *   }
 * }
 * to:
 * {
 *   key: 'error.path',
 *   values: {
 *     a: 10,
 *     b: "the return value of t('namespace:field.path')",
 *     c: 'X'
 *    }
 *   }
 * }
 */
const translateError = (t, { key, values }) => {
  const translatedValues = Object.keys(values).reduce((accumulator, valueKey) => {
    if (typeof values[valueKey] === 'function') {
      accumulator[valueKey] = values[valueKey](t);
    } else {
      accumulator[valueKey] = values[valueKey];
    }

    return accumulator;
  }, {});

  return t(key, translatedValues);
};

const FormikErrorMessage = ({ name, className }) => {
  const { errors, touched } = useFormikContext();
  const [fieldError, fieldTouched] = [getIn(errors, name), getIn(touched, name)];
  const { t, i18n } = useTranslation();

  if (!fieldError || !fieldTouched) {
    return null;
  }

  let errorMessage = fieldError;
  if (fieldError.values) {
    errorMessage = translateError(t, fieldError);
  } else if (fieldError.key) {
    errorMessage = t(fieldError.key);
  } else if (i18n.exists(fieldError)) {
    errorMessage = t(fieldError);
  }

  return (
    <div className={`has-error app-text-danger small mt-2 ${className} px-1`}>
      {errorMessage}
    </div>
  );
};

export default FormikErrorMessage;

FormikErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

FormikErrorMessage.defaultProps = {
  className: '',
};
