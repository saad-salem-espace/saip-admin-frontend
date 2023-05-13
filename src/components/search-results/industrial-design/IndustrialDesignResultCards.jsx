import PropTypes from 'prop-types';
import IndustrialDesignResultCard from './IndustrialDesignResultCard';
import trademarkSample from '../../../testing-resources/trademarks/sampleTrademark.json';

const IndustrialDesignResultCards = ({
  data,
  query, setActiveDocument, activeDocument, selectedView,
}) => (
  <>
    {data.data.map((searchResult) => (
      <IndustrialDesignResultCard
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

IndustrialDesignResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.string.isRequired,
};

export default IndustrialDesignResultCards;
