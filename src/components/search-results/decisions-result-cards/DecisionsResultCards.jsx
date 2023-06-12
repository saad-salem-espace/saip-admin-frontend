import PropTypes from 'prop-types';
import trademarkSample from '../../../testing-resources/trademarks/sampleTrademark.json';
import DecisionsResultCard from './DecisionsResultCard';

const DecisionsResultCards = ({
  data,
  query, setActiveDocument, activeDocument, selectedView,
}) => (
  <>
    {data.data.map((searchResult) => (
      <DecisionsResultCard
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

DecisionsResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.string.isRequired,
};

export default DecisionsResultCards;
