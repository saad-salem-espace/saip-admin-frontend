import getBookmarksApi from 'apis/bookmarks/getBookmarksApi';
import { useTranslation } from 'react-i18next';
import Select from 'components/shared/form/select/Select';
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
import IndexedDbAppPagination from 'components/shared/app-pagination/IndexedDbAppPagination';
import useAuth from 'hooks/useAuth';
import { tableNames } from 'dbConfig';
import { Container, Row, Col } from 'react-bootstrap';

const BookmarkList = () => {
  const { t } = useTranslation();
  const currentLang = i18n.language;
  const [searchParams] = useSearchParams();
  const axiosConfig = getBookmarksApi('1', 0, Number(searchParams.get('page') || '1'), true);
  const [activeDocument, setActiveDocument] = useState(null);
  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const [results, setResults] = useState(null);
  const { cachedRequests } = useContext(CacheContext);
  const auth = useAuth();
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });

  function workstreamName(workstream) {
    return currentLang === 'ar' ? workstream.workstreamNameAr : workstream.workstreamName;
  }
  const WorkStreamsOptions = workstreams?.data?.map((workstream) => ({
    label: workstreamName(workstream),
    value: workstream.id,
  }));
  // console.log(WorkStreamsOptions);
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

  const isAuth = auth && auth.user;

  return (
    <Container fluid>
      <Row className="px-md-19">
        <Col lg={12}>
          <div className="d-flex my-8 p-8 app-bg-primary-01 rounded">
            <h5 className="mb-0 mt-4">{t('layout:navbar.myBookmarks')}</h5>
            <Select
              options={WorkStreamsOptions}
              moduleClassName="menu"
              // selectedOption={selectedWorkStream}
              // setSelectedOption={onChangeWorkStream}
              className="workStreams ms-3 mt-1 customSelect"
            />
          </div>
        </Col>
      </Row>
      <Row className="px-md-19">
        <Col lg={7} className={`${isIPRExpanded ? 'd-none' : 'd-block'}`}>
          <Formik>
            {isAuth ? <AppPagination
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
              : <IndexedDbAppPagination
                  className="mt-8"
                  tableName={tableNames.bookmarks}
                  RenderedComponent={searchResult[1]}
                  indexMethod="indexByIndexName"
                  defaultPage={Number(searchParams.get('page') || '1')}
                  workstreamId="1"
                  emptyState={<NoData />}
                  indexMethodProps={{
                    sorted: 'desc',
                    sortedIndexName: 'updatedAt',
                    indexName: 'workstreamId',
                    indexValue: '1',
                  }}
                  renderedProps={{
                    selectedView,
                    setActiveDocument,
                    activeDocument,
                  }}
                  bookmarks
              />}
          </Formik>
        </Col>
        <Col lg={isIPRExpanded ? 12 : 5} className={`${isIPRExpanded ? '' : 'border-start'}`}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default BookmarkList;
