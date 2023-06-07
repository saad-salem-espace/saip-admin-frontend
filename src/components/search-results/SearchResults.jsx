import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import AppPopover from 'components/shared/app-popover/AppPopover';
import * as Yup from 'yup';
import Select from 'components/shared/form/select/Select';
import ToggleButton from 'components/shared/toggle-button/ToggleButton';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import 'components/shared/form/form.scss';
import { useAuth } from 'react-oidc-context';
import SharedSearch from 'components/workstream-search/shared/SharedSearch';
import emptyState from 'assets/images/search-empty-state.svg';
import EmptyState from 'components/shared/empty-state/EmptyState';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import advancedSearchApi from 'apis/search/advancedSearchApi';
import { parseSingleQuery } from 'utils/search-query/encoder';
import { BsQuestionCircle } from 'react-icons/bs';
import SaveQuery from 'components/save-query/SaveQuery';
import { LIMITS, executeAfterLimitValidation } from 'utils/manageLimits';
import useIndexedDbWrapper from 'hooks/useIndexedDbWrapper';
import { tableNames } from 'dbConfig';
import SelectedWorkStreamIdContext from 'contexts/SelectedWorkStreamIdContext';
import SearchNote from './SearchNote';
import IprDetails from '../ipr-details/IprDetails';

import './style.scss';
import style from '../shared/form/search/style.module.scss';
import { defaultConditions, parseQuery, reformatDecoder } from '../../utils/searchQuery';
import AdvancedSearch from '../advanced-search/AdvancedSearch';
import { decodeQuery } from '../../utils/search-query/decoder';
import SearchResultCards from './search-result-cards/SearchResultCards';
import TrademarksSearchResultCards from './trademarks-search-result-cards/TrademarksSearchResultCards';
import validationMessages from '../../utils/validationMessages';
import IndustrialDesignResultCards from './industrial-design/IndustrialDesignResultCards';

