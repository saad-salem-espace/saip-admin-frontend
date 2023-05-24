import PropTypes from 'prop-types';
import IndustrialDesignResultCard from './IndustrialDesignResultCard';

const IndustrialDesignResultCards = ({
  data,
  query, setActiveDocument, activeDocument, selectedView,
}) => (
  <>
    {data.data.map((searchResult) => (
      <IndustrialDesignResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
        setActiveDocument={setActiveDocument}
        activeDocument={activeDocument}
        highlightWords={data.highlighting || []}
        selectedView={selectedView}
      />
    ))}
  </>
);

IndustrialDesignResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default IndustrialDesignResultCards;
