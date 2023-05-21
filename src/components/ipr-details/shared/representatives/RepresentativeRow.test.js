import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import RepresentativeRow from './RepresentativeRow';

describe('<RepresentativeRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <RepresentativeRow row={sampleTrademark.RepresentativesDetails[0]} />,
    );
    await waitFor(() => {
      expect(
        getByText(sampleTrademark.RepresentativesDetails[0].RepresentativeName),
      ).toBeInTheDocument();
      expect(getByText(sampleTrademark.RepresentativesDetails[0].CountryCode)).toBeInTheDocument();
      expect(getByText(sampleTrademark.RepresentativesDetails[0].Nationality)).toBeInTheDocument();
      expect(getByText(sampleTrademark.RepresentativesDetails[0]
        .RepresentativeDetails)).toBeInTheDocument();
    });
  });
});
