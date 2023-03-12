import DatePicker from 'react-multi-date-picker';
import './DatePicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { Field } from 'formik';

function AppDatePicker({
  name, onChangeDate, className, range,
}) {
  return (
    <div className={`datePicker position-relative ${className}`}>
      <Field name={name}>
        {
        ({ field }) => <DatePicker range={range} editable={false} {...field} name={name} format="DD MMMM YYYY" value={field.value} onChange={(val) => onChangeDate(val)} />
      }
      </Field>
      <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon f-20 text-primary" />
    </div>
  );
}

AppDatePicker.propTypes = {
  name: PropTypes.string,
  onChangeDate: PropTypes.func.isRequired,
  className: PropTypes.string,
  range: PropTypes.bool,
};

AppDatePicker.defaultProps = {
  name: null,
  className: '',
  range: false,
};

export default AppDatePicker;
