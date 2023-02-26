import PropTypes from 'prop-types';
import SearchResultCard from './search-result-card/SearchResultCard';

const SearchResultCards = ({ data, query }) => (
  <>
    {data.map((searchResult) => (
      <SearchResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
      />
    ))}
  </>
);

SearchResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
};

export default SearchResultCards;
