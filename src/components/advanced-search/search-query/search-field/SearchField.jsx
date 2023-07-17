import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import 'components/shared/form/form.scss';
import Select from 'components/shared/form/select/Select';
import Button from 'components/shared/button/Button';
import DatePicker from 'components/shared/date-picker/AppDatePicker';
import Input from 'components/shared/form/input/Input';
import { isMultipleValue, isRangeValue } from 'utils/search-query/encoder';
import { useMemo } from 'react';
import { exclude } from 'utils/arrays';
import { identifierName, optionName } from 'utils/searchQuery';
import MultiSelect from 'components/shared/form/multi-select/MultiSelect';
import options from 'testing-resources/patents/lkps/ipcClassifications.json';
import './searchField.scss';

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
  const { t, i18n } = useTranslation(['search', 'translation']);
  const currentLang = i18n.language;
  const textField = () => (
    <>
      <span className="position-absolute saip-label smLabel">
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
        className={`border-end ${error ? 'error' : ''}`}
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
      className="smMultiSelect advancedSearchSelect has-value"
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
      returnedField = inputFields.textFields.getField();
    } else {
      exclude(Object.keys(inputFields), ['lkpFields']).forEach((inputField) => {
        if (inputFields[inputField].supports.includes(identifierValue?.identifierType)) {
          returnedField = inputFields[inputField].getField();
        }
      });
    }
    return returnedField || inputFields.textFields.getField();
  }, [identifierValue?.identifierType, identifierValue?.isLkp, conditionValue, currentLang]);

  return (
    <div className="p-4 mb-2 search-query-wrapper search-query-inputs app-bg-primary-01">
      <div className="d-flex mb-4 search-fields-condition">
        <div className="position-relative mb-md-0 mb-3 me-2 search-fields searchFields">
          <span className="position-absolute saip-label smLabel">{t('searchFields')}</span>
          <Select
            options={identifiersList}
            className="smSelect defaultSelect smWithLabel"
            getOptionName={(option) => identifierName(option, currentLang)}
            getOptionValue={(option) => option.identiferName}
            selectedOption={identifierValue}
            setSelectedOption={onChangeIdentifier}
          />
        </div>
        <div className="position-relative mb-md-0 mb-3 flex-grow-1 condition search-query-condition">
          <span className="position-absolute saip-label smLabel">{t('condition')}</span>
          <Select
            options={identifierValue?.identifierOptions}
            className="smSelect defaultSelect smWithLabel"
            getOptionName={(option) => optionName(option, currentLang)}
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
                text={<FontAwesomeIcon icon={faTrashAlt} className="app-text-danger-dark ms-2" />}
            /> : null
        }
      </div>
      <div className="position-relative criteria search-query-criteria">
        {getInputField}
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
