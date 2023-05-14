import { render } from 'TestUtils';
import industrialDesignResponse from 'testing-resources/industrial-design/sampleIndustrialDesign.json';
import { waitFor } from '@testing-library/react';
import LocarnoClassificationRow from './LocarnoClassificationRow';

describe('<LocarnoClassificationRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <LocarnoClassificationRow row={industrialDesignResponse.LocarnoClassification[0]} />,
    );
    await waitFor(() => {
      expect(getByText(industrialDesignResponse.LocarnoClassification[0].LocarnoClassification))
        .toBeInTheDocument();
      expect(getByText(industrialDesignResponse.LocarnoClassification[0].IndicationofDesign))
        .toBeInTheDocument();
    });
  });
});
