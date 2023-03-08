import { useState } from 'react';
import { Formik, Form } from 'formik';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useWorkstreams from 'hooks/useWorkstreams';
// import ErrorMessage from 'components/shared/error-message/ErrorMessage';
import SearchNote from './SearchNote';
import AppPagination from '../shared/app-pagination/AppPagination';
import SearchResultCards from './search-result-cards/SearchResultCards';
import Select from '../shared/form/select/Select';
import Search from '../shared/form/search/Search';
import ToggleButton from '../shared/toggle-button/ToggleButton';
import IprDetails from '../ipr-details/IprDetails';
// import formStyle from '../shared/form/form.module.scss';
import style from './style.module.scss';
import AdvancedSearch from '../advanced-search/AdvancedSearch';

function SearchResults() {
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(true);
  const [isAdvancedMenuOpen, setIsAdvancedMenuOpen] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const searchResultParams = {
    workstreamId: searchParams.get('workstreamId'),
    identifierStrId: searchParams.get('identifierStrId'),
    queryString: searchParams.get('query'),
  };

  const { getIdentifierByStrId, isReady } = useWorkstreams(searchResultParams.workstreamId);
  if (!isReady) return null;

  const identifier = getIdentifierByStrId(searchParams.get('identifierStrId'));

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

  const onSubmit = () => {

  };

  const WorkStreamsOptions = [
    {
      key: '1',
      value: 'patents',
    },
    {
      key: '2',
      value: 'copy right',
    },
  ];

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };

  const handleAdvancedSearch = () => {
    setIsAdvancedSearch(true);
  };

  const handleToggleButton = () => {
  };

  const SearchModuleClassName = ({
    smSearch: true,
    searchWithSibling: !isAdvancedSearch,
  });

  const toggleAdvancedSearchMenu = () => {
    setIsAdvancedMenuOpen(!isAdvancedMenuOpen);
  };

  const getIprClassName = (media) => {
    let size = 4;
    if (media === 'lg' && isIPRExpanded) {
      size = 12;
      if (isAdvancedSearch) {
        size = isAdvancedMenuOpen ? 8 : 11;
      }
    }
    return size;
  };

  return (
    <Container fluid className="px-0">
      <Row className="mx-0">
        <Col md={{ span: 10, offset: 1 }} className="mb-8">
          <Formik>
            {() => (
              <Form className="mt-8">
                <div className="d-lg-flex align-items-start">
                  <div className="d-flex mb-lg-0 mb-3">
                    <h4 className="mb-0 mt-4">Search</h4>
                    <Select options={WorkStreamsOptions} moduleClassName="menu" className={`${style.workStreams} me-5 ms-3 mt-1 customSelect`} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="mb-4">
                      <div className="d-md-flex">
                        {
                          !isAdvancedSearch && (
                            <div className="position-relative mb-md-0 mb-3">
                              <Select
                                options={options}
                                className={`${style.select} select selectWithSibling smSelect`}
                              />
                            </div>
                          )
                        }
                        <Search
                          id="search"
                          className="flex-grow-1"
                          moduleClassName={SearchModuleClassName}
                          placeholder={t('typeSearchTerms')}
                          onSubmit={onSubmit}
                        />
                      </div>
                      {/* <ErrorMessage msg="" className="mt-2" /> */}
                    </div>
                    <div className="d-md-flex">
                      <ToggleButton
                        handleToggleButton={handleAdvancedSearch}
                        isToggleButtonOn={false}
                        text={t('advancedSearch')}
                        className="border-md-end pe-4 me-4 mb-md-0 mb-2"
                      />
                      <ToggleButton
                        handleToggleButton={handleToggleButton}
                        isToggleButtonOn={false}
                        text={t('allowSynonyms')}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row className="border-top mx-0 align-items-stretch mb-10">
        {
          isAdvancedSearch && (
            <Col lg={isAdvancedMenuOpen ? 4 : 1} className={`${isAdvancedMenuOpen ? style.expanded : style.closed} ps-0`}>
              <AdvancedSearch
                toggleAdvancedSearchMenu={toggleAdvancedSearchMenu}
                isAdvancedMenuOpen={isAdvancedMenuOpen}
              />
            </Col>
          )
        }
        <Col lg={isAdvancedSearch ? 4 : 8} md={6} className={`mt-8 ${isIPRExpanded ? 'd-none' : 'd-block'}`}>
          <SearchNote
            searchKeywords={`${identifier}: “${searchResultParams.queryString}”`}
            resultsCount={totalResults}
          />
          <Formik>
            {() => (
              <Form className="mt-8">
                <AppPagination
                  axiosConfig={{
                    url: 'search',
                    params: searchResultParams,
                  }}
                  defaultPage={Number(searchParams.get('page') || '1')}
                  RenderedComponent={SearchResultCards}
                  renderedProps={{
                    query: searchResultParams.queryString,
                    setActiveDocument,
                    activeDocument,
                  }}
                  fetchedTotalResults={setTotalResults}
                />
              </Form>
            )}
          </Formik>
        </Col>
        {activeDocument && (
          <Col lg={getIprClassName('lg')} md={isIPRExpanded ? 12 : 6} className="px-0 border-start">
            <IprDetails
              collapseIPR={collapseIPR}
              isIPRExpanded={isIPRExpanded}
              documentId={activeDocument}
              onClose={handleCloseIprDetail}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default SearchResults;
