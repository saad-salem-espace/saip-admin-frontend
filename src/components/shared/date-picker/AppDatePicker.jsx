import './DatePicker.scss';
import DatePicker from 'react-multi-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { Field } from 'formik';

function AppDatePicker({ name, onChangeDate }) {
  return (
    <div className="datePicker position-relative">
      <Field name={name}>
        {
        ({ field }) => <DatePicker {...field} name={name} onChange={(val) => onChangeDate(val.format('YYYY/MM/DD'))} />
      }
      </Field>

      <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon f-20 text-primary" />
    </div>
  );
}

AppDatePicker.propTypes = {
  name: PropTypes.string,
  onChangeDate: PropTypes.func.isRequired,
};

AppDatePicker.defaultProps = {
  name: null,
};

export default AppDatePicker;
