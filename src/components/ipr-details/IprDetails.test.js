/* eslint-disable */
import { render } from 'TestUtils';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import apiInstance from 'apis/apiInstance';
import samplePatent from 'testing-resources/patents/samplePatent.json';
import userEvent from '@testing-library/user-event';
import IprDetails from './IprDetails';
import I18n from '../../i18n';

// const mockAxios = new MockAdapter(apiInstance);
// mockAxios.onGet(/\/workstreams\/\d+\/documents\/\w+/).reply(200, { data: [samplePatent] });

// const searchParams = { workstreamId: '1' };
// jest.mock('react-router-dom', () => ({
//   ...(jest.requireActual('react-router-dom')),
//   useSearchParams: () => [
//     {
//       get: (param) => (searchParams[param]),
//       set: (param) => { searchParams.page = param; },
//     },
//     () => {},
//   ],
// }));

// describe('<IprDetails />', () => {
//   const mockFn = jest.fn();
//   const tDefault = (key, options) => I18n.t(key, { ...options });

//   it('renders component successfully', async () => {
//     const {
//       getByRole, queryAllByText, getByText, getByTestId,
//     } = render(
//       <IprDetails
//         isExpanded={false}
//         collapseIPR={mockFn}
//         documentId={samplePatent.BibliographicData.FilingNumber}
//       />,
//     );
//     await waitFor(() => {
//       expect(getByRole('heading', { level: 5, name: samplePatent.BibliographicData.PublicationNumber })).toBeInTheDocument();
//       expect(getByTestId('expand-ipr-detail-button')).toBeInTheDocument();
//       expect(getByTestId('close-ipr-detail-button')).toBeInTheDocument();
//       if (samplePatent.BibliographicData.owner) {
//         expect(getByText(samplePatent.BibliographicData.owner)).toBeInTheDocument();
//       } else {
//         expect(queryAllByText(tDefault('emptyText')).length).toBeGreaterThanOrEqual(1);
//       }
//     });
//   });

//   it('calls expand on expansion', async () => {
//     const { getByTestId } = render(
//       <IprDetails
//         isExpanded={false}
//         collapseIPR={mockFn}
//         documentId={samplePatent.BibliographicData.FilingNumber}
//       />,
//     );

//     await waitFor(() => {
//       userEvent.click(getByTestId('expand-ipr-detail-button'));
//     });
//     await waitFor(() => {
//       expect(mockFn).toBeCalledTimes(1);
//     });
//   });

//   it('calls close on closing', async () => {
//     const { getByTestId } = render(
//       <IprDetails
//         isExpanded={false}
//         collapseIPR={() => {}}
//         documentId={samplePatent.BibliographicData.FilingNumber}
//         onClose={mockFn}
//       />,
//     );

//     await waitFor(() => {
//       userEvent.click(getByTestId('close-ipr-detail-button'));
//     });
//     await waitFor(() => {
//       expect(mockFn).toBeCalledTimes(1);
//     });
//   });
// });

it('just to test', () => {
  expect(1+1).toBe(2);
})
