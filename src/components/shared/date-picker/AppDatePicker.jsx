import DatePicker from 'react-multi-date-picker';
import './DatePicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

function AppDatePicker({ range }) {
  return (
    <div className="datePicker position-relative">
      <DatePicker range={range} />
      <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon f-20 text-primary" />
    </div>
  );
}

AppDatePicker.propTypes = {
  range: PropTypes.bool,
};

AppDatePicker.defaultProps = {
  range: false,
};

export default AppDatePicker;
