import { render } from 'TestUtils';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import apiInstance from 'apis/apiInstance';
import WorkstreamList from 'testing-resources/workstreams/workstreams.json';
import WorkstreamIdentifiers from 'testing-resources/workstreams/patents/identifiers.json';
import WorkstreamSearch from './WorkstreamSearch';

const mockAxios = new MockAdapter(apiInstance);

mockAxios.onGet(/\/workstreams\/\d+\/identifiers/).reply(200, WorkstreamIdentifiers);

mockAxios.onGet('workstreams').reply(200, WorkstreamList);

describe('<WorkstreamSearch />', () => {
  it('renders correctly', async () => {
    const { getByText, queryByText } = render(<WorkstreamSearch />);

    await waitFor(() => {
      expect(getByText(WorkstreamIdentifiers.data[0].identiferName)).toBeInTheDocument();
      expect(queryByText(WorkstreamIdentifiers.data[1].identiferName)).toBeNull();
    });
  });

  // To Do: Test react-select (needs some investigation)
});
