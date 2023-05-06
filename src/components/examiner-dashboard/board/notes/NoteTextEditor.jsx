import Button from 'components/shared/button/Button';
import TextEditor from 'components/shared/text-editor/TextEditor';
import UserAvatar from 'components/shared/user-avatar/UserAvatar';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import PropTypes from 'prop-types';
import { useState } from 'react';

function NoteTextEditor({
  onSubmit, setNoteText, disableEditor, disableChangeTab,
}) {
  const { t } = useTranslation('notes');
  const auth = useAuth();
  const [submitNote, setSubmitNote] = useState();

  const SubmitNote = (i) => {
    setSubmitNote(!i);
  };
  return (
    <div className="d-md-flex align-items-start dashboard-notes border-top px-5 pt-5 bg-white">
      <UserAvatar name={auth.user?.profile.preferred_username} size="48" className="me-md-4" />
      <TextEditor
        className="flex-grow-1 notes-editor"
        maxLength={1000}
        setNoteText={setNoteText}
        disableEditor={disableEditor}
        disableChangeTab={disableChangeTab}
        SubmitNote={SubmitNote}
      />
      <Button text={t('add')} variant="primary" className="ms-md-4" size="sm" onClick={submitNote ? onSubmit : null} />
    </div>
  );
}

NoteTextEditor.propTypes = {
  setNoteText: PropTypes.func.isRequired,
  disableEditor: PropTypes.bool,
  disableChangeTab: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

NoteTextEditor.defaultProps = {
  disableEditor: false,
  disableChangeTab: () => {},
};

export default NoteTextEditor;
