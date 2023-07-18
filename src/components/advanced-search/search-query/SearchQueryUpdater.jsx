import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { parseQuery } from 'utils/searchQuery';

const SearchQueryUpdater = ({
  handleOnChange, onChangeSearchQuery, advancedOpened, setAdvancedValidation,
}) => {
  const { values, isValid } = useFormikContext();

  const checkEmptyField = () => {
    for (let i = 0; i < values.searchFields.length; i += 1) {
      if (!(values.searchFields[i].data)) return true;
    }
    return false;
  };

  useEffect(() => {
    const hasEmptyField = checkEmptyField();
    // this is a special case, as sometimes new empty fields don't trigger validation till touched.
    if (hasEmptyField) setAdvancedValidation(false);
    else setAdvancedValidation(isValid);

    if (advancedOpened) {
      onChangeSearchQuery(parseQuery(values.searchFields, ''));
    } else {
      handleOnChange(values);
    }
  }, [values, isValid]);

  return null;
};

SearchQueryUpdater.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  onChangeSearchQuery: PropTypes.func.isRequired,
  advancedOpened: PropTypes.func.isRequired,
  setAdvancedValidation: PropTypes.func,
};

SearchQueryUpdater.defaultProps = {
  setAdvancedValidation: () => {},
};

export default SearchQueryUpdater;
