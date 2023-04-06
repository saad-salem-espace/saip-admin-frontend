import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import ApplicantRow from './ApplicantRow';

describe('<ApplicantRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <ApplicantRow row={sampleTrademark.ApplicantsDetails[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.ApplicantsDetails[0].ApplicantName)).toBeInTheDocument();
      expect(getByText(sampleTrademark.ApplicantsDetails[0].CountryCode)).toBeInTheDocument();
      expect(getByText(sampleTrademark.ApplicantsDetails[0].Naionality)).toBeInTheDocument();
      expect(getByText(sampleTrademark.ApplicantsDetails[0].ApplicantDetails.join('; '))).toBeInTheDocument();
    });
  });
});
