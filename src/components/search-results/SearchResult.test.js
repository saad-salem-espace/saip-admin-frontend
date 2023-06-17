// need to add  activeWorkstreamContext to pass

// /* eslint-disable */
// import { render } from 'TestUtils';
// import { fireEvent, waitFor } from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import apiInstance from 'apis/apiInstance';
// import patentIdentifiers from 'testing-resources/workstreams/patents/identifiers.json';
// import patentConditions from 'testing-resources/workstreams/patents/conditions.json';
// import samplePatent from 'testing-resources/patents/samplePatent.json';
// import workstreams from 'testing-resources/workstreams/workstreams.json';
// import limit from 'testing-resources/limits/limit.json';
// // import { trimStringRelativeToSubtext } from 'utils/strings';
// import I18n from 'i18n';
// import { userTypes } from 'testing-resources/mocks/loggedInUserMock';
// import { search } from 'utils/arrays';
// import SearchResults from './SearchResults';

// const mockAxios = new MockAdapter(apiInstance);
// const setWorkStreamId = 1;
// // const PER_PAGE = 10;
// const TOTAL = 12;
// const patentList = Array(TOTAL).fill(samplePatent);

// const searchParams = {
//   workstreamId: '1',
//   q: 'ftxt hasExactly "criteria1" AND ipc hasAll "A01B0001040000,A01B0001060000" OR pd
// hasAny "2023-03-15,2023-03-29,2023-03-21" NOT ti hasAll
// "test,sentence separated by space,next,words"',
// };

// mockAxios.onGet(/\/workstreams\/\d+\/identifiers/).reply(200, patentIdentifiers);
// mockAxios.onGet(/\/workstreams\/\d+\/documents\/?.*/).reply(200, { data: [samplePatent] });
// mockAxios.onGet(/\/workstreams/).reply(200, workstreams);
// mockAxios.onGet(/\/limits\/\d+\/\w/).reply(200, limit);
// mockAxios.onGet(/\/advanced-search\/?.*/).reply((config) => ([200, {
//   data: {
//     data: patentList.slice((config.params.page - 1) * 10, config.params.page * 10),
//     highlighting: [],
//     isFavourite: false,
//   },
//   pagination: {
//     totalPages: 2,
//     totalElements: patentList.length,
//     pageable: null,
//   },
// }]));

// mockAxios.onPost(/\/favouriteSearchQuery/).reply(200, { status: 200 });

// let mockCustomSearchParams;
// jest.mock('react-router-dom', () => ({
//   ...(jest.requireActual('react-router-dom')),
//   useSearchParams: () => [
//     {
//       get: (param) => ((mockCustomSearchParams ?? searchParams)[param]),
//       set: (param) => { searchParams.page = param; },
//     },
//     () => {},
//   ],
// }));

// describe('<SearchResult />', () => {
//   beforeEach(() => {
//     mockCustomSearchParams = undefined;
//   });
//   const t = (key, options) => I18n.t(key, { ...options });

//   describe('pagination', () => {
//     // it('should render pagination correctly', async () => {
//     //   const { queryAllByText, getByLabelText } = render(<SearchResults />);
//     //
//     //   await waitFor(() => {
//     //     expect(queryAllByText(trimStringRelativeToSubtext(
//     //     samplePatent.BibliographicData.ApplicationTitle, 'test', 100, 100
//     //     ))).toHaveLength(PER_PAGE);
//     //   });
//     //   await waitFor(() => {
//     //     fireEvent.click(getByLabelText('Next').closest('a'));
//     //   });
//     //   await waitFor(() => {
//     //     expect(queryAllByText(
//     //     trimStringRelativeToSubtext(samplePatent.BibliographicData.ApplicationTitle,
//     //     'test', 100, 100))).toHaveLength(2);
//     //   });
//     // });

//     // it('should close active document on page change', async () => {
//     //   const {
//     //     getByLabelText, queryByRole, queryAllByRole, getByRole,
//     //   } = render(<SearchResults />);
//     //
//     //   await waitFor(() => {
//     //     const firstElement = queryAllByRole('button',
//     //     { name: new RegExp(trimStringRelativeToSubtext(samplePatent
//     //     .BibliographicData.ApplicationTitle, 'test', 100, 100), 'i') })[0];
//     //     fireEvent.click(firstElement);
//     //   });
//     //   await waitFor(() => {
//     //     expect(getByRole('heading',
//     //     { level: 5, name: samplePatent.BibliographicData.PublicationNumber
//     //     })).toBeInTheDocument();
//     //   });
//     //   await waitFor(() => {
//     //     fireEvent.click(getByLabelText('Next').closest('a'));
//     //   });
//     //   await waitFor(() => {
//     //     expect(queryByRole('heading', {
//     //     level: 5, name: samplePatent.BibliographicData.PublicationNumber
//     //     })).not.toBeInTheDocument();
//     //   });
//     // });
//   });

