import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import FigurativeClassificationRow from './FigurativeClassificationRow';

describe('<FigurativeClassificationRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <FigurativeClassificationRow row={sampleTrademark.FigurativeClassification[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.FigurativeClassification[0].ViennaCode)).toBeInTheDocument();
      expect(getByText(sampleTrademark.FigurativeClassification[0].Description))
        .toBeInTheDocument();
    });
  });
});
