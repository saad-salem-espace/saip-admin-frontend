import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import OfficeActionRow from './OfficeActionRow';

describe('<OfficeActionRow />', () => {
  it('renders component successfully', async () => {
    const { getByText } = render(
      <OfficeActionRow row={sampleTrademark.OfficeActions[0]} />,
    );
    await waitFor(() => {
      expect(getByText(sampleTrademark.OfficeActions[0].OfficeAction))
        .toBeInTheDocument();
      expect(getByText(sampleTrademark.OfficeActions[0].OfficeActionDateTime))
        .toBeInTheDocument();
      expect(getByText(sampleTrademark.OfficeActions[0].ExaminerName)).toBeInTheDocument();
      expect(getByText(sampleTrademark.OfficeActions[0].ExaminerDetails)).toBeInTheDocument();
    });
  });
});
