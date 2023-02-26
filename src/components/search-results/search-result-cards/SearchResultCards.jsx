import PropTypes from 'prop-types';
import SearchResultCard from './search-result-card/SearchResultCard';

const SearchResultCards = ({ data }) => (
  <>
    {data.map((searchResult) => (
      <SearchResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
      />
    ))}
  </>
);

SearchResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};

export default SearchResultCards;
