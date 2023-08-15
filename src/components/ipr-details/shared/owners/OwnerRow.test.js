import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import OwnerRow from './OwnerRow';

describe('<OwnerRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <OwnerRow row={sampleTrademark.OwnersDetails[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.OwnersDetails[0].OwnerName)).toBeInTheDocument();
      expect(getByText(sampleTrademark.OwnersDetails[0].CountryCode)).toBeInTheDocument();
      expect(getByText(sampleTrademark.OwnersDetails[0].Nationality)).toBeInTheDocument();
      expect(getByText(sampleTrademark.OwnersDetails[0].OwnerDetails)).toBeInTheDocument();
    });
  });
});
