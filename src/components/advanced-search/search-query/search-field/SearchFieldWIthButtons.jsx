import PropTypes from 'prop-types';
import SearchField from './SearchField';
import RadioButton from '../../../shared/form/radio-button/RadioButton';
import RadioButtonGroup from '../../../shared/form/radio-button/RadioButtonGroup';

function SearchFieldWIthButtons({
  order,
  handleRemove,
  namePrefix,
  searchIdentifiers,
  identifierValue,
  onChangeIdentifier,
  conditionValue,
  onChangeCondition,
  error,
  onChangeDate,
  operators,
}) {
  const searchField = (
    <SearchField
      order={order}
      handleRemove={handleRemove}
      name={`${namePrefix}.data`}
      searchIdentifiers={searchIdentifiers}
      identifierValue={identifierValue}
      onChangeIdentifier={onChangeIdentifier}
      conditionValue={conditionValue}
      onChangeCondition={onChangeCondition}
      error={error}
      onChangeDate={onChangeDate}
    />
  );
  return (
    <div>
      { !!order && (
      <RadioButtonGroup className="mb-2" moduleClassName="customRadio">
        {operators.map(({ displayName, operator }) => (
          <RadioButton
            key={`${namePrefix}.operator.${operator}`}
            name={`${namePrefix}.operator`}
            value={operator}
          >
            {displayName}
          </RadioButton>
        ))}
      </RadioButtonGroup>
      )}
      {searchField}
    </div>
  );
}

SearchFieldWIthButtons.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  namePrefix: PropTypes.string.isRequired,
  searchIdentifiers: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired,
  onChangeIdentifier: PropTypes.func.isRequired,
  onChangeCondition: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func,
  identifierValue: PropTypes.instanceOf(Object).isRequired,
  conditionValue: PropTypes.instanceOf(Object).isRequired,
  operators: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      operator: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  error: PropTypes.string,
};

SearchFieldWIthButtons.defaultProps = {
  onChangeDate: () => {},
  error: null,
};

export default SearchFieldWIthButtons;
