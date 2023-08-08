import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import I18n from 'i18n';
import patentResponse from 'testing-resources/patents/samplePatent.json';
import { Formik } from 'formik';
import { trimStringRelativeToSubtext } from 'utils/strings';
import SearchResultCard from './SearchResultCard';

describe('<SearchResultCard />', () => {
  const t = (key, options) => I18n.t(key, { ...options, ns: 'search' });
  const selectedView = { label: t('detailed'), value: 'detailed' };

  it('renders component correctly', async () => {
    const query = 'Manufcature';
    const { getByText } = render(
      <Formik>
        <SearchResultCard searchResult={patentResponse} query={query} highlightWords={['Manufcature']} selectedView={selectedView} />
      </Formik>,
    );
    await waitFor(() => {
      expect(getByText(patentResponse.BibliographicData.ApplicationTitle)).toBeInTheDocument();
      expect(getByText(patentResponse.BibliographicData.PublicationNumber)).toBeInTheDocument();
      // expect(getByText(
      //   t('priority', { value: patentResponse.BibliographicData.Priority }),
      //   { exact: false },
      // )).toBeInTheDocument();
      expect(getByText(t('filed', { value: patentResponse.BibliographicData.FilingNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(t('published', { value: patentResponse.BibliographicData.PublicationDate }), { exact: false })).toBeInTheDocument();
      expect(getByText(trimStringRelativeToSubtext(patentResponse.BibliographicData.ApplicationAbstract.join(' '), query, 100, 100))).toBeInTheDocument();
    });
  });

  describe('when component have highlighting', () => {
    [
      { key: 'title', value: patentResponse.BibliographicData.ApplicationTitle },
      { key: 'abstract', value: patentResponse.BibliographicData.ApplicationAbstract.join(' ') },
    ].forEach((item) => {
      it(`should display the highlight in the ${item.key}`, async () => {
        const { value } = item;
        const splitPosition = value.indexOf(' ', value.indexOf(' ') + 1);
        const query = value.substring(0, splitPosition);
        const restValue = trimStringRelativeToSubtext(value, query, 100, 100)
          .substring(splitPosition + 1, value.length);
        const { getByText } = render(
          <Formik>
            <SearchResultCard
              searchResult={patentResponse}
              query={query}
              highlightWords={[query]}
              selectedView={selectedView}
            />
          </Formik>,
        );
        await waitFor(() => {
          expect(getByText(query)).toBeInTheDocument();
          expect(getByText(query)).toHaveClass('font-medium');
          expect(getByText(restValue)).toBeInTheDocument();
        });
      });
    });
  });
});
