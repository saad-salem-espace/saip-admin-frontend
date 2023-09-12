import getBookmarksApi from 'apis/bookmarks/getBookmarksApi';
import { useTranslation } from 'react-i18next';
import Select from 'components/shared/form/select/Select';
import { useSearchParams } from 'react-router-dom';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import NoData from 'components/shared/empty-states/NoData';
import SearchResultCards from 'components/search-results/search-result-cards/SearchResultCards';
import TrademarksSearchResultCards from 'components/search-results/trademarks-search-result-cards/TrademarksSearchResultCards';
import IndustrialDesignResultCards from 'components/search-results/industrial-design/IndustrialDesignResultCards';
import {
  useState, useContext, useEffect, useRef,
} from 'react';
import IprDetails from 'components/ipr-details/IprDetails';
import { Formik } from 'formik';
import i18n from 'i18next';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import IndexedDbAppPagination from 'components/shared/app-pagination/IndexedDbAppPagination';
import useAuth from 'hooks/useAuth';
import { tableNames } from 'dbConfig';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'components/shared/spinner/Spinner';
import useAxios from 'hooks/useAxios';
import { sortWorkstreams } from 'utils/objects';
import getBookmarksLocalUser from 'apis/bookmarks/getBookmarksLocalUser';
import exportSearchResultsValidationSchema from '../search-results/exportSearchResultsValidationSchema';
import ExportSearchResults from '../search-results/ExportSearchResults';
import DecisionsResultCards from '../search-results/decisions-result-cards/DecisionsResultCards';
import CopyrightsResultCards from '../search-results/copyrights-result-cards/CopyrightsResultCards';
import PlantVarietyResultCards from '../search-results/plant-variety-result-cards/PlantVarietyResultCards';
import IcLayoutsResultCards from '../search-results/ic-layouts-result-cards/IcLayoutsResultCards';

