import PropTypes from 'prop-types';
import IndustrialDesignResultCard from './IndustrialDesignResultCard';

const IndustrialDesignResultCards = ({
  data,
  query, setActiveDocument, activeDocument, selectedView,
  bookmarks,
}) => (
  <div>
    {!bookmarks ? data.data.map((searchResult) => (
      <IndustrialDesignResultCard
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
        <IndustrialDesignResultCard
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

IndustrialDesignResultCards.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  bookmarks: PropTypes.bool,
};

IndustrialDesignResultCards.defaultProps = {
  bookmarks: false,
};

export default IndustrialDesignResultCards;
