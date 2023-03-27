import DatePicker from 'react-multi-date-picker';
import './DatePicker.scss';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import WarningMessage from '../warning-message/WarningMessage';

function AppDatePicker({
  name, onChangeDate, className, range, isMulti,
}) {
  const { t } = useTranslation('common', { keyPrefix: 'datePicker' });
  return (
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
            />
            <span className="icon-ic-calendar f-20 colored" />
            {(!isMulti && !range && Array.isArray(field.value) && field.value.length > 1) && (
            <WarningMessage className="mt-2" msg={t('singleValueMessage')} />
            )}
          </div>
        )
      }
    </Field>
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
