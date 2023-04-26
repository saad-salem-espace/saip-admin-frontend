import PropTypes from 'prop-types';
import TrademarksSearchResultCard from './TrademarksSearchResultCard';
import trademarkSample from '../../../testing-resources/trademarks/sampleTrademark.json';

const TrademarksSearchResultCards = ({
  data,
  query, setActiveDocument, activeDocument, selectedView,
}) => (
  <>
    {data.data.map((searchResult) => (
      <TrademarksSearchResultCard
        key={trademarkSample.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
        setActiveDocument={setActiveDocument}
        activeDocument={activeDocument}
        selectedView={selectedView}
        highlightWords={data.highlighting || []}
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
