import getBookmarksApi from 'apis/bookmarks/getBookmarksApi';
import { useSearchParams } from 'react-router-dom';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import NoData from 'components/shared/empty-states/NoData';
import SearchResultCards from 'components/search-results/search-result-cards/SearchResultCards';
import TrademarksSearchResultCards from 'components/search-results/trademarks-search-result-cards/TrademarksSearchResultCards';
import IndustrialDesignResultCards from 'components/search-results/industrial-design/IndustrialDesignResultCards';
import { useState } from 'react';
import IprDetails from 'components/ipr-details/IprDetails';
import { Formik } from 'formik';

const Bookmarks = () => {
  const [searchParams] = useSearchParams();
  const axiosConfig = getBookmarksApi('1', 0, Number(searchParams.get('page') || '1'), true);
  const [activeDocument, setActiveDocument] = useState(null);
  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const prepareBookmarks = (response) => {
    if (!response) return null;

    const bookmarks = [];
    response.map((bookmark) => bookmarks.push(bookmark.data));

    return { data: bookmarks };
  };

  const searchResult = {
    1: SearchResultCards,
    2: TrademarksSearchResultCards,
    3: IndustrialDesignResultCards,
  };

  const selectedView = {
    value: 'detailed',
  };

  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };

  return (
    <Formik>
      <>
        <h3>Bookmarks</h3>
        <AppPagination
          className="mt-8"
          axiosConfig={axiosConfig}
          defaultPage={Number(searchParams.get('page') || '1')}
          RenderedComponent={searchResult[1]}
          emptyState={<NoData />}
          bookmarks
          bookmarkData={prepareBookmarks}
          renderedProps={{
            selectedView,
            setActiveDocument,
          }}
        />
        {activeDocument && (
        <div className="position-relative">
          <IprDetails
            collapseIPR={collapseIPR}
            isIPRExpanded={isIPRExpanded}
            documentId={activeDocument}
            onClose={handleCloseIprDetail}
            fromFocusArea={false}
            setActiveDocument={setActiveDocument}
            activeWorkstream={1}
          />
        </div>
        )}
      </>
    </Formik>
  );
};

export default Bookmarks;
