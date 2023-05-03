import { render } from 'TestUtils';
import { fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import apiInstance from 'apis/apiInstance';
import WorkstreamIdentifiers from 'testing-resources/workstreams/patents/identifiers.json';
import WorkstreamList from 'testing-resources/workstreams/workstreams.json';
import I18n from 'i18n';
import validationMessages from 'utils/validationMessages';
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
  const t = (key, options) => I18n.t(key, { ...options });

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
      expect(getByText(t('search:searchFields'))).toBeInTheDocument();
      expect(getByText(t('search:criteria'))).toBeInTheDocument();
      expect(getByText(t('search:condition'))).toBeInTheDocument();
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
      expect(queryAllByText(t('search:searchFields'))).toHaveLength(1);
    });

    await waitFor(() => {
      fireEvent.click(getByText(t('search:addSearchField')).closest('button'));
    });

    await waitFor(() => {
      expect(queryAllByText(t('search:searchFields'))).toHaveLength(2);
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
      fireEvent.click(getByText(t('search:clear')).closest('button'));
    });

    await waitFor(() => {
      expect(queryAllByText(t('search:searchFields'))).toHaveLength(1);
      expect(queryByText(defaultCriteria)).toBeNull();
    });
  });
  it('display errors correctly', async () => {
    const {
      getByText, queryAllByText,
    } = render(<SearchQuery
      workstreamId={WorkstreamList.data[0].id}
      firstIdentifierStr={WorkstreamIdentifiers.data[0].identifierOptions[0]}
      onChangeSearchQuery={mockOnChange}
      defaultInitializers={defaultInitializers}
      submitRef={{ current: { handleSubmit: () => {} } }}
    />);

    await waitFor(() => {
      fireEvent.click(getByText(t('search:clear')));
    });

    await waitFor(() => {
      fireEvent.click(getByText(t('search:apply')));
    });

    await waitFor(() => {
      expect(
        queryAllByText(t(validationMessages.search.required().key)).length,
      ).toEqual(1);
    });
  });
});
