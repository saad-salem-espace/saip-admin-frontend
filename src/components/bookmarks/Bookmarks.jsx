import getBookmarksApi from 'apis/bookmarks/getBookmarksApi';
import { useSearchParams } from 'react-router-dom';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import NoData from 'components/shared/empty-states/NoData';
import SearchResultCards from 'components/search-results/search-result-cards/SearchResultCards';
import TrademarksSearchResultCards from 'components/search-results/trademarks-search-result-cards/TrademarksSearchResultCards';
import IndustrialDesignResultCards from 'components/search-results/industrial-design/IndustrialDesignResultCards';
import { useState, useContext } from 'react';
import IprDetails from 'components/ipr-details/IprDetails';
import { Formik } from 'formik';
import i18n from 'i18next';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';

const Bookmarks = () => {
  const currentLang = i18n.language;
  const [searchParams] = useSearchParams();
  const axiosConfig = getBookmarksApi('1', 0, Number(searchParams.get('page') || '1'), true);
  const [activeDocument, setActiveDocument] = useState(null);
  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const [results, setResults] = useState(null);
  const { cachedRequests } = useContext(CacheContext);
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });

  function workstreamName(workstream) {
    return currentLang === 'ar' ? workstream.workstreamNameAr : workstream.workstreamName;
  }
  const WorkStreamsOptions = workstreams?.data?.map((workstream) => ({
    label: workstreamName(workstream),
    value: workstream.id,
  }));
  console.log(WorkStreamsOptions);
  const getNextDocument = () => {
    if (!results || !activeDocument) return null;
    const index = results.findLastIndex(
      (element) => element.data.BibliographicData.FilingNumber === activeDocument,
    );
    return (index === results.length - 1
      ? null : results[index + 1].data.BibliographicData.FilingNumber);
  };

  const getPreviousDocument = () => {
    if (!results || !activeDocument) return null;

    const index = results.findIndex(
      (element) => element.data.BibliographicData.FilingNumber === activeDocument,
    );
    return (index === 0 ? null : results[index - 1].data.BibliographicData.FilingNumber);
  };

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
          setResults={setResults}
          renderedProps={{
            selectedView,
            setActiveDocument,
            activeDocument,
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
            getPreviousDocument={getPreviousDocument}
            getNextDocument={getNextDocument}
          />
        </div>
        )}
      </>
    </Formik>
  );
};

export default Bookmarks;
