import PropTypes from 'prop-types';
import TrademarksSearchResultCard from './TrademarksSearchResultCard';

const TrademarksSearchResultCards = ({
  data, query, setActiveDocument, activeDocument, selectedView,
}) => (
  <>
    {data.map((searchResult) => (
      <TrademarksSearchResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
        setActiveDocument={setActiveDocument}
        activeDocument={activeDocument}
        selectedView={selectedView}
      />
    ))}
  </>
);

TrademarksSearchResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.string.isRequired,
};

export default TrademarksSearchResultCards;
