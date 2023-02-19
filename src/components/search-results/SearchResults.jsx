import { Formik, Form } from 'formik';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import SearchResultCard from './search-result-card/SearchResultCard';
import SearchNote from './SearchNote';
import Select from '../shared/form/select/Select';
import Search from '../shared/form/search/Search';
import ToggleButton from '../shared/toggle-button/ToggleButton';
import style from './style.module.scss';

function SearchResults() {
  const { t } = useTranslation('search');

  const results = [
    {
      id: 1,
      title: 'Rail road car and truck therefor',
      priority: '2001-1-02',
      filingNumber: '20-30',
      publicationNumber: 'US US10745034B2',
      filingDate: '1',
      publishedAt: '20-2-2022',
      abstract: 'I claim: 1. A railroad freight car truck having a load rating, said truck comprising: a bolster, sideframes, spring groups and wheelsets; said bolster being mounted cross-wise to said...',
    },
    {
      id: 2,
      title: 'Rail road car and truck therefor',
      priority: '2001-1-02',
      filingNumber: '20-30',
      publicationNumber: 'US US10745034B2',
      filingDate: '1',
      publishedAt: '20-2-2022',
      abstract: 'I claim: 1. A railroad freight car truck having a load rating, said truck comprising: a bolster, sideframes, spring groups and wheelsets; said bolster being mounted cross-wise to said...',
    },
  ];

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

  const handleToggleButton = () => {

  };

  const SearchModuleClassName = ({
    smSearch: true,
    searchWithSibling: true,
  });

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
                    <div className="d-md-flex mb-3">
                      <div className="position-relative mb-md-0 mb-3">
                        <Select options={options} className={`${style.select} select selectWithSibling smSelect`} />
                      </div>
                      <Search
                        id="search"
                        className="flex-grow-1"
                        moduleClassName={SearchModuleClassName}
                        placeholder={t('typeSearchTerms')}
                        onSubmit={onSubmit}
                      />
                    </div>
                    <ToggleButton
                      handleToggleButton={handleToggleButton}
                      isToggleButtonOn={false}
                      text={t('allowSynonyms')}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        <Col lg={4} md={6} className="mx-12">
          <SearchNote searchKeywords="Title: “car” AND Publication date: “11/11/2020 AND IPC: ”A61K”" resultsCount={50} />
          <Formik>
            {() => (
              <Form className="mt-8">
                {
                  results.map((searchResult) => (
                    <SearchResultCard key={searchResult.id} searchResult={searchResult} />
                  ))
                }
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchResults;
