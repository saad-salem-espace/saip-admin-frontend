import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import industrialDesignResponse from 'testing-resources/industrial-design/sampleIndustrialDesign.json';
import { Formik } from 'formik';
import I18n from 'i18n';
import IndustrialDesignResultCards from './IndustrialDesignResultCards';

describe('<IndustrialDesignResultCards />', () => {
  const ITEMS_LENGTH = 5;
  const data = { data: Array(ITEMS_LENGTH).fill(industrialDesignResponse) };
  const query = 'NO_MATCH';
  const t = (key, options) => I18n.t(key, { ...options, ns: 'search' });

  const selectedView = { label: t('detailed'), value: 'detailed' };

  it('should display all fetched data', async () => {
    const { queryAllByText } = render(
      <Formik>
        <IndustrialDesignResultCards data={data} query={query} selectedView={selectedView} />
      </Formik>,
    );
    await waitFor(() => {
      expect(queryAllByText(industrialDesignResponse.BibliographicData.DesignTitleEN))
        .toHaveLength(ITEMS_LENGTH);
    });
  });
});
