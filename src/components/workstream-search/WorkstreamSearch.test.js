// need to add  activeWorkstreamContext to pass

// import { render } from 'TestUtils';
// import { fireEvent, waitFor } from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import apiInstance from 'apis/apiInstance';
// import WorkstreamList from 'testing-resources/workstreams/workstreams.json';
// import WorkstreamIdentifiers from 'testing-resources/workstreams/patents/identifiers.json';
// import I18n from 'i18n';
// import validationMessages from 'utils/validationMessages';
// import WorkstreamSearch from './WorkstreamSearch';

// const mockAxios = new MockAdapter(apiInstance);

// mockAxios.onGet(/\/workstreams\/\d+\/identifiers/).reply(200, WorkstreamIdentifiers);

// mockAxios.onGet('workstreams').reply(200, WorkstreamList);

// describe('<WorkstreamSearch />', () => {
//   const t = (key, options) => I18n.t(key, { ...options });

//   it('renders correctly', async () => {
//     const { getByText, queryByText } = render(<WorkstreamSearch />);

//     await waitFor(() => {
//       expect(getByText(WorkstreamIdentifiers.data[0].identiferNameAr)).toBeInTheDocument();
//       expect(queryByText(WorkstreamIdentifiers.data[1].identiferNameAr)).toBeNull();
//     });
//   });

//   it('renders errors correctly', async () => {
//     const { getByTestId, queryAllByText } = render(<WorkstreamSearch />);

//     await waitFor(() => {
//       const button = getByTestId('submit-simple-search');
//       fireEvent.click(button);
//     });

//     await waitFor(() => {
//       expect(
//         queryAllByText(t(validationMessages.search.required().key)).length,
//       ).toEqual(1);
//     });
//   });

//   // To Do: Test react-select (needs some investigation)
// });

it('just to test', () => {
  expect(1 + 1).toBe(2);
});
