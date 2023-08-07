import {
  useContext, useEffect, useRef, useState, useMemo,
} from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import {
  createSearchParams, useNavigate, useSearchParams, useLocation,
} from 'react-router-dom';
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
import similarDocSearchApi from 'apis/search/similarDocSearchApi';
import { parseSingleQuery } from 'utils/search-query/encoder';
import { BsQuestionCircle } from 'react-icons/bs';
import SaveQuery from 'components/save-query/SaveQuery';
import useAxios from 'hooks/useAxios';
import { DateObject } from 'react-multi-date-picker';
import { LIMITS, executeAfterLimitValidation } from 'utils/manageLimits';
import useIndexedDbWrapper from 'hooks/useIndexedDbWrapper';
import { tableNames } from 'dbConfig';
import SelectedWorkStreamIdContext from 'contexts/SelectedWorkStreamIdContext';
import getFiltersApi from 'apis/filters/getFiltersApi';
import SearchNote from './SearchNote';
import IprDetails from '../ipr-details/IprDetails';
import Checkbox from '../shared/form/checkboxes/checkbox/Checkbox';
import './style.scss';
import style from '../shared/form/search/style.module.scss';
import {
  defaultConditions,
  convertQueryArrToObjsArr,
  convertQueryStrToArr,
  convertQueryArrToStr,
  convertQueryObjsArrToTransMemo,
  teldaRegex,
  noTeldaRegex,
  wordCountValidation,
  specialCharsValidation,
} from '../../utils/searchQuery';
import AdvancedSearch from '../advanced-search/AdvancedSearch';
import SearchResultCards from './search-result-cards/SearchResultCards';
import TrademarksSearchResultCards from './trademarks-search-result-cards/TrademarksSearchResultCards';
import validationMessages from '../../utils/validationMessages';
import IndustrialDesignResultCards from './industrial-design/IndustrialDesignResultCards';
import DecisionsResultCards from './decisions-result-cards/DecisionsResultCards';
import ExportSearchResults from './ExportSearchResults';
import exportSearchResultsValidationSchema from './exportSearchResultsValidationSchema';
import CopyrightsResultCards from './copyrights-result-cards/CopyrightsResultCards';
import PlantVarietyResultCards from './plant-variety-result-cards/PlantVarietyResultCards';
import IcLayoutsResultCards from './ic-layouts-result-cards/IcLayoutsResultCards';

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
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [filters, setFilters] = useState(null);
  const location = useLocation();
  const [searchFilters, setSearchFilters] = useState([]);
  const [otherSearchParams, setOtherSearchParams] = useState(Object.fromEntries(searchParams));
  const [advancedValidation, setAdvancedValidation] = useState(true);

  const auth = useAuth();
  const { cachedRequests } = useContext(CacheContext);
  const saveSearchHistoryIDB = useIndexedDbWrapper(tableNames.saveHistory);
  const isSearchSubmitted = Number(localStorage.getItem('isSearchSubmitted') || 0);
  const { deleteInstance } = useIndexedDbWrapper(tableNames.saveHistory);
  const { getInstanceByMultiIndex } = useIndexedDbWrapper(tableNames.savedQuery);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q'));
  const [searchIdentifiers] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${searchParams.get('workstreamId')}/identifiers` });
  const docImage = searchParams.get('docImage');
  const similarDocId = searchParams.get('similarDocId');

  const checkFilters = () => {
    if (!searchParams.get('filterEnabled') || searchParams.get('filterEnabled') === 'false') {
      return [];
    }
    if (searchParams.get('filterEnabled') === 'true') return searchFilters;
    return [];
  };
  useEffect(() => {
    setOtherSearchParams(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  const searchResultParams = useMemo(() => ({
    workstreamId: searchParams.get('workstreamId'),
    qArr: convertQueryStrToArr(searchParams.get('q'), searchIdentifiers),
    qString: searchParams.get('q'),
    filters: checkFilters(),
    ...(searchParams.get('imageName') && { imageName: searchParams.get('imageName') }),
    ...(docImage && { docImage }),
    ...(similarDocId && { similarDocId }),
    currentLang,
    ...(searchParams.get('enableSynonyms') && { enableSynonyms: searchParams.get('enableSynonyms') }),
  }), [otherSearchParams, searchIdentifiers, searchFilters]);

  const stringDependencies = useMemo(() => ({
    workstreamId: searchParams.get('workstreamId'),
    qArr: (searchParams.get('q')),
    filters: checkFilters().length ? JSON.stringify(checkFilters()) : '',
    ...(searchParams.get('imageName') && { imageName: searchParams.get('imageName') }),
    ...(docImage && { docImage }),
    ...(similarDocId && { similarDocId }),
    ...(searchParams.get('enableSynonyms') && { enableSynonyms: searchParams.get('enableSynonyms') }),
  }), [otherSearchParams, searchIdentifiers, searchFilters]);

  const getFilterParams = {
    workstreamId: searchParams.get('workstreamId'),
  };
  const getFilterConfig = getFiltersApi(getFilterParams, true);
  const [filtersData, executeFilters] = useAxios(
    getFilterConfig,
    { manual: true },
  );

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

  const sortByOptionsDecisions = [
    {
      label: t('mostRelevant'),
      value: 'mostRelevant',
    },
    {
      label: t('decisions.decisionDateAsc'),
      value: 'decisionDateAsc',
    },
    {
      label: t('decisions.decisionDateDesc'),
      value: 'decisionDateDesc',
    },
  ];

  const sortByOptionsCopyrights = [
    {
      label: t('mostRelevant'),
      value: 'mostRelevant',
    },
    {
      label: t('copyrights.grantDateAsc'),
      value: 'grantDateAsc',
    },
    {
      label: t('copyrights.grantDateDesc'),
      value: 'grantDateDesc',
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
  const sortByFilingDate = [
    {
      label: t('mostRelevant'),
      value: 'mostRelevant',
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
  map.set(4, sortByOptionsDecisions);
  map.set(5, sortByOptionsCopyrights);
  map.set(6, sortByFilingDate);
  map.set(7, sortByPublicationAndFilingDate);

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
      getInstanceByMultiIndex({
        indecies: {
          queryString: convertQueryArrToStr(searchResultParams.qArr),
          workstreamId: searchResultParams.workstreamId,
        },
        onSuccess: (resp) => { setIsQuerySaved(!!resp); },
        onError: () => { setIsQuerySaved(false); },
      });
    } else {
      setIsQuerySaved(results?.isFavourite);
    }
  }, [results]);

  useEffect(() => {
    if (location.state?.filters) {
      setSearchFilters(location.state.filters);
    }
  }, [location.state]);

  useEffect(() => {
    executeFilters();
  }, [searchParams.get('q')]);

  useEffect(() => {
    if (filtersData.data) {
      if (filtersData.data.code === 200 && !(filtersData.loading)) {
        setFilters(filtersData.data.data);
      }
    }
  }, [filtersData]);

  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });

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

  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  const parseAndSetSearchQuery = (qObjsArr) => {
    setSearchQuery(convertQueryArrToStr(qObjsArr));
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
  const deleteIndexValue = Number(localStorage.getItem('deleteQueryHistory') || 1);

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
            onRichLimit: (limit) => {
              if (count >= limit) {
                const amountToDelete = count - limit + 1;
                for (let i = 0; i < amountToDelete; i += 1) {
                  deleteInstance({
                    indexName: 'id',
                    indexValue: Number(localStorage.getItem('deleteQueryHistory')) || 1,
                    // eslint-disable-next-line no-loop-func
                    onSuccess: () => {
                      localStorage.setItem('deleteQueryHistory', (deleteIndexValue + 1).toString());
                    },
                  });
                }
              }
              saveSearchHistoryIDB.addInstanceToDb({
                data: saveHistoryParams,
              });
            },
          },
        )));
    }
  };

  useEffect(() => {
    saveHistory();
  }, []);

  const onSubmit = (values) => {
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
      saveHistoryParams.queryString = query;
      saveHistory();
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          workstreamId: values.selectedWorkstream.value,
          sort: 'mostRelevant',
          filterEnabled: false,
          q: (simpleQuery ? query : ''),
          ...(imageName && { imageName }),
          ...(docImage && { docImage }),
          ...(similarDocId && { similarDocId }),
        })}`,
      });
    } else {
      saveHistoryParams.queryString = values.searchQuery;
      saveHistory();
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          workstreamId: values.selectedWorkstream.value,
          q: values.searchQuery,
          filterEnabled: false,
          ...(imageName && { imageName }),
          ...(docImage && { docImage }),
          ...(similarDocId && { similarDocId }),
          enableSynonyms: isEnabledSynonyms,
          sort: sortBy.value,
          page: 1,
        })}`,
      });
    }
  };

  useEffect(() => {
    if (searchIdentifiers) {
      const searchIdentifiersData = searchIdentifiers.data;
      const reformattedDecoder = convertQueryArrToObjsArr(
        searchResultParams.qArr,
        searchIdentifiers.data,
      );
      setSearchFields(reformattedDecoder.length ? reformattedDecoder : [{
        id: 1,
        data: '',
        identifier: searchIdentifiersData[0],
        condition: searchIdentifiersData[0].identifierOptions[0],
        operator: '',
      }]);
    }
  }, [searchIdentifiers, searchResultParams.qArr]);

  useEffect(() => {
    // eslint-disable-next-line
    const regexPattern = new RegExp('true');
    setIsEnabledSynonyms(regexPattern.test(searchParams.get('enableSynonyms')));
  }, [searchParams.get('enableSynonyms')]);

  useEffect(() => {
    if (!isAdvancedSearch) setSearchQuery('');
  }, [isAdvancedSearch]);

  useEffect(() => {
    if (searchIdentifiers && searchResultParams.qArr) {
      const qObjsArr = convertQueryArrToObjsArr(
        searchResultParams.qArr,
        searchIdentifiers.data,
      );
      if (qObjsArr) {
        setSearchKeywords(
          convertQueryObjsArrToTransMemo(
            qObjsArr,
            searchResultParams.docImage || searchResultParams.imageName,
            searchResultParams.similarDocId,
            t,
            currentLang,
          ),
        );
      }
    }
  }, [searchResultParams.qArr, searchIdentifiers, currentLang]);

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
  };

  const getIprClassName = (media) => {
    let size = 4;
    if (media === 'xxl' && isIPRExpanded) {
      if (isAdvancedMenuOpen) {
        size = 9;
      } else {
        size = 11;
      }
    }
    if (media === 'xl' && isIPRExpanded) {
      if (isAdvancedMenuOpen) {
        size = 8;
      } else {
        size = 11;
      }
    }
    return size;
  };
  const getSearchResultsClassName = (media) => {
    let size = 5;
    if (media === 'xxl') {
      if (!isAdvancedMenuOpen) {
        if (totalResults) {
          size = 7;
        } else {
          size = 11;
        }
      } else if (totalResults) {
        size = 5;
      } else {
        size = 9;
      }
    }
    if (media === 'xl') {
      size = 4;
      if (!isAdvancedMenuOpen) {
        if (totalResults) {
          size = 7;
        } else {
          size = 11;
        }
      } else if (totalResults) {
        size = 4;
      } else {
        size = 8;
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

  const axiosConfig = similarDocId
    ? similarDocSearchApi(searchResultParams)
    : advancedSearchApi(searchResultParams);

  const searchResult = {
    1: SearchResultCards,
    2: TrademarksSearchResultCards,
    3: IndustrialDesignResultCards,
    4: DecisionsResultCards,
    5: CopyrightsResultCards,
    6: PlantVarietyResultCards,
    7: IcLayoutsResultCards,
  };

  const formSchema = Yup.object({
    searchQuery: Yup.mixed()
      .test('Is not empty', validationMessages.search.required, (data) => (
        (isImgUploaded || (data && (typeof data === 'string' || data instanceof String) && data.trim(t('errors.empty'))))
      || data instanceof DateObject
      ))
      .test('Is valid advanced query', validationMessages.search.invalidAdvanced, () => (
        (!isAdvancedSearch || advancedValidation)
      ))
      .test('is Valid String', validationMessages.search.invalidWildcards, (data) => (
        ((isImgUploaded && !data) || isAdvancedSearch || ((typeof data === 'string' || data instanceof String) && (data.trim().match(noTeldaRegex) || data.trim().match(teldaRegex))))
      || data instanceof DateObject
      ))
      .test('Special characters', validationMessages.search.specialChars, (data) => (
        ((isImgUploaded && !data) || ((typeof data === 'string' || data instanceof String) && (specialCharsValidation(data))))
      || data instanceof DateObject
      ))
      .test('Words count', validationMessages.search.tooLong, (data) => (
        ((isImgUploaded && !data) || isAdvancedSearch || ((typeof data === 'string' || data instanceof String) && (wordCountValidation(data))))
      || data instanceof DateObject
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

  if (!workstreams?.data) return null;

  const onRecordingCallback = (v) => {
    setSearchQuery(v);
  };
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
                      className="workStreams ms-3 mt-1 customSelect"
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
                    className={`${style.searchResultsView} ${isAdvancedSearch ? style.advanced : ''} search-results-view`}
                    selectedWorkStream={values.selectedWorkstream?.value}
                    setImageName={setImageName}
                    isImgUploaded={isImgUploaded}
                    onRecordingCallback={onRecordingCallback}
                    setIsImgUploaded={(v) => {
                      setIsImgUploaded(v);
                    }}
                    resultsView
                    speechClassName="inner-speech"
                  >
                    <div className="d-md-flex mt-4">
                      <div className="d-flex align-items-center me-4 advanced-search-container">
                        <ToggleButton
                          handleToggleButton={() => {
                            setIsAdvancedSearch((isAdvanced) => !isAdvanced);
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
            totalResults={totalResults}
            filters={filters}
            isAdvancedSearch={isAdvancedSearch}
            searchIdentifiers={searchIdentifiers}
            firstIdentifierStr={searchIdentifiers?.data[0].identifierStrId}
            onChangeSearchQuery={(values) => {
              parseAndSetSearchQuery(values);
            }}
            setAdvancedValidation={setAdvancedValidation}
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
          <Formik
            initialValues={{ selectedCards: { }, allSelected: false }}
            validationSchema={exportSearchResultsValidationSchema}
          >
            {() => (
              <Form className="mt-12">
                {
                  totalResults !== 0 && (
                    <div>
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
                        <ExportSearchResults
                          workstreams={workstreams}
                          workstreamId={searchResultParams.workstreamId}
                          data={results?.data || []}
                          withCheckbox={false}
                          setSelectedItemsCount={setSelectedItemsCount}
                        />
                      </div>
                      <div className="d-flex">
                        <Checkbox labelClassName="d-flex justify-content-start flex-row-reverse ms-1 mb-5 gap-3 font-medium text-gray-700" name="allSelected" fieldFor="allSelected" text={t('selectedItems', { count: selectedItemsCount })} />
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
                    query: convertQueryArrToStr(searchResultParams.qArr),
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
                  updateDependencies={[...Object.values(stringDependencies)]}
                />
              </Form>
            )}
          </Formik>
        </Col>
        {activeDocument && (
          <Col xxl={getIprClassName('xxl')} xl={getIprClassName('xl')} lg={isIPRExpanded ? 12 : 5} md={isIPRExpanded ? 12 : 6} className="px-0 border-start handle-different-mobile">
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
