import Button from 'components/shared/button/Button';
import TextEditor from 'components/shared/text-editor/TextEditor';
import UserAvatar from 'components/shared/user-avatar/UserAvatar';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import PropTypes from 'prop-types';
import { useState } from 'react';

function NoteTextEditor({
  onSubmit, setNoteText, disableEditor, disableChangeTab, showError, isEmptyText, hideError,
  activeNote, setActiveNote, newNoteToggle,
}) {
  const { t } = useTranslation(['notes', 'translation']);
  const auth = useAuth();
  const [submitNote, setSubmitNote] = useState();

  const SubmitNote = (i) => {
    setSubmitNote(!i);
  };

  return (
    <div className="d-md-flex align-items-start dashboard-notes border-top px-5 pt-5">
      <UserAvatar name={auth.user?.profile.preferred_username} size="48" className="me-md-4 mb-md-0 mb-2" />
      <TextEditor
        className="flex-grow-1 notes-editor"
        maxLength={1000}
        setNoteText={setNoteText}
        disableEditor={disableEditor}
        disableChangeTab={disableChangeTab}
        SubmitNote={SubmitNote}
        isEmptyText={isEmptyText}
        showError={showError}
        hideError={hideError}
        activeNote={activeNote}
        newNoteToggle={newNoteToggle}
      />
      <div className="d-flex flex-column">
        <Button text={activeNote ? t('update') : t('add')} variant="primary" className="ms-md-4" size="sm" onClick={submitNote ? onSubmit : null} />
        {
        activeNote && (
          <Button text={t('translation:cancel')} variant="outline-primary" className="ms-md-4 mt-4" size="sm" onClick={() => setActiveNote(null)} />
        )
      }
      </div>
    </div>
  );
}

NoteTextEditor.propTypes = {
  setNoteText: PropTypes.func.isRequired,
  disableEditor: PropTypes.bool,
  disableChangeTab: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  isEmptyText: PropTypes.func.isRequired,
  showError: PropTypes.bool.isRequired,
  hideError: PropTypes.func.isRequired,
  newNoteToggle: PropTypes.bool.isRequired,
  activeNote: PropTypes.instanceOf(Object).isRequired,
  setActiveNote: PropTypes.func.isRequired,
};

NoteTextEditor.defaultProps = {
  disableEditor: false,
  disableChangeTab: () => {},
};

export default NoteTextEditor;
