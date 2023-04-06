import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import CitationRow from './CitationRow';

describe('<CitationRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <CitationRow row={sampleTrademark.Citations[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.Citations[0].Type)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Citations[0].CitationOriginCoutryCode)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Citations[0].PublicationDate)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Citations[0].PublicationTitle)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Citations[0].PublicationNumber)).toBeInTheDocument();
      expect(getByText(sampleTrademark.Citations[0].Applicants.join('; '))).toBeInTheDocument();
      expect(getByText(sampleTrademark.Citations[0].EarliestPriorityDate)).toBeInTheDocument();
    });
  });
});
