import { render } from 'TestUtils';
import samplePatent from 'testing-resources/patents/samplePatent.json';
import { waitFor } from '@testing-library/react';
import CitationRow from './CitationRow';

describe('<CitationRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <CitationRow row={samplePatent.Citations[0]} />,
    );
    await waitFor(() => {
      expect(getByText(samplePatent.Citations[0].Type)).toBeInTheDocument();
      expect(getByText(samplePatent.Citations[0].CitationOriginCoutryCode)).toBeInTheDocument();
      expect(getByText(samplePatent.Citations[0].PublicationDate)).toBeInTheDocument();
      expect(getByText(samplePatent.Citations[0].PublicationTitle)).toBeInTheDocument();
      expect(getByText(samplePatent.Citations[0].PublicationNumber)).toBeInTheDocument();
      expect(getByText(samplePatent.Citations[0].Applicants.join('; '))).toBeInTheDocument();
      expect(getByText(samplePatent.Citations[0].EarliestPriorityDate)).toBeInTheDocument();
    });
  });
});
