import './DatePicker.scss';
import DatePicker from 'react-multi-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';

function AppDatePicker() {
  return (
    <div className="datePicker position-relative">
      <DatePicker />
      <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon f-20 text-primary" />
    </div>
  );
}

export default AppDatePicker;
