import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import LegalStatusRow from './LegalStatusRow';

describe('<LegalStatusRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <LegalStatusRow row={sampleTrademark.LegalStatus[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.LegalStatus[0].StatusCode)).toBeInTheDocument();
      expect(getByText(sampleTrademark.LegalStatus[0].Status)).toBeInTheDocument();
      expect(getByText(sampleTrademark.LegalStatus[0].StatusDate)).toBeInTheDocument();
      expect(getByText(sampleTrademark.LegalStatus[0].EffectiveDate)).toBeInTheDocument();
      expect(getByText(sampleTrademark.LegalStatus[0].Notes)).toBeInTheDocument();
    });
  });
});
