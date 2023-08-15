import { render } from 'TestUtils';
import sampleNotes from 'testing-resources/notes/notes.json';
import { waitFor } from '@testing-library/react';
import { calculateDifference } from 'utils/dates';
import I18n from 'i18n';
import NoteView from './NoteView';

describe('<NoteView />', () => {
  const t = (key, options) => I18n.t(key, { ...options, ns: 'notes' });
  it('renders component successfully', async () => {
    const { getByText } = render(
      <NoteView note={sampleNotes} />,
    );
    await waitFor(() => {
      expect(getByText(sampleNotes.noteText)).toBeInTheDocument();
      expect(getByText(t('day', { value: calculateDifference(sampleNotes.createdAt) }), { exact: false })).toBeInTheDocument();
    });
  });
});
