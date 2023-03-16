import DatePicker from 'react-multi-date-picker';
import './DatePicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

function AppDatePicker({
  name, onChangeDate, className, range, isMulti,
}) {
  const { t } = useTranslation('common', { keyPrefix: 'datePicker' });
  return (
    <div className={`datePicker position-relative ${className}`}>
      <Field name={name}>
        {
        ({ field }) => (
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
          />
        )
      }
      </Field>
      <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon f-20 text-primary" />
      <div className="text-warning">{!isMulti && !range && t('singleValueMessage')}</div>
    </div>
  );
}

AppDatePicker.propTypes = {
  name: PropTypes.string,
  onChangeDate: PropTypes.func.isRequired,
  className: PropTypes.string,
  range: PropTypes.bool,
  isMulti: PropTypes.bool,
};

AppDatePicker.defaultProps = {
  name: null,
  className: '',
  range: false,
  isMulti: false,
};

export default AppDatePicker;
