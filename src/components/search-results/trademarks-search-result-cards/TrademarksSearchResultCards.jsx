import PropTypes from 'prop-types';
import SearchWithImgResultCard from './TrademarksSearchResultCard';

const TrademarksSearchResultCards = ({
  data, query, setActiveDocument, activeDocument,
}) => (
  <>
    {data.map((searchResult) => (
      <SearchWithImgResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
        setActiveDocument={setActiveDocument}
        activeDocument={activeDocument}
      />
    ))}
  </>
);

TrademarksSearchResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
};

export default TrademarksSearchResultCards;
