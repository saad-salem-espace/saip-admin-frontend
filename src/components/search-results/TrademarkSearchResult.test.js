import { render } from 'TestUtils';
import { fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import apiInstance from 'apis/apiInstance';
import patentIdentifiers from 'testing-resources/workstreams/patents/identifiers.json';
import workstreams from 'testing-resources/workstreams/workstreams.json';
import { trimStringRelativeToSubtext } from 'utils/strings';
import sampleTrademark from 'testing-resources//trademarks/sampleTrademark.json';
import SearchResults from './SearchResults';

const mockAxios = new MockAdapter(apiInstance);

const PER_PAGE = 10;
const TOTAL = 12;
const trademarkList = Array(TOTAL).fill(sampleTrademark);

const searchParams = { workstreamId: '2', q: 'ftxt hasExactly "test"' };

mockAxios.onGet(/\/workstreams/).reply(200, workstreams);
mockAxios.onGet(/\/workstreams\/\d+\/identifiers/).reply(200, { data: patentIdentifiers }); // will replace it wit trademark identifiers

mockAxios.onGet(/\/advanced-search\/?.*/).reply((config) => ([200, {
  data: trademarkList.slice((config.params.page - 1) * 10, config.params.page * 10),
  pagination: {
    per_page: PER_PAGE,
    total: trademarkList.length,
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
      // will replace ApplicationTitle with BrandNameEn
      expect(queryAllByText(trimStringRelativeToSubtext(sampleTrademark.BibliographicData.ApplicationTitle, 'test', 100, 100))).toHaveLength(PER_PAGE);
    });
    await waitFor(() => {
      fireEvent.click(getByLabelText('Next').closest('a'));
    });
    await waitFor(() => {
      // will replace ApplicationTitle with BrandNameEn
      expect(queryAllByText(trimStringRelativeToSubtext(sampleTrademark.BibliographicData.ApplicationTitle, 'test', 100, 100))).toHaveLength(2);
    });
  });
  it('should render the component data correctly', async () => {
    const { getByText } = render(<SearchResults />);

    await waitFor(() => {
      expect(getByText(TOTAL)).toBeInTheDocument();
      expect(getByText(TOTAL)).toHaveClass('font-medium');
    });
  });
});
