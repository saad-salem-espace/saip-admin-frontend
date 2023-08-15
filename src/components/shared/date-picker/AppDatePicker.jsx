import DatePicker from 'react-multi-date-picker';
import './DatePicker.scss';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { FaRegCalendarAlt } from 'react-icons/fa';
import WarningMessage from '../warning-message/WarningMessage';
import FormikErrorMessage from '../form/formik-error-message/FormikErrorMessage';

function AppDatePicker({
  name, onChangeDate, className, range, isMulti, errorClassName, showError,
}) {
  const { t } = useTranslation('common', { keyPrefix: 'datePicker' });
  return (
    <>
      <Field name={name}>
        {
        ({ field, meta }) => (
          <div className={`datePicker position-relative
           ${className}
           ${!isMulti && !range && Array.isArray(field.value) && field.value.length > 1 ? 'warning' : ''}
           ${meta.error && meta.touched ? 'error' : ''}
           `}
          >
            <DatePicker
              range={range}
              editable={false}
              multiple={isMulti}
              {...field}
              name={name}
              format="DD MMMM YYYY"
              value={field.value}
              onChange={(val) => {
                if (Array.isArray(val) && (!isMulti && !range)) {
                  onChangeDate(val[0]);
                } else {
                  onChangeDate(val);
                }
              }}
              calendarPosition="bottom-center"
              fixMainPosition
            />
            <FaRegCalendarAlt className="icon-ic-calendar fs-20 app-text-primary" />
            {(!isMulti && !range && Array.isArray(field.value) && field.value.length > 1) && (
            <WarningMessage className="mt-2" msg={t('singleValueMessage')} />
            )}
          </div>
        )
      }
      </Field>
      {showError && <FormikErrorMessage name={name} className={errorClassName} /> }
    </>
  );
}

AppDatePicker.propTypes = {
  name: PropTypes.string,
  onChangeDate: PropTypes.func.isRequired,
  className: PropTypes.string,
  range: PropTypes.bool,
  isMulti: PropTypes.bool,
  showError: PropTypes.bool,
  errorClassName: PropTypes.string,
};

AppDatePicker.defaultProps = {
  name: null,
  className: '',
  range: false,
  isMulti: false,
  showError: true,
  errorClassName: '',
};

export default AppDatePicker;
