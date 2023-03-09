/* eslint-disable react-perf/jsx-no-new-array-as-prop */
/* eslint-disable react/forbid-prop-types */
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import ErrorMessage from 'components/shared/error-message/ErrorMessage';
import formStyle from '../../../shared/form/form.module.scss';
import Select from '../../../shared/form/select/Select';
import style from '../SearchQuery.module.scss';
import Button from '../../../shared/button/Button';
import Input from '../../../shared/form/input/Input';
// import DatePicker from '../../../shared/date-picker/AppDatePicker';

function SearchField({
  handleRemove,
  name,
  searchIdentifiers,
  identifierValue,
  onChangeIdentifier,
  conditionValue,
  onChangeCondition,
  error,
  order,
}) {
  const { t } = useTranslation('search');
  const identifiersList = searchIdentifiers;

  const inputModuleClassName = ({
    smInput: true,
    error: !!error, // please change it to true if we have error
  });

  return (
    <div className={`p-4 bg-primary-01 mb-2 ${style.wrapper}`}>
      <div className="d-flex mb-4">
        <div className={`position-relative mb-md-0 mb-3 me-2 ${style.searchFields}`}>
          <span className={`position-absolute ${formStyle.label} ${formStyle.smLabel}`}>{t('searchFields')}</span>
          <Select
            options={identifiersList}
            className="smSelect defaultSelect smWithLabel"
            getOptionName={(option) => option.identiferName}
            getOptionValue={(option) => option.identiferName}
            selectedOption={identifierValue}
            setSelectedOption={onChangeIdentifier}
          />
        </div>
        <div className={`position-relative mb-md-0 mb-3 me-4 ${style.condition}`}>
          <span className={`position-absolute ${formStyle.label} ${formStyle.smLabel}`}>{t('condition')}</span>
          <Select
            options={identifierValue?.identifierOptions}
            className="smSelect defaultSelect smWithLabel"
            getOptionName={(option) => option.optionName}
            selectedOption={conditionValue}
            setSelectedOption={onChangeCondition}
            getOptionValue={(option) => option.optionName}
          />
        </div>
        {
          order
            ? <Button
                variant="link"
                onClick={handleRemove}
                className="p-0"
                text={<FontAwesomeIcon icon={faTrashAlt} className="text-danger-dark" />}
            /> : null
        }
      </div>
      <div className={`position-relative me-2 ${style.criteria}`}>
        <span className={`position-absolute ${formStyle.label}
         ${formStyle.smLabel}`}
        >
          {t('criteria')}
        </span>
        <Input moduleClassName={inputModuleClassName} name={name} />
        {error && <ErrorMessage
          msg="Search criteria cannot be empty for any field."
          className="mt-2"
        /> }
      </div>
      {/* for datepicker */}
      {/* <div className={style.dateWrapper}>
        <DatePicker />
      </div> */}
    </div>
  );
}

SearchField.propTypes = {
  handleRemove: PropTypes.func,
  name: PropTypes.string,
  searchIdentifiers: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  identifierValue: PropTypes.object.isRequired,
  conditionValue: PropTypes.object.isRequired,
  onChangeIdentifier: PropTypes.func.isRequired,
  onChangeCondition: PropTypes.func.isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired,
  error: PropTypes.string,
};

SearchField.defaultProps = {
  handleRemove: null,
  name: null,
  error: null,
};

export default SearchField;
