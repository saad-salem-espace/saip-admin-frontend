import { render } from 'TestUtils';
import samplePatent from 'testing-resources/patents/samplePatent.json';
import { waitFor } from '@testing-library/react';
import InventorRow from './InventorRow';

describe('<InventorRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <InventorRow row={samplePatent.InventorsDetails[0]} />,
    );
    await waitFor(() => {
      expect(getByText(samplePatent.InventorsDetails[0].InventorName)).toBeInTheDocument();
      expect(getByText(samplePatent.InventorsDetails[0].CountryCode)).toBeInTheDocument();
      expect(getByText(samplePatent.InventorsDetails[0].Naionality)).toBeInTheDocument();
      expect(getByText(samplePatent.InventorsDetails[0].InventorDetails.join('; '))).toBeInTheDocument();
    });
  });
});
