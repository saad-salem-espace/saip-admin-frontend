/* eslint-disable xss/no-mixed-html */
/* eslint-disable react/no-danger */
import UserAvatar from 'components/shared/user-avatar/UserAvatar';
import PropTypes from 'prop-types';
import { calculateDifference } from 'utils/dates';
import { useTranslation } from 'react-i18next';
import EditAndDeleteMenu from './edit-and-delete/EditAndDeleteMenu';

import './notes.scss';

function NoteView({
  note, setNotesUpdated, resetNotes, setActiveNote, disableEditor,
}) {
  const { t } = useTranslation('notes');
  return (
    <div className="note-view rounded p-6 shadow-sm mb-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center mb-4 me-2">
          <UserAvatar name={note.user?.preferredUsername} size="32" className="xs-text me-4" />
          <h6 className="mb-0 text-gray-700 me-4">
            {note.user?.preferredUsername}
          </h6>
          <p className="text-gray mb-0 fs-sm">
            {calculateDifference(note.createdAt)}
            {t('day')}
          </p>
        </div>
        {!disableEditor && <EditAndDeleteMenu
          note={note}
          setNotesUpdated={setNotesUpdated}
          resetNotes={resetNotes}
          setActiveNote={setActiveNote}
        />}
      </div>
      <div className="mb-0 text-gray sm-text" dangerouslySetInnerHTML={{ __html: note.noteText }} />
    </div>
  );
}
NoteView.propTypes = {
  note: PropTypes.instanceOf(Object).isRequired,
  setNotesUpdated: PropTypes.func.isRequired,
  resetNotes: PropTypes.func.isRequired,
  setActiveNote: PropTypes.func.isRequired,
  disableEditor: PropTypes.bool.isRequired,
};

export default NoteView;
