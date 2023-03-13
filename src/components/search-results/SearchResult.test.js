import { render } from 'TestUtils';
import { fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import apiInstance from 'apis/apiInstance';
import patentIdentifiers from 'testing-resources/workstreams/patents/identifiers.json';
import samplePatent from 'testing-resources/patents/samplePatent.json';
import WorkstreamList from 'testing-resources/workstreams/workstreams.json';
import { search } from 'utils/arrays';
import { trimStringRelativeToSubtext } from 'utils/strings';
import SearchResults from './SearchResults';

const mockAxios = new MockAdapter(apiInstance);

const PER_PAGE = 10;
const TOTAL = 12;
const patentList = Array(TOTAL).fill(samplePatent);

const searchParams = { workstreamId: 1, identifierStrId: 'ti', query: 'test' };

mockAxios.onGet(/\/workstreams\/\d+\/identifiers/).reply(200, { data: patentIdentifiers });

mockAxios.onGet('workstreams').reply(200, WorkstreamList);

mockAxios.onGet(/\/search\/?.*/).reply((config) => ([200, {
  data: patentList.slice((config.params.page - 1) * 10, config.params.page * 10),
  pagination: {
    per_page: PER_PAGE,
    total: patentList.length,
  },
}]));

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useSearchParams: () => [
    {
      get: (param) => (searchParams[param]),
      set: (param) => { searchParams.page = param; },
    },
    () => {},
  ],
}));

describe('<SearchResult />', () => {
  it('should render pagination correctly', async () => {
    const { queryAllByText, getByLabelText } = render(<SearchResults />);

    await waitFor(() => {
      expect(queryAllByText(trimStringRelativeToSubtext(samplePatent.BibliographicData.ApplicationTitle, 'test', 100, 100))).toHaveLength(PER_PAGE);
    });
    await waitFor(() => {
      fireEvent.click(getByLabelText('Next').closest('a'));
    });
    await waitFor(() => {
      expect(queryAllByText(trimStringRelativeToSubtext(samplePatent.BibliographicData.ApplicationTitle, 'test', 100, 100))).toHaveLength(2);
    });
  });
  it('should render the component data correctly', async () => {
    const { getByText } = render(<SearchResults />);

    await waitFor(() => {
      expect(getByText(`${search(patentIdentifiers, 'identiferStrId', searchParams.identifierStrId).identiferName}: “${searchParams.query}”`)).toBeInTheDocument();
      expect(getByText(TOTAL)).toBeInTheDocument();
      expect(getByText(TOTAL)).toHaveClass('font-medium');
    });
  });
});
