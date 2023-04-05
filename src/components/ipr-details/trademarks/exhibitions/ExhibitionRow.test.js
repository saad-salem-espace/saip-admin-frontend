import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import ExhibitionRow from './ExhibitionRow';

describe('<ExhibitionRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <ExhibitionRow row={sampleTrademark.ExhibitionInformation[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.ExhibitionInformation[0].ExhibitionName))
        .toBeInTheDocument();
      expect(getByText(sampleTrademark.ExhibitionInformation[0].ExihibitionDate))
        .toBeInTheDocument();
      expect(getByText(sampleTrademark.ExhibitionInformation[0].ExibitionDetails.join('; '))).toBeInTheDocument();
    });
  });
});
