import { render } from 'TestUtils';
import { LIMITS } from 'utils/manageLimits';
import {
  act, fireEvent, waitFor,
} from '@testing-library/react';
import limit from 'testing-resources/limits/limit.json';
import MockAdapter from 'axios-mock-adapter';
import SaveQuery from './SaveQuery';
import apiInstance from '../../apis/apiInstance';
import I18n from '../../i18n';

const mockAxios = new MockAdapter(apiInstance);
describe('<SaveQuery />', () => {
  const t = (key, options) => I18n.t(key, { ...options });
  describe('when user is not logged in', () => {
    [
      {
        description: 'on reaching limit', testDesc: 'not able to star query', successStarred: false, limitValue: 0, status: 200, limitReached: true,
      },
      {
        description: 'on exceeding limit', testDesc: 'not able to star query', successStarred: false, limitValue: 0, status: 200, limitReached: true,
      },
      {
        description: 'before reaching limit', testDesc: 'able to star query', successStarred: true, limitValue: 100, status: 200, limitReached: false,
      },
    ].forEach((testDetail) => {
      describe(testDetail.description, () => {
        const mockFn = jest.fn();
        const clonedLimit = { ...limit };
        beforeEach(() => {
          clonedLimit.data[0].limitValue = testDetail.limitValue;
          mockAxios.onGet(/\/limits\/\d+\/\w/).reply(testDetail.status, clonedLimit);
        });
        it('should be able to star query', async () => {
          const { getByTestId, getByText } = render(
            <SaveQuery
              setIsSaved={mockFn}
              isSaved={false}
              limitCode={LIMITS.SAVED_QUERY_LIMIT}
              saveQueryParams={{ workstreamId: 1, workstreamKey: 'workstreamId' }}
              showFocusArea={false}
              saveQueryParamsForDo={{}}
            />,
          );
          await act(async () => {
            await waitFor(() => {
              const star = getByTestId('empty-star');
              expect(star).toBeInTheDocument();
              fireEvent.click(star);
            });
            await waitFor(() => {
              if (testDetail.successStarred) {
                expect(mockFn).toBeCalledWith(true);
                expect(getByText(t('search:querySaved'))).toBeInTheDocument();
              } else {
                expect(mockFn).not.toBeCalled();
                if (testDetail.limitReached) {
                  expect(getByText(t('common:limitReached.register_now'))).toBeInTheDocument();
                  expect(getByText(t('common:limitReached.register_now_msg'))).toBeInTheDocument();
                }
              }
            });
          });
        });
      });
    });
  });
});
