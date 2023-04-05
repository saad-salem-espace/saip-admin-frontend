import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import Description from './Description';

describe('<Description />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <Description description={sampleTrademark.BibliographicData.Description} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.BibliographicData.Description)).toBeInTheDocument();
    });
  });
});
