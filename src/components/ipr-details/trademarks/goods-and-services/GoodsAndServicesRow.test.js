import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import GoodsAndServicesRow from './GoodsAndServicesRow';

describe('<GoodsAndServicesRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <GoodsAndServicesRow row={sampleTrademark.GoodsAndServices[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.GoodsAndServices[0].NICEClassification)).toBeInTheDocument();
      expect(getByText(sampleTrademark.GoodsAndServices[0].GoodsAndServices)).toBeInTheDocument();
    });
  });
});
