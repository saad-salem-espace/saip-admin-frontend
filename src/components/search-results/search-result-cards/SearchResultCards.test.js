import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import patentResponse from 'testing-resources/patents/samplePatent.json';
import { Formik } from 'formik';
import I18n from 'i18n';
import SearchResultCards from './SearchResultCards';

describe('<SearchResultCards />', () => {
  const t = (key, options) => I18n.t(key, { ...options, ns: 'search' });

  const ITEMS_LENGTH = 5;
  const data = { data: Array(ITEMS_LENGTH).fill(patentResponse) };
  const query = 'NO_MATCH';
  const selectedView = { label: t('detailed'), value: 'detailed' };

  it('should display all fetched data', async () => {
    const { queryAllByText } = render(
      <Formik>
        <SearchResultCards data={data} query={query} selectedView={selectedView} />
      </Formik>,
    );
    await waitFor(() => {
      expect(queryAllByText(patentResponse.BibliographicData.ApplicationTitle))
        .toHaveLength(ITEMS_LENGTH);
    });
  });
});
