import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import industrialDesignResponse from 'testing-resources/industrial-design/sampleIndustrialDesign.json';
import { Formik } from 'formik';
import IndustrialDesignResultCards from './IndustrialDesignResultCards';

describe('<IndustrialDesignResultCards />', () => {
  const ITEMS_LENGTH = 5;
  const data = { data: Array(ITEMS_LENGTH).fill(industrialDesignResponse) };
  const query = 'NO_MATCH';

  it('should display all fetched data', async () => {
    const { queryAllByText } = render(
      <Formik>
        <IndustrialDesignResultCards data={data} query={query} />
      </Formik>,
    );
    await waitFor(() => {
      expect(queryAllByText(industrialDesignResponse.BibliographicData.DesignTitleEN))
        .toHaveLength(ITEMS_LENGTH);
    });
  });
});
