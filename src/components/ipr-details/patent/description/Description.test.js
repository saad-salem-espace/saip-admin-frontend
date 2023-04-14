import { render } from 'TestUtils';
import samplePatent from 'testing-resources/patents/samplePatent.json';
import { waitFor } from '@testing-library/react';
import Description from './Description';

describe('<Description />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <Description description={samplePatent.Description} />,
    );
    await waitFor(() => {
      expect(getByText(samplePatent.Description.TechnicalField.Title)).toBeInTheDocument();
      expect(getByText(samplePatent.Description.TechnicalField.Paragraphs.join('; '))).toBeInTheDocument();
    });
  });
});
