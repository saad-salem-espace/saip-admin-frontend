import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { parseQuery } from 'utils/searchQuery';

const SearchQueryUpdater = ({ handleOnChange, onChangeSearchQuery, advancedOpened }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    if (advancedOpened) {
      onChangeSearchQuery(parseQuery(values.searchFields, ''));
    } else {
      handleOnChange(values);
    }
  }, [values]);

  return null;
};

SearchQueryUpdater.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  onChangeSearchQuery: PropTypes.func.isRequired,
  advancedOpened: PropTypes.func.isRequired,
};

export default SearchQueryUpdater;
