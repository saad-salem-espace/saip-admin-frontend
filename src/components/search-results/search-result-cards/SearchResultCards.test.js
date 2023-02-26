import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import patentResponse from 'testing-resources/patents/samplePatent.json';
import { Formik } from 'formik';
import SearchResultCards from './SearchResultCards';

describe('<SearchResultCards />', () => {
  const ITEMS_LENGTH = 5;
  const data = Array(ITEMS_LENGTH).fill(patentResponse);
  const query = 'NO_MATCH';
  it('should display all fetched data', async () => {
    const { queryAllByText } = render(
      <Formik>
        <SearchResultCards data={data} query={query} />
      </Formik>,
    );
    await waitFor(() => {
      expect(queryAllByText(patentResponse.BibliographicData.ApplicationTitle))
        .toHaveLength(ITEMS_LENGTH);
    });
  });
});
