import PropTypes from 'prop-types';
import TrademarksSearchResultCard from './TrademarksSearchResultCard';

const TrademarksSearchResultCards = ({
  data,
  query, setActiveDocument, activeDocument, selectedView, hasCustomData, customData,
}) => {
  const searchResultData = hasCustomData ? (customData || []) : data.data;

  if (!searchResultData.length) return null;

  return (
    <div>
      {searchResultData.map((searchResult) => (
        <TrademarksSearchResultCard
          key={searchResult.BibliographicData.FilingNumber}
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

TrademarksSearchResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.string.isRequired,
  hasCustomData: PropTypes.bool,
  customData: PropTypes.arrayOf(Object),
};

TrademarksSearchResultCards.defaultProps = {
  hasCustomData: false,
  customData: [],
};

export default TrademarksSearchResultCards;
