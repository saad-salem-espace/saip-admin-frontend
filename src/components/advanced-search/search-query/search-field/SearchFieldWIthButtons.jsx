/* eslint-disable react/forbid-prop-types */
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import RadioButton from '../../../shared/form/radio-button/RadioButton';
import RadioButtonGroup from '../../../shared/form/radio-button/RadioButtonGroup';

function SearchFieldWIthButtons({
  order,
  handleRemove,
  name,
  searchIdentifiers,
  identifierValue,
  onChangeIdentifier,
  conditionValue,
  onChangeCondition,
  error,
}) {
  const { t } = useTranslation('search');
  const searchField = (
    <SearchField
      order={order}
      handleRemove={handleRemove}
      name={name}
      searchIdentifiers={searchIdentifiers}
      identifierValue={identifierValue}
      onChangeIdentifier={onChangeIdentifier}
      conditionValue={conditionValue}
      onChangeCondition={onChangeCondition}
      error={error}
    />
  );
  return (
    <div>
      { !!order && (
      <RadioButtonGroup className="mb-2" moduleClassName="customRadio">
        <RadioButton name="operator" value="and" checked>{t('and')}</RadioButton>
        <RadioButton name="operator" value="or">{t('or')}</RadioButton>
        <RadioButton name="operator" value="not">{t('not')}</RadioButton>
      </RadioButtonGroup>
      )}
      {searchField}
    </div>
  );
}

SearchFieldWIthButtons.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  searchIdentifiers: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired,
  onChangeIdentifier: PropTypes.func.isRequired,
  onChangeCondition: PropTypes.func.isRequired,
  identifierValue: PropTypes.object.isRequired,
  conditionValue: PropTypes.object.isRequired,
  error: PropTypes.string,
};

SearchFieldWIthButtons.defaultProps = {
  error: null,
};

export default SearchFieldWIthButtons;
