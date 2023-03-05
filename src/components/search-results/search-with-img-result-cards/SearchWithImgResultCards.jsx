import PropTypes from 'prop-types';
import SearchWithImgResultCard from './SearchWithImgResultCard';

const SearchWithImgResultCards = ({ data, query, setActiveDocument }) => (
  <>
    {data.map((searchResult) => (
      <SearchWithImgResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
        setActiveDocument={setActiveDocument}
      />
    ))}
  </>
);

SearchWithImgResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
};

export default SearchWithImgResultCards;
