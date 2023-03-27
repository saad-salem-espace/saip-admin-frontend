import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import ErrorMessage from 'components/shared/error-message/ErrorMessage';
// import MultiSelect from 'components/shared/multi-select/MultiSelect';
import formStyle from 'components/shared/form/form.module.scss';
import Select from 'components/shared/form/select/Select';
import Button from 'components/shared/button/Button';
import Input from 'components/shared/form/input/Input';
import DatePicker from 'components/shared/date-picker/AppDatePicker';
import { isMultipleValue, isRangeValue } from 'utils/searchQuery/encoder';
import { useMemo } from 'react';
import { exclude } from 'utils/arrays';
import MultiSelect from 'components/shared/multi-select/MultiSelect';
import options from 'testing-resources/patents/lkps/ipcClassifications.json';
import style from '../SearchQuery.module.scss';

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
  onChangeDate,
}) {
  const identifiersList = searchIdentifiers;

  const inputModuleClassName = ({
    smInput: true,
    error: !!error, // please change it to true if we have error
  });
  const { t } = useTranslation(['search', 'translation']);

  const textField = () => (
    <>
      <span className={`position-absolute ${formStyle.label} ${formStyle.smLabel}`}>
        {t('criteria')}
      </span>
      <Input moduleClassName={inputModuleClassName} name={name} />
    </>
  );

  const dateField = () => (
    <div>
      <DatePicker
        name={name}
        range={isRangeValue(conditionValue.optionParserName)}
        isMulti={isMultipleValue(conditionValue.optionParserName)}
        onChangeDate={onChangeDate}
        className={`${error ? 'error' : ''}`}
      />
    </div>
  );

  const lkpField = (isClearable = true) => (
    <MultiSelect
      name={name}
      options={options}
      errorMsg={t('translation:noEmptyField')}
        // please add class has-value if the user selects any option
        // please add error class if select has error
      className={`smMultiSelect ${style.advancedSearchSelect} has-value`}
        // please show the below label if the user selects any option
      label={identifierValue.identiferName}
      isClearable={isClearable}
    />
  );

  const inputFields = {
    textFields: {
      supports: ['Text', 'Number'],
      getField: textField,
    },
    dateFields: {
      supports: ['Date'],
      getField: dateField,
    },
    lkpFields: {
      supports: ['Text', 'Number'],
      getField: lkpField,
    },
  };

  const getInputField = useMemo(() => {
    let returnedField = null;
    if (identifierValue?.isLkp) {
      returnedField = inputFields.lkpFields.getField();
    } else {
      exclude(Object.keys(inputFields), ['lkpFields']).forEach((inputField) => {
        if (inputFields[inputField].supports.includes(identifierValue?.identifierType)) {
          returnedField = inputFields[inputField].getField();
        }
      });
    }
    return returnedField || inputFields.textFields.getField();
  }, [identifierValue?.identifierType, identifierValue?.isLkp, conditionValue]);

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
        <div className={`position-relative mb-md-0 mb-3 flex-grow-1 ${style.condition}`}>
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
                text={<FontAwesomeIcon icon={faTrashAlt} className="text-danger-dark ms-2" />}
            /> : null
        }
      </div>
      <div className={`position-relative ${style.criteria}`}>
        {getInputField}
        {error && <ErrorMessage
          msg="Search criteria cannot be empty for any field."
          className="mt-2"
        /> }
      </div>
    </div>
  );
}

SearchField.propTypes = {
  handleRemove: PropTypes.func,
  name: PropTypes.string,
  searchIdentifiers: PropTypes.arrayOf(PropTypes.shape({
    identiferName: PropTypes.string.isRequired,
  })).isRequired,
  identifierValue: PropTypes.shape({
    identiferName: PropTypes.string.isRequired,
    identifierType: PropTypes.string.isRequired,
    isLkp: PropTypes.bool.isRequired,
    identifierOptions: PropTypes.instanceOf(Object).isRequired,
  }).isRequired,
  conditionValue: PropTypes.shape({
    optionParserName: PropTypes.string.isRequired,
    optionName: PropTypes.string.isRequired,
  }).isRequired,
  onChangeIdentifier: PropTypes.func.isRequired,
  onChangeCondition: PropTypes.func.isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired,
  error: PropTypes.string,
  onChangeDate: PropTypes.func,
};

SearchField.defaultProps = {
  handleRemove: () => {},
  name: null,
  error: null,
  onChangeDate: () => {},
};

export default SearchField;
