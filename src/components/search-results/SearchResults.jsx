import { Formik, Form } from 'formik';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchResultCard from './search-result-card/SearchResultCard';
import SearchNote from './SearchNote';

function SearchResults() {
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
  return (
    <Container fluid className="px-0">
      <Row className="mx-0">
        <Col lg={4} md={6}>
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
