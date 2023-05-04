import { render } from 'TestUtils';
import { fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import apiInstance from 'apis/apiInstance';
import WorkstreamList from 'testing-resources/workstreams/workstreams.json';
import Workstreams from './WorkStreams';

const mockAxios = new MockAdapter(apiInstance);

const mockOnChange = jest.fn();

mockAxios.onGet('workstreams').reply(200, WorkstreamList);

describe('<Workstreams />', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<Workstreams
      selectedWorkStream={WorkstreamList.data[0].id}
      onChange={mockOnChange}
    />);

    await waitFor(() => {
      expect(getByText(WorkstreamList.data[0].workstreamNameAr)).toBeInTheDocument();
      expect(getByText(WorkstreamList.data[0].workstreamNameAr).closest('button')).toHaveClass('active');
      expect(getByText(WorkstreamList.data[1].workstreamNameAr)).toBeInTheDocument();
      expect(getByText(WorkstreamList.data[1].workstreamNameAr).closest('button').classList.contains('active')).toBe(false);
    });

    expect(mockOnChange).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      fireEvent.click(getByText(WorkstreamList.data[1].workstreamNameAr).closest('button'));
    });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});