function SearchResults({ showFocusArea }) {
  const { t, i18n } = useTranslation('search');
  const { setWorkStreamId } = useContext(SelectedWorkStreamIdContext);
  const currentLang = i18n.language;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(true);
  const [isEnabledSynonyms, setIsEnabledSynonyms] = useState(false);
  const [activeWorkstream, setActiveWorkstream] = useState(searchParams.get('workstreamId'));
  const [isAdvancedMenuOpen, setIsAdvancedMenuOpen] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState({ label: t('detailed'), value: 'detailed' });
  const [searchFields, setSearchFields] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [imageName, setImageName] = useState(null);
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const submitRef = useRef();
  const [sortBy, setSortBy] = useState({ label: t('mostRelevant'), value: 'mostRelevant' });
  const [isQuerySaved, setIsQuerySaved] = useState(false);
  const auth = useAuth();
  const saveSearchHistoryIDB = useIndexedDbWrapper(tableNames.saveHistory);
  const { getInstanceByIndex } = useIndexedDbWrapper(tableNames.savedQuery);
  const isSearchSubmitted = Number(localStorage.getItem('isSearchSubmitted') || 0);

  const searchResultParams = {
    workstreamId: searchParams.get('workstreamId'),
    query: searchParams.get('q'),
    ...(searchParams.get('imageName') && { imageName: searchParams.get('imageName') }),
    ...(searchParams.get('enableSynonyms') && { enableSynonyms: searchParams.get('enableSynonyms') }),
  };

  const saveQueryParamsForDoc = {
    workStreamId: searchParams.get('workstreamId'),
    query: searchParams.get('q'),
    resultCount: totalResults.toString(),
    enableSynonyms: (searchParams.get('enableSynonyms') === 'true'),
    documentId: JSON.parse(localStorage.getItem('FocusDoc'))?.doc?.filingNumber,
    fav: isQuerySaved,
  };

  const saveQueryParams = auth.isAuthenticated ? {
    workStreamId: searchParams.get('workstreamId'),
    query: searchParams.get('q'),
    resultCount: totalResults.toString(),
    enableSynonyms: (searchParams.get('enableSynonyms') === 'true'),
    workstreamKey: 'workStreamId',
    documentId: null,
    fav: true,
  } : {
    workstreamId: searchParams.get('workstreamId'),
    queryString: searchParams.get('q'),
    resultCount: totalResults.toString(),
    synonymous: (searchParams.get('enableSynonyms') ?? 'false'),
    workstreamKey: 'workstreamId',
    documentId: null,
    fav: true,
  };

  const sortByOptionsPatent = [
    {
      label: t('mostRelevant'),
      value: 'mostRelevant',
    },
    {
      label: t('publicationDateAsc'),
      value: 'publicationDateAsc',
    },
    {
      label: t('publicationDateDesc'),
      value: 'publicationDateDesc',
    },
  ];

  const sortByPublicationAndFilingDate = [
    {
      label: t('mostRelevant'),
      value: 'mostRelevant',
    },
    {
      label: t('publicationDateAsc'),
      value: 'publicationDateAsc',
    },
    {
      label: t('publicationDateDesc'),
      value: 'publicationDateDesc',
    },
    {
      label: t('filingDateAsc'),
      value: 'filingDateAsc',
    },
    {
      label: t('filingDateDesc'),
      value: 'filingDateDesc',
    },
  ];

  const map = new Map();
  map.set(1, sortByOptionsPatent);
  map.set(2, sortByPublicationAndFilingDate);
  map.set(3, sortByPublicationAndFilingDate);

  const getSortOptions = (workstreamId) => map.get(parseInt(workstreamId, 10));

  const getSortFromUrl = (workstreamId, sortValue) => {
    if (!workstreamId || !sortValue) return sortByOptionsPatent[0]; // default return most relevant

    const workstreamSortOptions = map.get(parseInt(workstreamId, 10));

    const currentOption = workstreamSortOptions.find((element) => element.value === sortValue);

    return (currentOption || sortByOptionsPatent[0]);
  };

  useEffect(() => {
    localStorage.setItem('isSearchSubmitted', (isSearchSubmitted + 1).toString());
    if (!auth.isAuthenticated) {
      getInstanceByIndex({
        indexName: 'query',
        indexValue: searchParams.get('q'),
        onSuccess: (resp) => { setIsQuerySaved(!!resp); },
        onError: () => { setIsQuerySaved(false); },
      });
    } else {
      setIsQuerySaved(results?.isFavourite);
    }
  }, [results]);

  const { cachedRequests } = useContext(CacheContext);
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });

  const [searchQuery, setSearchQuery] = useState('');

  const getNextDocument = () => {
    if (!results || !activeDocument) return null;
    const index = results.data.findLastIndex(
      (element) => element.BibliographicData.FilingNumber === activeDocument,
    );
    return (index === results.data.length - 1
      ? null : results.data[index + 1].BibliographicData.FilingNumber);
  };

  const getPreviousDocument = () => {
    if (!results || !activeDocument) return null;

    const index = results.data.findIndex(
      (element) => element.BibliographicData.FilingNumber === activeDocument,
    );
    return (index === 0 ? null : results.data[index - 1].BibliographicData.FilingNumber);
  };

  const [searchIdentifiers] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${searchResultParams.workstreamId}/identifiers` });
  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  useEffect(() => {
    setSelectedOption(searchIdentifiers?.[0]);
  }, [searchIdentifiers]);

  useEffect(() => {
    setWorkStreamId(searchParams.get('workstreamId'));
  }, []);
  // const options = [
  //   {
  //     key: '1',
  //     value: 'any field',
  //   },
  //   {
  //     key: '2',
  //     value: 'Int. Classification(IPC)',
  //   },
  // ];
  const saveHistoryParams = {
    workstreamId: searchParams.get('workstreamId'),
    queryString: searchParams.get('q'),
    synonymous: (searchParams.get('enableSynonyms') ?? 'false'),
    workstreamKey: 'workstreamId',
    documentId: null,
    fav: true,
  };
  const saveHistory = () => {
    if (!auth.isAuthenticated) {
      const workstreamId = saveHistoryParams[saveHistoryParams.workstreamKey];
      saveSearchHistoryIDB.countAllByIndexName(
        { indexName: saveHistoryParams.workstreamKey, indexValue: workstreamId },
      ).then((count) => (
        executeAfterLimitValidation(
          {
            data: { workstreamId: activeWorkstream, code: LIMITS.SEARCH_HISTORY_LIMIT, count },
            onSuccess: () => {
              saveSearchHistoryIDB.addInstanceToDb({
                data: saveHistoryParams,
              });
            },
            // onRichLimit: (limit) => { console.log('limit'); },
          },
        )));
    }
  };
  useEffect(() => {
    saveHistory();
  }, []);
  const onSubmit = (values) => {
    saveHistory();
    setActiveDocument(null);
    setIsIPRExpanded(false);
    if (!isAdvancedSearch) {
      let simpleQuery = null;
      if (selectedOption.identifierType !== 'Date') simpleQuery = values.searchQuery.trim();
      else simpleQuery = values.searchQuery;

      const defaultCondition = (defaultConditions.get(selectedOption.identifierType));

      const query = parseSingleQuery({
        identifier: selectedOption,
        condition: { optionParserName: defaultCondition },
        data: simpleQuery,
      }, 0, true);
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          workstreamId: values.selectedWorkstream.value, sort: 'mostRelevant', q: (simpleQuery ? query : ''), ...(imageName && { imageName }),
        })}`,
      });
    } else {
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          workstreamId: values.selectedWorkstream.value,
          q: values.searchQuery,
          ...(imageName && { imageName }),
          enableSynonyms: isEnabledSynonyms,
          sort: sortBy.value,
          page: 1,
        })}`,
      });
    }
  };

  useEffect(() => {
    if (searchIdentifiers) {
      const decodedQuery = decodeQuery(searchResultParams.query);
      const searchIdentifiersData = searchIdentifiers.data;
      const reformattedDecoder = reformatDecoder(searchIdentifiers.data, decodedQuery);
      setSearchFields(reformattedDecoder.length ? reformattedDecoder : [{
        id: 1, data: '', identifier: searchIdentifiersData[0], condition: searchIdentifiersData[0].identifierOptions[0], operator: '',
      }]);
    }
  }, [searchResultParams.query, searchIdentifiers]);

  useEffect(() => {
    // eslint-disable-next-line
    const regexPattern = new RegExp('true');
    setIsEnabledSynonyms(regexPattern.test(searchParams.get('enableSynonyms')));
    setSearchQuery(searchResultParams.query);
    const keywords = parseQuery(searchFields, searchParams.get('imageName'), false, currentLang);
    if (keywords) {
      setSearchKeywords(keywords);
    }
  }, [searchFields, searchParams, currentLang, searchResultParams.query]);

  const resetSearch = (workstreamId) => {
    setActiveWorkstream(workstreamId.toString());
    const searchIdentifiersData = searchIdentifiers.data;
    setSearchFields([{
      id: workstreamId, data: '', identifier: searchIdentifiersData[0], condition: searchIdentifiersData[0].identifierOptions[0], operator: '',
    }]);
  };
  function workstreamName(workstream) {
    return currentLang === 'ar' ? workstream.workstreamNameAr : workstream.workstreamName;
  }
  const WorkStreamsOptions = workstreams?.data?.map((workstream) => ({
    label: workstreamName(workstream),
    value: workstream.id,
  }));

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };

  const toggleAdvancedSearchMenu = () => {
    setIsAdvancedMenuOpen(!isAdvancedMenuOpen);
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  const getIprClassName = (media) => {
    let size = 4;
    if (media === 'xxl' && isIPRExpanded) {
      size = 12;
      if (isAdvancedSearch) {
        size = isAdvancedMenuOpen ? 9 : 11;
      } else {
        size = 11;
      }
    }
    if (media === 'xl' && isIPRExpanded) {
      size = 12;
      if (isAdvancedSearch) {
        size = isAdvancedMenuOpen ? 8 : 11;
      } else {
        size = 11;
      }
    }
    return size;
  };
  const getSearchResultsClassName = (media) => {
    let size = 5;
    if (media === 'xxl') {
      if (isAdvancedSearch) {
        if (!totalResults) {
          size = 9;
        }
        if (!isAdvancedMenuOpen) {
          if (totalResults) {
            size = 7;
          } else {
            size = 11;
          }
        }
      } else if (totalResults) {
        size = 7;
        if (isIPRExpanded) {
          size = 4;
        }
      } else {
        size = 11;
      }
    }
    if (media === 'xl') {
      size = 4;
      if (isAdvancedSearch) {
        if (!totalResults) {
          size = 8;
        }
        if (!isAdvancedMenuOpen) {
          if (totalResults) {
            size = 7;
          } else {
            size = 10;
          }
        }
      } else if (totalResults) {
        size = 7;
      } else {
        size = 10;
      }
    }
    return size;
  };

  const viewOptions = [
    {
      label: t('detailed'),
      value: 'detailed',
    },
    {
      label: t('summary'),
      value: 'summary',
    },
    {
      label: t('compact'),
      value: 'compact',
    },
  ];

  const onChangeView = (i) => {
    setSelectedView(i);
  };

  const onChangeSortBy = (sortCriteria) => {
    searchParams.set('sort', sortCriteria.value);
    setSearchParams(searchParams);
    setSortBy(sortCriteria);
  };

  const axiosConfig = advancedSearchApi(searchResultParams);

  const searchResult = {
    1: SearchResultCards,
    2: TrademarksSearchResultCards,
    3: IndustrialDesignResultCards,
  };

  const formSchema = Yup.object({
    searchQuery: Yup.mixed()
      .test('Is not empty', validationMessages.search.required, (data) => (
        (imageName || data)
      )),
  });
  useEffect(() => {
    document.body.classList.add('search-result-wrapper');
    return () => {
      document.body.classList.remove('search-result-wrapper');
    };
  }, []);

  useEffect(() => {
    setSortBy(getSortFromUrl(searchParams.get('workstreamId'), searchParams.get('sort')));
    setSelectedView(viewOptions.find((temp) => temp.value === selectedView.value));
  }, [currentLang]);

  return (
    <Container fluid className="px-0 workStreamResults">
      <Row className="mx-0 header">
        <Col md={10} className="mb-8 position-relative mx-auto">
          <Formik
            innerRef={submitRef}
            enableReinitialize
            onSubmit={onSubmit}
            validationSchema={formSchema}
            initialValues={{
              searchQuery,
              selectedWorkstream: WorkStreamsOptions?.find(
                (element) => element.value.toString() === activeWorkstream,
              ),
            }}
          >
            {({
              setFieldValue, handleSubmit, values, setTouched, setErrors,
            }) => (
              <Form onSubmit={handleSubmit} className="mt-8">
                <div className="d-lg-flex align-items-start">
                  <div className="d-flex mb-lg-0 mb-3">
                    <h4 className="mb-0 mt-4">{t('search')}</h4>
                    <Select
                      options={WorkStreamsOptions}
                      moduleClassName="menu"
                      selectedOption={values.selectedWorkstream}
                      className="workStreams ms-3 mt-1 customSelect w-px-300"
                      setSelectedOption={(data) => {
                        setFieldValue('selectedWorkstream', data); setFieldValue('searchQuery', '');
                        resetSearch(data?.value);
                        setWorkStreamId(data?.value);
                      }}
                    />
                  </div>
                  <SharedSearch
                    setFieldValue={setFieldValue}
                    values={values}
                    setErrors={setErrors}
                    setTouched={setTouched}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    isAdvanced={isAdvancedSearch}
                    className={`${style.searchResultsView} search-results-view`}
                    selectedWorkStream={values.selectedWorkstream?.value}
                    setImageName={setImageName}
                    isImgUploaded={isImgUploaded}
                    setIsImgUploaded={setIsImgUploaded}
                    resultsView
                  >
                    <div className="d-md-flex mt-4">
                      <div className="d-flex align-items-center me-4">
                        <ToggleButton
                          handleToggleButton={() => {
                            setIsAdvancedSearch((isAdvanced) => !isAdvanced);
                            setIsAdvancedMenuOpen((isAdvancedMenu) => !isAdvancedMenu);
                          }}
                          isToggleButtonOn={isAdvancedSearch}
                          text={t('advancedSearch')}
                          className="border-md-end mb-md-0 mb-2"
                        />
                        <AppPopover
                          Title={t('tips:advancedSearchTipTitle')}
                          id="advancedSearchTip"
                          btnText={t('common:gotIt')}
                          variant="app-bg-primary-10"
                          popoverTrigger={
                            <Button variant="link" className="btn-view-tip">
                              <BsQuestionCircle className="app-text-primary" />
                            </Button>
                          }
                        >
                          <Trans
                            i18nKey="advancedSearchTipContent"
                            ns="tips"
                            components={{ bold: <b />, break: <br /> }}
                          />
                        </AppPopover>
                      </div>
                      <div className="d-flex align-items-center">
                        <ToggleButton
                          handleToggleButton={() => setIsEnabledSynonyms(!isEnabledSynonyms)}
                          isToggleButtonOn={isEnabledSynonyms}
                          text={t('allowSynonyms')}
                        />
                        <AppPopover
                          Title={t('tips:allowSynonymsTipTitle')}
                          id="allowSynonymsTip"
                          btnText={t('common:gotIt')}
                          variant="app-bg-primary-10"
                          popoverTrigger={
                            <Button variant="link" className="btn-view-tip">
                              <BsQuestionCircle className="app-text-primary" />
                            </Button>
                          }
                        >
                          <Trans
                            i18nKey="allowSynonymsTipContent"
                            ns="tips"
                            components={{ bold: <b />, break: <br /> }}
                          />
                        </AppPopover>
                      </div>
                    </div>
                  </SharedSearch>
                </div>

              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row className="border-top mx-0 align-items-stretch content">
        <Col xxl={isAdvancedMenuOpen ? 3 : 1} xl={isAdvancedMenuOpen ? 4 : 1} className={`${isAdvancedMenuOpen ? 'expanded' : 'closed'} ps-0`}>
          <AdvancedSearch
            toggleAdvancedSearchMenu={toggleAdvancedSearchMenu}
            defaultInitializers={searchFields}
            isAdvancedMenuOpen={isAdvancedMenuOpen}
            submitRef={submitRef}
            workstreamId={activeWorkstream}
            firstIdentifierStr={searchResultParams.identifierStrId}
            onChangeSearchQuery={setSearchQuery}
          />
        </Col>
        <Col xxl={getSearchResultsClassName('xxl')} xl={getSearchResultsClassName('xl')} md={6} className={`mt-8 search-result fixed-panel-scrolled ${isIPRExpanded ? 'd-none' : 'd-block'}`}>
          <div className="d-lg-flex align-items-center">
            <SaveQuery
              setIsSaved={setIsQuerySaved}
              isSaved={isQuerySaved}
              saveQueryParams={saveQueryParams}
              isReady={!isLoading}
              limitCode={LIMITS.SAVED_QUERY_LIMIT}
              showFocusArea={showFocusArea}
              saveQueryParamsForDoc={saveQueryParamsForDoc}
            />
            <div>
              <SearchNote
                searchKeywords={searchKeywords}
                resultsCount={totalResults}
              />
            </div>
          </div>
          <Formik>
            {() => (
              <Form className="mt-12">
                {
                  totalResults !== 0 && (
                    <div className="d-md-flex">
                      <div className="position-relative mb-6 viewSelect me-md-6">
                        <span className="position-absolute f-12 saip-label select2">{t('view')}</span>
                        <Select
                          options={viewOptions}
                          setSelectedOption={onChangeView}
                          selectedOption={selectedView}
                          defaultValue={selectedView}
                          id="viewSection"
                          fieldName="viewSection"
                          className="mb-md-0 mb-3 select-2"
                        />
                      </div>
                      <div className="position-relative mb-8 sortBy">
                        <span className="position-absolute f-12 saip-label select2">{t('sortBy')}</span>
                        <Select
                          options={getSortOptions(searchResultParams.workstreamId)}
                          setSelectedOption={onChangeSortBy}
                          selectedOption={sortBy}
                          defaultValue={sortBy}
                          id="sortBy"
                          fieldName="sortBy"
                          className="select-2"
                        />
                      </div>
                    </div>
                  )
                }
                <AppPagination
                  PaginationWrapper="col-10"
                  className="p-0 paginate-ipr"
                  axiosConfig={axiosConfig}
                  defaultPage={Number(searchParams.get('page') || '1')}
                  setResults={setResults}
                  sort={sortBy.value}
                  isFetching={setIsLoading}
                  RenderedComponent={searchResult[searchResultParams.workstreamId]}
                  renderedProps={{
                    query: searchResultParams.query,
                    setActiveDocument,
                    activeDocument,
                    selectedView,
                  }}
                  fetchedTotalResults={setTotalResults}
                  emptyState={(
                    <EmptyState
                      title={t('emptyStateTitle')}
                      msg={t('emptyStateMsg')}
                      img={emptyState}
                      className="mt-18"
                    />)}
                  onPageChange={() => {
                    setActiveDocument(null);
                    setIsIPRExpanded(false);
                  }}
                  updateDependencies={[...Object.values(searchResultParams)]}
                />
              </Form>
            )}
          </Formik>
        </Col>
        {activeDocument && (
          <Col xxl={getIprClassName('xxl')} xl={getIprClassName('xl')} lg={isIPRExpanded ? 12 : 5} md={isIPRExpanded ? 12 : 6} className="px-0 border-start">
            <IprDetails
              collapseIPR={collapseIPR}
              isIPRExpanded={isIPRExpanded}
              documentId={activeDocument}
              onClose={handleCloseIprDetail}
              getNextDocument={getNextDocument}
              getPreviousDocument={getPreviousDocument}
              setActiveDocument={setActiveDocument}
              fromFocusArea={false}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

SearchResults.propTypes = {
  showFocusArea: PropTypes.bool.isRequired,
};
export default SearchResults;
