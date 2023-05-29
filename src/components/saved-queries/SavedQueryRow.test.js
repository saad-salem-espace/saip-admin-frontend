import { render } from 'TestUtils';
import sampleSavedQueries from 'testing-resources/saved-queries/savedQueries.json';
import { waitFor } from '@testing-library/react';
import Moment from 'moment';
import SavedQueryRow from './SavedQueryRow';
import { LONG_DATETIME_12H_FORMAT } from '../../constants';

describe('<SavedQueryRow />', () => {
  const queryDate = Moment(sampleSavedQueries.createdAt).format(LONG_DATETIME_12H_FORMAT);

  it('renders component successfully', async () => {
    const { getByText } = render(
      <SavedQueryRow query={sampleSavedQueries} />,
    );
    await waitFor(() => {
      expect(getByText(sampleSavedQueries.queryString)).toBeInTheDocument();
      expect(getByText(queryDate)).toBeInTheDocument();
      expect(getByText(sampleSavedQueries.resultCount)).toBeInTheDocument();
    });
  });
});
