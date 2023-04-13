import { render } from 'TestUtils';
import { fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import apiInstance from 'apis/apiInstance';
import patentIdentifiers from 'testing-resources/workstreams/patents/identifiers.json';
import samplePatent from 'testing-resources/patents/samplePatent.json';
import workstreams from 'testing-resources/workstreams/workstreams.json';
import { trimStringRelativeToSubtext } from 'utils/strings';
import I18n from 'i18n';
import SearchResults from './SearchResults';

const mockAxios = new MockAdapter(apiInstance);

const PER_PAGE = 10;
const TOTAL = 12;
const patentList = Array(TOTAL).fill(samplePatent);

const searchParams = {
  workstreamId: '1',
  q: 'ftxt hasExactly "criteria1" AND ipc hasAll "A01B0001040000,A01B0001060000" OR pd hasAny "2023-03-15,2023-03-29,2023-03-21" NOT ti hasAll "test,sentence separated by space,next,words"',
};

mockAxios.onGet(/\/workstreams\/\d+\/identifiers/).reply(200, patentIdentifiers);
mockAxios.onGet(/\/workstreams/).reply(200, workstreams);

mockAxios.onGet(/\/advanced-search\/?.*/).reply((config) => ([200, {
  data: {
    data: patentList.slice((config.params.page - 1) * 10, config.params.page * 10),
    highlighting: [],
  },
  pagination: {
    per_page: PER_PAGE,
    total: patentList.length,
  },
}]));

let mockCustomSearchParams;
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useSearchParams: () => [
    {
      get: (param) => ((mockCustomSearchParams ?? searchParams)[param]),
      set: (param) => { searchParams.page = param; },
    },
    () => {},
  ],
}));

describe('<SearchResult />', () => {
  beforeEach(() => {
    mockCustomSearchParams = undefined;
  });
  const t = (key, options) => I18n.t(key, { ...options });
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
      expect(
        getByText('Full-text: Has Exactly: "criteria1" AND IPC: Has All: "A01B0001040000,A01B0001060000" OR Publication Date: Has Any: "2023-03-15,2023-03-29,2023-03-21" NOT Title: Has All: "test,sentence separated by space,next,words"'),
      ).toBeInTheDocument();
      expect(getByText(TOTAL)).toBeInTheDocument();
      expect(getByText(TOTAL)).toHaveClass('font-medium');
    });
  });

  it('should display number of fields correctly', async () => {
    const { queryAllByText } = render(<SearchResults />);

    await waitFor(() => {
      expect(queryAllByText(t('search:searchFields'))).toHaveLength(4);
    });
  });

  it('should display fields conditions correctly', async () => {
    const { queryAllByText } = render(<SearchResults />);

    await waitFor(() => {
      expect(queryAllByText(t('Has Exactly'))).toHaveLength(1);
      expect(queryAllByText(t('Has All'))).toHaveLength(2);
      expect(queryAllByText(t('Has Any'))).toHaveLength(1);
    });
  });

  it('should display fields criteria correctly', async () => {
    const { getByDisplayValue } = render(<SearchResults />);

    await waitFor(() => {
      expect(getByDisplayValue('criteria1')).toBeInTheDocument();
      expect(getByDisplayValue('15 March 2023, 29 March 2023, 21 March 2023')).toBeInTheDocument();
      expect(getByDisplayValue('test "sentence separated by space" next words')).toBeInTheDocument();
    });
  });

  describe('When query is empty', () => {
    beforeEach(() => {
      mockCustomSearchParams = { ...searchParams, q: '' };
    });

    it('should display empty field', async () => {
      const { queryAllByText, queryAllByDisplayValue } = render(<SearchResults />);

      await waitFor(() => {
        expect(
          queryAllByText(patentIdentifiers.data[0].identifierOptions[0].optionName),
        ).toHaveLength(1);
        expect(queryAllByDisplayValue('').length).toBeGreaterThanOrEqual(1);
        expect(queryAllByText(patentIdentifiers.data[0].identiferName)).toHaveLength(1);
      });
    });

    // it('should not display query in search unless criteria is not empty', async () => {
    //   const { getByTestId } = render(<SearchResults />);

    //   await waitFor(() => {
    //     expect(getByTestId('test-searchQuery')).toBeEmpty();
    //   });
    //   await waitFor(() => {
    //     fireEvent.change(getByTestId('test-searchFields.0.data'),
    // { target: { value: 'some text' } });
    //   });
    //   await waitFor(() => {
    //     expect(getByTestId('test-searchQuery')).toHaveDisplayValue(
    //       `${patentIdentifiers.data[0].identiferStrId}
    // ${patentIdentifiers.data[0].identifierOptions[0].optionParserName} "some text"`,
    //     );
    //   });
    // });
  });
});
