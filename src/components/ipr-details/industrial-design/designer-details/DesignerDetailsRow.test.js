import { render } from 'TestUtils';
import industrialDesignResponse from 'testing-resources/industrial-design/sampleIndustrialDesign.json';
import { waitFor } from '@testing-library/react';
import DesignerDetailsRow from './DesignerDetailsRow';

describe('<DesignerDetailsRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <DesignerDetailsRow row={industrialDesignResponse.DesignerDetails[0]} />,
    );
    await waitFor(() => {
      expect(getByText(industrialDesignResponse.DesignerDetails[0].DesignerName))
        .toBeInTheDocument();
      expect(getByText(industrialDesignResponse.DesignerDetails[0].CountryCode))
        .toBeInTheDocument();
      expect(getByText(industrialDesignResponse.DesignerDetails[0].Nationality))
        .toBeInTheDocument();
      expect(getByText(industrialDesignResponse.DesignerDetails[0].DesignerDetails))
        .toBeInTheDocument();
    });
  });
});
