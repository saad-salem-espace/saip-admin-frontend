import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';

function SearchNote({ searchKeywords, resultsCount }) {
  return (
    <Trans
      i18nKey="searchNote"
      ns="search"
      values={{
        searchKeywords,
        resultsCount,
      }}
    >
      <span className="font-medium" />
    </Trans>
  );
}

SearchNote.propTypes = {
  searchKeywords: PropTypes.string.isRequired,
  resultsCount: PropTypes.number.isRequired,
};

export default SearchNote;