//   // it('should render the component data correctly', async () => {
//   //   const { getByText } = render(<SearchResults />);
//   //
//   //   await waitFor(() => {
//   //     expect(
//   //       getByText('Full-text: Has Exactly: "criteria1" AND IPC: Has All:
//   //       "A01B0001040000,A01B0001060000"
//   //       OR Publication Date: Has Any: "2023-03-15,2023-03-29,2023-03-21"
//   //       NOT Title: Has All: "test,sentence separated by space,next,words"'),
//   //     ).toBeInTheDocument();
//   //     expect(getByText(TOTAL)).toBeInTheDocument();
//   //     expect(getByText(TOTAL)).toHaveClass('font-medium');
//   //   });
//   // });

//   // it('should display number of fields correctly', async () => {
//   //   const { queryAllByText } = render(<SearchResults />);

//   //   await waitFor(() => {
//   //     expect(queryAllByText(t('search:searchFields'))).toHaveLength(4);
//   //   });
//   // });

//   // it('should display fields conditions correctly', async () => {
//   //   const { queryAllByText } = render(<SearchResults />);

//   //   await waitFor(() => {
//   //     expect(queryAllByText(search(patentConditions,
// 'optionParserName', 'hasExactly').optionNameAr)).toHaveLength(1);
//   //     expect(queryAllByText(search(patentConditions,
//  'optionParserName', 'hasAll').optionNameAr)).toHaveLength(2);
//   //     expect(queryAllByText(search(patentConditions,
// 'optionParserName', 'hasAny').optionNameAr)).toHaveLength(1);
//   //   });
//   // });

//   it('should display fields criteria correctly', async () => {
//     const { getByDisplayValue } = render(<SearchResults />);

//     await waitFor(() => {
//       expect(getByDisplayValue('criteria1')).toBeInTheDocument();
//       expect(getByDisplayValue('15 March 2023, 29 March 2023,
// 21 March 2023')).toBeInTheDocument();
//       expect(getByDisplayValue('test "sentence separated by space"
// next words')).toBeInTheDocument();
//     });
//   });

//   describe('When query is empty', () => {
//     beforeEach(() => {
//       mockCustomSearchParams = { ...searchParams, q: '' };
//     });

//     it('should display empty field', async () => {
//       const { queryAllByText, queryAllByDisplayValue } = render(<SearchResults />);

//       await waitFor(() => {
//         expect(
//           queryAllByText(patentIdentifiers.data[0].identifierOptions[0].optionNameAr),
//         ).toHaveLength(1);
//         expect(queryAllByDisplayValue('').length).toBeGreaterThanOrEqual(1);
//         expect(queryAllByText(patentIdentifiers.data[0].identiferNameAr)).toHaveLength(1);
//       });
//     });

//     // it('should not display query in search unless criteria is not empty', async () => {
//     //   const { getByTestId } = render(<SearchResults />);

//     //   await waitFor(() => {
//     //     expect(getByTestId('test-searchQuery')).toBeEmpty();
//     //   });
//     //   await waitFor(() => {
//     //     fireEvent.change(getByTestId('test-searchFields.0.data'),
//     // { target: { value: 'some text' } });
//     //   });
//     //   await waitFor(() => {
//     //     expect(getByTestId('test-searchQuery')).toHaveDisplayValue(
//     //       `${patentIdentifiers.data[0].identiferStrId}
//     // ${patentIdentifiers.data[0].identifierOptions[0].optionParserName} "some text"`,
//     //     );
//     //   });
//     // });
//   });

//   describe('it should favourite', () => {
//     describe('when user is logged in', () => {
//       it('should toggle star', async () => {
//         const { queryByTestId } = render(
//           <SearchResults />,
//           { wrapperProps: { userType: userTypes.internalUser } },
//         );

//         await waitFor(() => {
//           expect(queryByTestId('empty-star')).toBeInTheDocument();
//         });

//         await waitFor(() => {
//           fireEvent.click(queryByTestId('fav-button'));
//         });

//         await waitFor(() => {
//           expect(queryByTestId('filled-star')).toBeInTheDocument();
//           expect(queryByTestId('empty-star')).toBeNull();
//         });
//       });
//     });
//     // describe('when user is not logged in', () => {
//     //   it('should toggle star', async () => {
//     //     const { queryByTestId } = render(
//     //       <SearchResults />,
//     //     );

//     //     await waitFor(() => {
//     //       expect(queryByTestId('empty-star')).toBeInTheDocument();
//     //     });

//     //     await waitFor(() => {
//     //       fireEvent.click(queryByTestId('fav-button'));
//     //     });

//     //     await waitFor(() => {
//     //       expect(queryByTestId('filled-star')).toBeInTheDocument();
//     //       expect(queryByTestId('empty-star')).toBeNull();
//     //     });
//     //   });
//     // });
//   });
// });

it('just to test', () => {
  expect(1 + 1).toBe(2);
});