const BookmarkList = () => {
  const currentLang = i18n.language;
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [activeDocument, setActiveDocument] = useState(null);
  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const [results, setResults] = useState(null);
  const [bookmarkResult, setBookmarkResult] = useState([]);
  const { cachedRequests } = useContext(CacheContext);
  const { isAuthenticated } = useAuth();
  const [pageReset, setPageReset] = useState(0);
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });
  const [selectedWorkStream, setSelectedWorkStream] = useState(null);
  const isMounted = useRef(false);

  const [, executeLocalBookmarks] = useAxios(getBookmarksLocalUser({}, true), { manual: true });

  const axiosConfig = getBookmarksApi(selectedWorkStream?.value, 0, true);

  function workstreamName(workstream) {
    return t(`workstreams:${workstream.workstreamName.replace(/\s/g, '')}`);
  }
  const WorkStreamsOptions = sortWorkstreams(workstreams?.data)?.map((workstream) => ({
    label: workstreamName(workstream),
    value: workstream.id,
  }));

  const getNextDocument = () => {
    if (!bookmarkResult.length || !activeDocument) return null;
    const index = bookmarkResult.findLastIndex(
      (element) => element.BibliographicData.FilingNumber === activeDocument,
    );
    return (index === bookmarkResult.length - 1
      ? null : bookmarkResult[index + 1].BibliographicData.FilingNumber);
  };

  const getPreviousDocument = () => {
    if (!bookmarkResult.length || !activeDocument) return null;

    const index = bookmarkResult.findIndex(
      (element) => element.BibliographicData.FilingNumber === activeDocument,
    );
    return (index === 0 ? null : bookmarkResult[index - 1].BibliographicData.FilingNumber);
  };

  const searchResult = {
    1: SearchResultCards,
    2: TrademarksSearchResultCards,
    3: IndustrialDesignResultCards,
    4: DecisionsResultCards,
    5: CopyrightsResultCards,
    6: PlantVarietyResultCards,
    7: IcLayoutsResultCards,
  };

  const selectedView = {
    value: 'detailed',
  };

  const prepareAuthBookamrks = (response) => {
    const bookmarks = [];
    if (!response) return bookmarks;
    response.map((res) => bookmarks.push(res?.data));

    return bookmarks;
  };

  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  const resetPageNumber = () => {
    setPageReset((prev) => prev + 1);
  };

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };

  const onChangeWorkStream = (i) => {
    handleCloseIprDetail();
    setSelectedWorkStream(WorkStreamsOptions?.find(
      (element) => element.value === i.value,
    ));
    resetPageNumber();
  };

  useEffect(() => {
    if (WorkStreamsOptions?.length) {
      setSelectedWorkStream(WorkStreamsOptions[0]);
      isMounted.current = true;
    }
  }, [workstreams]);

  useEffect(() => {
    if (!WorkStreamsOptions) return;
    setSelectedWorkStream(WorkStreamsOptions.find(
      (temp) => temp.value === selectedWorkStream.value,
    ));
  }, [currentLang]);

  useEffect(() => {
    setBookmarkResult([]);
    if (results) {
      if (!isAuthenticated) {
        executeLocalBookmarks(getBookmarksLocalUser({
          workstreamId: selectedWorkStream?.value,
          filingNumbers: results.map((bookmark) => bookmark.filingNumber),
        }, true)).then((response) => {
          setBookmarkResult(response.data?.data);
        });
      } else {
        setBookmarkResult(prepareAuthBookamrks(results));
      }
    }
  }, [results]);

  if (!isMounted.current) return <div className="d-flex justify-content-center mt-18"><Spinner /></div>;

  return (
    <Container fluid>
      <Row className="px-md-19">
        <Col lg={12}>
          <div className="d-flex my-8 p-8 app-bg-primary-01 rounded">
            <h5 className="mb-0 mt-4">{t('layout:navbar.myBookmarks')}</h5>
            <Select
              options={WorkStreamsOptions}
              moduleClassName="menu"
              selectedOption={selectedWorkStream}
              setSelectedOption={onChangeWorkStream}
              className="workStreams ms-3 mt-1 customSelect"
            />
          </div>
        </Col>
      </Row>
      <Row className="px-md-19">
        <Col lg={7} className={`${isIPRExpanded ? 'd-none' : 'd-block'}`}>
          <Formik
            initialValues={{ selectedCards: { }, allSelected: false }}
            validationSchema={exportSearchResultsValidationSchema}
          >
            {() => (
              <>
                <ExportSearchResults
                  workstreams={workstreams}
                  workstreamId={selectedWorkStream.value}
                  data={bookmarkResult}
                />
                {isAuthenticated ? (
                  <AppPagination
                    className="mt-8"
                    axiosConfig={axiosConfig}
                    defaultPage={Number(searchParams.get('page') || '1')}
                    RenderedComponent={searchResult[selectedWorkStream?.value]}
                    emptyState={<NoData />}
                    resetPage={pageReset}
                    setResults={setResults}
                    renderedProps={{
                      selectedView,
                      setActiveDocument,
                      activeDocument,
                      hasCustomData: true,
                      customData: bookmarkResult,
                    }}
                    onPageChange={() => {
                      setActiveDocument(null);
                      setIsIPRExpanded(false);
                    }}
                  />
                ) : (
                  <IndexedDbAppPagination
                    className="mt-8"
                    tableName={tableNames.bookmarks}
                    RenderedComponent={searchResult[selectedWorkStream.value]}
                    indexMethod="indexByIndexName"
                    defaultPage={Number(searchParams.get('page') || '1')}
                    workstreamId={selectedWorkStream.value}
                    setResults={setResults}
                    emptyState={<NoData />}
                    indexMethodProps={{
                      sorted: 'desc',
                      sortedIndexName: 'updatedAt',
                      indexName: 'workstreamId',
                      indexValue: selectedWorkStream.value,
                    }}
                    resetPage={pageReset}
                    renderedProps={{
                      selectedView,
                      setActiveDocument,
                      activeDocument,
                      hasCustomData: true,
                      customData: bookmarkResult,
                    }}
                    bookmarks
                    onPageChange={() => {
                      setActiveDocument(null);
                      setIsIPRExpanded(false);
                    }}
                  />
                )}
              </>
            )}
          </Formik>
        </Col>
        <Col lg={isIPRExpanded ? 12 : 5} className={`${!activeDocument ? '' : 'border-start'}`}>
          {activeDocument && (
            <div className="position-relative">
              <IprDetails
                collapseIPR={collapseIPR}
                isIPRExpanded={isIPRExpanded}
                documentId={activeDocument}
                onClose={handleCloseIprDetail}
                fromFocusArea={false}
                setActiveDocument={setActiveDocument}
                activeWorkstream={selectedWorkStream.value}
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
