import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import InventorRow from './InventorRow';

describe('<InventorRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <InventorRow row={sampleTrademark.Inventors[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.Inventors[0].InventorName)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Inventors[0].CountryCode)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Inventors[0].Naionality)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Inventors[0].InventorDetails.join('; '))).toBeInTheDocument();
    });
  });
});
