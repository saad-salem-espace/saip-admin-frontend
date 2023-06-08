import PropTypes from 'prop-types';
import TrademarksSearchResultCard from './TrademarksSearchResultCard';

const TrademarksSearchResultCards = ({
  data,
  query, setActiveDocument, activeDocument, selectedView,
  bookmarks,
}) => (
  <div>
    {!bookmarks ? data.data.map((searchResult) => (
      <TrademarksSearchResultCard
        key={searchResult.BibliographicData.filingNumber}
        searchResult={searchResult}
        query={query}
        setActiveDocument={setActiveDocument}
        activeDocument={activeDocument}
        highlightWords={data.highlighting || []}
        selectedView={selectedView}
      />
    ))
      : data.map((bookmark) => (
        <TrademarksSearchResultCard
          key={bookmark.id}
          searchResult={bookmark.data}
          query={query}
          setActiveDocument={setActiveDocument}
          activeDocument={activeDocument}
          highlightWords={[]}
          selectedView={selectedView}
        />
      ))}
  </div>
);

TrademarksSearchResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.string.isRequired,
  bookmarks: PropTypes.bool,
};

TrademarksSearchResultCards.defaultProps = {
  bookmarks: false,
};

export default TrademarksSearchResultCards;
