import Spinner from 'components/shared/spinner/Spinner';
import { useTranslation } from 'react-i18next';
import Button from 'components/shared/button/Button';
import EmptyState from 'components/shared/empty-state/EmptyState';
import PropTypes from 'prop-types';
import apiInstance from 'apis/apiInstance';
import getNotesApi from 'apis/notes/getNotesApi';
import saveNoteApi from 'apis/notes/saveNoteApi';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import NoteView from './NoteView';
import notesImg from '../../../../assets/images/icons/notes.svg';
import NotesTextEditor from './NoteTextEditor';
import './notes.scss';
import toastify from '../../../../utils/toastify';

function Notes({
  id, disableEditor, disableChangeTab, fireSubmit,
}) {
  const { t } = useTranslation('notes');
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noteContent, setNoteContent] = useState();
  const [totalPages, setTotalPages] = useState();

  const config = getNotesApi(id, currentPage, true);
  const loadMoreItems = () => {
    apiInstance.request(config).then((res) => {
      const notesList = [...notes, ...res.data.data];
      setNotes(notesList);
      setTotalPages(res.data.pagination.totalPages);
    });
    setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    loadMoreItems();
  }, []);

  const saveNoteParams = {
    id,
    noteText: noteContent,
  };
  const saveNoteConfig = saveNoteApi(saveNoteParams, true);
  const [saveNotesData, executeSaveNote] = useAxios(
    saveNoteConfig,
    { manual: true },
  );
  const onSubmitNote = () => {
    executeSaveNote();
  };
  useEffect(() => {
    if (fireSubmit) {
      onSubmitNote();
    }
  }, [fireSubmit]);
  const setNoteText = (content) => {
    setNoteContent(content);
  };
  useEffect(() => {
    if (saveNotesData.data) {
      if (saveNotesData.data.status === 200) {
        toastify(
          'success',
          <div>
            <p className="toastifyTitle">
              {t('noteAdded')}
            </p>
          </div>,
        );
      } else {
        toastify(
          'error',
          <div>
            <p className="toastifyTitle">
              {t('noteNotAdded')}
            </p>
          </div>,
        );
      }
    }
  }, [saveNotesData]);

  if (!notes) {
    return <Spinner />;
  }

  return (
    <div className="position-relative h-100">
      <div className="notes-wrapper">
        <div className={`h-100 ${notes.length === 0 ? 'd-flex align-items-center justify-content-center' : ''}`}>
          {notes.length === 0 ? (
            <EmptyState img={notesImg} title={t('noNotes')} titleClassName="md-text text-gray-600" />
          ) : (
            <div className="w-100 pt-8">
              {
            notes.map((note) => (
              <div className="mx-4">
                <NoteView note={note} key={note.id} />
              </div>
            ))
          }
              {currentPage <= totalPages && (
              <div className="text-center">
                <Button onClick={loadMoreItems} variant="transparent" text={t('loadMoreNotes')} className="text-primary-dark f-14 font-regular border-0 mb-4" />
              </div>
              )}
            </div>
          )}

        </div>
      </div>
      <div className="bottom-section">
        <NotesTextEditor
          onSubmit={onSubmitNote}
          setNoteText={setNoteText}
          disableEditor={disableEditor}
          disableChangeTab={disableChangeTab}
        />
      </div>
    </div>
  );
}

Notes.propTypes = {
  id: PropTypes.number.isRequired,
  disableEditor: PropTypes.bool,
  disableChangeTab: PropTypes.func,
  fireSubmit: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  disableEditor: false,
  disableChangeTab: () => {},
};

export default Notes;
