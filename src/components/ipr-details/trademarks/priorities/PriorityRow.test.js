import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import PriorityRow from './PriorityRow';

describe('<PriorityRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <PriorityRow row={sampleTrademark.Priorities[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.Priorities[0].PriorityNumber))
        .toBeInTheDocument();
      expect(getByText(sampleTrademark.Priorities[0].PriorityDate))
        .toBeInTheDocument();
      expect(getByText(sampleTrademark.Priorities[0].PriorityCountry)).toBeInTheDocument();
    });
  });
});
