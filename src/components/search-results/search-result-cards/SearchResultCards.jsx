import PropTypes from 'prop-types';
import SearchResultCard from './search-result-card/SearchResultCard';

const SearchResultCards = ({
  data, query, setActiveDocument, activeDocument, flattenedCriteria,
}) => (
  <>
    {data.map((searchResult) => (
      <SearchResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
        setActiveDocument={setActiveDocument}
        activeDocument={activeDocument}
        flattenedCriteria={flattenedCriteria}
      />
    ))}
  </>
);

SearchResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  flattenedCriteria: PropTypes.arrayOf(PropTypes.string).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
};

export default SearchResultCards;
