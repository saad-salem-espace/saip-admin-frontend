import PropTypes from 'prop-types';
import SearchResultCard from './search-result-card/SearchResultCard';

const SearchResultCards = ({
  data, query, setActiveDocument, activeDocument, selectedView, bookmarks,
}) => (
  <div>
    {!bookmarks ? data.data.map((searchResult) => (
      <SearchResultCard
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
        <SearchResultCard
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

SearchResultCards.propTypes = {
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

SearchResultCards.defaultProps = {
  bookmarks: false,
};

export default SearchResultCards;
