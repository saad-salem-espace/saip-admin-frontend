import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Formik, Form } from 'formik';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import uploadFile from 'apis/uploadFileApi';
// import ErrorMessage from 'components/shared/error-message/ErrorMessage';
import EmptyState from 'components/shared/empty-state/EmptyState';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import Select from 'components/shared/form/select/Select';
import Search from 'components/shared/form/search/Search';
import ToggleButton from 'components/shared/toggle-button/ToggleButton';
import UploadImage from 'components/shared/upload-image/UploadImage';
import emptyState from 'assets/images/search-empty-state.svg';
import advancedSearchApi from 'apis/search/advancedSearchApi';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import { pascalCase } from 'change-case';
import formStyle from 'components/shared/form/form.module.scss';
import SearchNote from './SearchNote';
import SearchResultCards from './search-result-cards/SearchResultCards';
import IprDetails from '../ipr-details/IprDetails';
import './style.scss';
import TrademarksSearchResultCards from './trademarks-search-result-cards/TrademarksSearchResultCards';
import AdvancedSearch from '../advanced-search/AdvancedSearch';
import { decodeQuery } from '../../utils/searchQuery/decoder';
import { flattenCriteria, parseQuery, reformatDecoder } from '../../utils/searchQuery';

function SearchResults() {
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(true);
  const [isEnabledSynonyms, setIsEnabledSynonyms] = useState(false);
  const [isAdvancedMenuOpen, setIsAdvancedMenuOpen] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [showUploadImgSection, setShowUploadImgSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedView, setSelectedView] = useState({ label: t('trademarks.detailed'), value: 'detailed' });
  const [searchFields, setSearchFields] = useState([]);
  const [imageName, setImageName] = useState(null);
  const [flattenedCriteria, setFlattenedCriteria] = useState([]);
  const submitRef = useRef();

  const searchResultParams = {
    workstreamId: searchParams.get('workstreamId'),
    query: searchParams.get('q'),
    fireSearch: searchParams.get('fireSearch') !== 'false',
    ...(searchParams.get('imageName') && { imageName: searchParams.get('imageName') }),
    ...(searchParams.get('enableSynonyms') && { enableSynonyms: searchParams.get('enableSynonyms') }),
  };
  const { cachedRequests } = useContext(CacheContext);
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });

  const [isImgUploaded, setIsImgUploaded] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchIdentifiers] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${searchResultParams.workstreamId}/identifiers` });
  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  const options = [
    {
      key: '1',
      value: 'any field',
    },
    {
      key: '2',
      value: 'Int. Classification(IPC)',
    },
  ];

  const onSubmit = (values) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        workstreamId: values.selectedWorkstream.value,
        q: values.searchQuery,
        ...(imageName && { imageName }),
        enableSynonyms: isEnabledSynonyms,
        page: 1,
      })}`,
    });
  };

  useEffect(() => {
    if (searchIdentifiers) {
      const decodedQuery = decodeQuery(searchResultParams.query);
      setFlattenedCriteria(flattenCriteria(decodedQuery));
      const searchIdentifiersData = searchIdentifiers.data;
      const reformattedDecoder = reformatDecoder(searchIdentifiers.data, decodedQuery);
      setSearchFields(reformattedDecoder.length ? reformattedDecoder : [{
        id: 1, data: '', identifier: searchIdentifiersData[0], condition: searchIdentifiersData[0].identifierOptions[0], operator: '',
      }]);
    }
  }, [searchResultParams.query, searchIdentifiers]);

  const WorkStreamsOptions = workstreams?.data?.map((workstream) => ({
    label: pascalCase(workstream.workstreamName),
    value: workstream.id,
  }));

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };

  const handleAdvancedSearch = () => {
    setIsAdvancedSearch(true);
  };

  const SearchModuleClassName = ({
    smSearch: true,
    searchWithSibling: !isAdvancedSearch,
    imgUploadedResultView: isImgUploaded,
    searchWithImage: true, // please set it true for workstream with search with image
  });

  const uploadCurrentFile = async (file) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('file', file);
    const { res, err } = await uploadFile(formData);
    setImageName(res.data.data?.[0]);
    if (err) setErrorMessage(err);
    setIsImgUploaded(true);
    setShowUploadImgSection(false);
    setIsSubmitting(false);
  };

  const handleUploadImg = () => {
    setShowUploadImgSection(!showUploadImgSection);
  };

  const toggleAdvancedSearchMenu = () => {
    setIsAdvancedMenuOpen(!isAdvancedMenuOpen);
  };

  const getIprClassName = (media) => {
    let size = 4;
    if (media === 'xl' && isIPRExpanded) {
      size = 12;
      if (isAdvancedSearch) {
        size = isAdvancedMenuOpen ? 9 : 11;
      }
    }
    return size;
  };
  const getSearchResultsClassName = (media) => {
    let size = 5;
    if (media === 'xl') {
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
        size = 8;
      } else {
        size = 11;
      }
    }
    return size;
  };

  const axiosConfig = advancedSearchApi(searchResultParams, true);

  const viewOptions = [
    {
      label: t('trademarks.detailed'),
      value: 'detailed',
    },
    {
      label: t('trademarks.summary'),
      value: 'summary',
    },
    {
      label: t('trademarks.compact'),
      value: 'compact',
    },
  ];

  const onChangeView = (i) => {
    setSelectedView(i);
  };

  const searchResult = {
    1: SearchResultCards,
    2: TrademarksSearchResultCards,
  };
  return (
    <Container fluid className="px-0 workStreamResults">
      <Row className="mx-0 header">
        <Col md={{ span: 10, offset: 1 }} className="mb-8 position-relative">
          <Formik
            innerRef={submitRef}
            enableReinitialize
            onSubmit={onSubmit}
            initialValues={{
              searchQuery: searchQuery || searchResultParams.query,
              selectedWorkstream: WorkStreamsOptions?.find(
                (element) => element.value.toString() === searchResultParams.workstreamId,
              ),
            }}
          >
            {({ setFieldValue, handleSubmit, values }) => (
              <Form onSubmit={handleSubmit} className="mt-8">
                <div className="d-lg-flex align-items-start">
                  <div className="d-flex mb-lg-0 mb-3">
                    <h4 className="mb-0 mt-4">Search</h4>
                    <Select
                      options={WorkStreamsOptions}
                      moduleClassName="menu"
                      selectedOption={values.selectedWorkstream}
                      className="workStreams me-5 ms-3 mt-1 customSelect"
                      setSelectedOption={(data) => setFieldValue('selectedWorkstream', data)}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="mb-4">
                      <div className="d-md-flex">
                        {
                          !isAdvancedSearch && (
                            <div className="position-relative mb-md-0 mb-3">
                              <Select
                                options={options}
                                className="searchResultsSelect select selectWithSibling smSelect"
                              />
                            </div>
                          )
                        }
                        <Search
                          id="search"
                          name="searchQuery"
                          className="flex-grow-1"
                          moduleClassName={SearchModuleClassName}
                          placeholder={t('typeHere')}
                          onSubmit={onSubmit}
                          handleUploadImg={handleUploadImg}
                          disabled
                          searchWithImg
                        />
                      </div>
                      {/* <ErrorMessage msg="" className="mt-2" /> */}
                    </div>
                    <div className="d-md-flex mt-md-0 mt-14">
                      <ToggleButton
                        handleToggleButton={handleAdvancedSearch}
                        isToggleButtonOn={false}
                        text={t('advancedSearch')}
                        className="border-md-end pe-4 me-4 mb-md-0 mb-2"
                      />
                      <ToggleButton
                        handleToggleButton={() => setIsEnabledSynonyms(!isEnabledSynonyms)}
                        isToggleButtonOn={isEnabledSynonyms}
                        text={t('allowSynonyms')}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className={` ${showUploadImgSection ? 'rounded shadow' : ''} searchResultsView`}>
            <UploadImage className={`${showUploadImgSection ? 'pt-8 pb-2' : ''} mx-8 rounded ${isImgUploaded ? 'imgUploaded' : ''} ${isAdvancedSearch ? 'advancedMode' : ''}`} showUploadImgSection={showUploadImgSection} uploadFile={(file) => uploadCurrentFile(file)} isSubmitting={isSubmitting} changeIsImgUploaded={(flag) => { setIsImgUploaded(flag); setErrorMessage(''); }} />
          </div>
          {
            errorMessage && (
              <span className="text-danger-dark f-12">
                { errorMessage }
              </span>
            )
          }
        </Col>
      </Row>
      <Row className="border-top mx-0 align-items-stretch content">
        {
          isAdvancedSearch && (
            <Col xl={isAdvancedMenuOpen ? 3 : 1} className={`${isAdvancedMenuOpen ? 'expanded' : 'closed'} ps-0`}>
              <AdvancedSearch
                toggleAdvancedSearchMenu={toggleAdvancedSearchMenu}
                defaultInitializers={searchFields}
                isAdvancedMenuOpen={isAdvancedMenuOpen}
                submitRef={submitRef}
                workstreamId={searchResultParams.workstreamId}
                firstIdentifierStr={searchResultParams.identifierStrId}
                onChangeSearchQuery={setSearchQuery}
              />
            </Col>
          )
        }
        {
          searchResultParams.fireSearch
          && (
            <Col xl={getSearchResultsClassName('xl')} md={6} className={`mt-8 ${!isAdvancedSearch ? 'ps-lg-22 ps-md-8' : ''} ${isIPRExpanded ? 'd-none' : 'd-block'}`}>
              <SearchNote
                searchKeywords={parseQuery(searchFields, false)}
                resultsCount={totalResults}
              />
              <Formik>
                {() => (
                  <Form className="mt-8">
                    {
                      // changed for "1" for testing only
                      // searchResultParams.workstreamId === '2' && (
                      searchResultParams.workstreamId === '1' && (
                        <div className="position-relative mb-8 viewSelect">
                          <span className={`position-absolute f-12 ${formStyle.label} ${formStyle.select2}`}>{t('trademarks.view')}</span>
                          <Select
                            options={viewOptions}
                            setSelectedOption={onChangeView}
                            selectedOption={selectedView}
                            defaultValue={selectedView}
                            id="viewSection"
                            fieldName="viewSection"
                            className="mb-5 select-2"
                          />
                        </div>
                      )
                    }
                    <AppPagination
                      axiosConfig={axiosConfig}
                      defaultPage={Number(searchParams.get('page') || '1')}
                      // RenderedComponent={searchResult[searchResultParams.workstreamId]}
                      // commented for testing only
                      RenderedComponent={searchResult[2]}
                      renderedProps={{
                        query: searchResultParams.query,
                        flattenedCriteria,
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
                      updateDependencies={[...Object.values(searchResultParams)]}
                    />
                  </Form>
                )}
              </Formik>
            </Col>
          )
}
        {activeDocument && (
          <Col xl={getIprClassName('xl')} lg={isIPRExpanded ? 12 : 5} md={isIPRExpanded ? 12 : 6} className="px-0 border-start">
            <IprDetails
              collapseIPR={collapseIPR}
              isIPRExpanded={isIPRExpanded}
              documentId={activeDocument}
              onClose={handleCloseIprDetail}
              // moreDetails for search with image
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default SearchResults;
