import DatePicker from 'react-multi-date-picker';
import './DatePicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import ErrorMessage from '../error-message/ErrorMessage';

function AppDatePicker({ range, className, errorMsg }) {
  return (
    <div className={`datePicker position-relative ${className}`}>
      <DatePicker range={range} />
      <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon f-20 text-primary" />
      <ErrorMessage msg={errorMsg} className="mt-2 mb-0" />
    </div>
  );
}

AppDatePicker.propTypes = {
  range: PropTypes.bool,
  className: PropTypes.string,
  errorMsg: PropTypes.string,
};

AppDatePicker.defaultProps = {
  range: false,
  className: '',
  errorMsg: '',
};

export default AppDatePicker;
