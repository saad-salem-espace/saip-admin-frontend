import PropTypes from 'prop-types';
import SearchResultCard from './search-result-card/SearchResultCard';

const SearchResultCards = ({
  data, query, setActiveDocument, activeDocument, highlghtWords,
}) => (
  <>
    {data.map((searchResult) => (
      <SearchResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
        setActiveDocument={setActiveDocument}
        activeDocument={activeDocument}
        highlghtWords={highlghtWords}
      />
    ))}
  </>
);

SearchResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  highlghtWords: PropTypes.arrayOf(PropTypes.string),
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
};

SearchResultCards.defaultProps = {
  highlghtWords: [],
};

export default SearchResultCards;
