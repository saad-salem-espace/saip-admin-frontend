import PropTypes from 'prop-types';
import trademarkSample from '../../../testing-resources/trademarks/sampleTrademark.json';
import PlantVarietyResultCard from './PlantVarietyResultCard';

const PlantVarietyResultCards = ({
  data,
  query, setActiveDocument, activeDocument,
  selectedView, hasCustomData, customData, disableCheckbox,
}) => {
  const searchResultData = hasCustomData ? (customData || []) : data.data;
  if (!searchResultData.length) return null;

  return (
    <>
      {searchResultData.map((searchResult) => (
        <PlantVarietyResultCard
          key={trademarkSample.BibliographicData.filingNumber}
          searchResult={searchResult}
          query={query}
          setActiveDocument={setActiveDocument}
          activeDocument={activeDocument}
          selectedView={selectedView}
          highlightWords={data.highlighting || []}
          disableCheckbox={disableCheckbox}
        />
      ))}
    </>
  );
};

PlantVarietyResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.string.isRequired,
  hasCustomData: PropTypes.bool,
  disableCheckbox: PropTypes.bool,
  customData: PropTypes.arrayOf(Object),
};

PlantVarietyResultCards.defaultProps = {
  hasCustomData: false,
  customData: [],
  disableCheckbox: false,
};

export default PlantVarietyResultCards;
