import { render } from 'TestUtils';
import { fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import apiInstance from 'apis/apiInstance';
import WorkstreamIdentifiers from 'testing-resources/workstreams/patents/identifiers.json';
import WorkstreamList from 'testing-resources/workstreams/workstreams.json';
import SearchQuery from './SearchQuery';

const mockAxios = new MockAdapter(apiInstance);

mockAxios.onGet(/\/workstreams\/\d+\/identifiers/).reply(200, WorkstreamIdentifiers);

const mockOnChange = jest.fn();

const defaultCriteria = 'device';
const defaultInitializers = [{
  id: 1,
  data: defaultCriteria,
  identifier: WorkstreamIdentifiers.data[0],
  condition: WorkstreamIdentifiers.data[0].identifierOptions[0],
  operator: '',
}];

describe('<SearchQuery />', () => {
  it('The default field renders correctly', async () => {
    const {
      getByText, getByDisplayValue,
    } = render(<SearchQuery
      workstreamId={WorkstreamList.data[0].id}
      firstIdentifierStr={WorkstreamIdentifiers.data[0].identifierOptions[0]}
      onChangeSearchQuery={mockOnChange}
      defaultInitializers={defaultInitializers}
    />);

    await waitFor(() => {
      expect(getByText('Search Fields')).toBeInTheDocument();
      expect(getByText('Criteria')).toBeInTheDocument();
      expect(getByText('Condition')).toBeInTheDocument();
      expect(getByDisplayValue(defaultCriteria)).toBeInTheDocument();
    });
  });

  it('adds fields correctly', async () => {
    const { getByText, queryAllByText } = render(<SearchQuery
      workstreamId={WorkstreamList.data[0].id}
      firstIdentifierStr={WorkstreamIdentifiers.data[0].identifierOptions[0]}
      onChangeSearchQuery={mockOnChange}
      defaultInitializers={defaultInitializers}
    />);

    await waitFor(() => {
      expect(queryAllByText('Search Fields')).toHaveLength(1);
    });

    await waitFor(() => {
      fireEvent.click(getByText('Add Search Field').closest('button'));
    });

    await waitFor(() => {
      expect(queryAllByText('Search Fields')).toHaveLength(2);
    });
  });

  it('clears search correctly', async () => {
    const { getByText, queryByText, queryAllByText } = render(<SearchQuery
      workstreamId={WorkstreamList.data[0].id}
      firstIdentifierStr={WorkstreamIdentifiers.data[0].identifierOptions[0]}
      defaultCriteria={defaultCriteria}
      onChangeSearchQuery={mockOnChange}
      defaultInitializers={defaultInitializers}
    />);

    await waitFor(() => {
      fireEvent.click(getByText('Clear').closest('button'));
    });

    await waitFor(() => {
      expect(queryAllByText('Search Fields')).toHaveLength(1);
      expect(queryByText(defaultCriteria)).toBeNull();
    });
  });
});
