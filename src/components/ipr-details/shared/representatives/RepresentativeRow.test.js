import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import RepresentativeRow from './RepresentativeRow';

describe('<RepresentativeRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <RepresentativeRow row={sampleTrademark.Representative[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.Representative[0].RepresentativeName)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Representative[0].CountryCode)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Representative[0].Naionality)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Representative[0].RepresentativeDetails.join('; '))).toBeInTheDocument();
    });
  });
});
