import { Formik, Form } from 'formik';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSearchParams } from 'react-router-dom';
import useWorkstreams from 'hooks/useWorkstreams';
import SearchNote from './SearchNote';
import AppPagination from '../shared/app-pagination/AppPagination';
import SearchResultCards from './search-result-cards/SearchResultCards';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchResultParams = {
    workstreamId: searchParams.get('workstreamId'),
    identifierStrId: searchParams.get('identifierStrId'),
    queryString: searchParams.get('query'),
  };
  const { getIdentifierByStrId, isReady } = useWorkstreams(searchResultParams.workstreamId);
  if (!isReady) return null;

  const identifier = getIdentifierByStrId(searchParams.get('identifierStrId'));

  return (
    <Container fluid className="px-0">
      <Row className="mx-0">
        <Col lg={4} md={6}>
          <SearchNote
            searchKeywords={`${identifier}: “${searchResultParams.queryString}”`}
            resultsCount={50}
          />
          <Formik>
            {() => (
              <Form className="mt-8">
                <AppPagination
                  axiosConfig={{
                    url: 'search',
                    params: searchResultParams,
                  }}
                  RenderedComponent={SearchResultCards}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchResults;
