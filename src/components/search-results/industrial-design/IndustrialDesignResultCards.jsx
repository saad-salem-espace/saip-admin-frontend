import PropTypes from 'prop-types';
import IndustrialDesignResultCard from './IndustrialDesignResultCard';

const IndustrialDesignResultCards = ({
  data, query, setActiveDocument, activeDocument, selectedView, hasCustomData, customData,
}) => {
  const searchResultData = hasCustomData ? (customData || []) : data.data;

  if (!searchResultData.length) return null;

  return (
    <div>
      {searchResultData.map((searchResult) => (
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
    </div>
  );
};

IndustrialDesignResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  hasCustomData: PropTypes.bool,
  customData: PropTypes.arrayOf(Object),
};

IndustrialDesignResultCards.defaultProps = {
  hasCustomData: false,
  customData: [],
};

export default IndustrialDesignResultCards;
