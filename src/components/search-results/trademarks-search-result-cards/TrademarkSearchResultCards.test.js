import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import trademarkResponse from 'testing-resources/trademarks/sampleTrademark.json';
import { Formik } from 'formik';
import I18n from 'i18n';
import TrademarksSearchResultCards from './TrademarksSearchResultCards';

describe('<TrademarksSearchResultCards />', () => {
  const t = (key, options) => I18n.t(key, { ...options, ns: 'search' });
  const ITEMS_LENGTH = 5;
  const data = Array(ITEMS_LENGTH).fill(trademarkResponse);
  const query = 'NO_MATCH';
  const selectedView = { label: t('trademarks.detailed'), value: 'detailed' };

  it('should display all fetched data', async () => {
    const { queryAllByText } = render(
      <Formik>
        <TrademarksSearchResultCards data={data} query={query} selectedView={selectedView} />
      </Formik>,
    );
    await waitFor(() => {
      //  will replace ApplicationTitle with BrandNameEn
      expect(queryAllByText(trademarkResponse.BibliographicData.ApplicationTitle))
        .toHaveLength(ITEMS_LENGTH);
    });
  });
});
