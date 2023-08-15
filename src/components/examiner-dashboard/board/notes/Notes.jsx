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
  id, disableEditor, disableChangeTab, fireSubmit, changeActiveTab, setFireSubmit,
  setNotesUpdated, fromFocusArea,
}) {
  const { t } = useTranslation('notes');
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noteContent, setNoteContent] = useState();
  const [totalPages, setTotalPages] = useState();
  const [showError, setShowError] = useState(false);
  const [emptyText, setEmptyText] = useState(true);
  const [activeNote, setActiveNote] = useState(null);
  const [newNoteToggle, setNewNoteToggle] = useState(false);
  const loadMoreItems = () => {
    const config = getNotesApi(id, currentPage, true);
    apiInstance.request(config).then((res) => {
      const notesList = [...notes, ...res.data.data];
      if (currentPage === 1) setNotes(res.data.data);
      else setNotes(notesList);

      setTotalPages(res.data.pagination.totalPages);
    });
  };

  useEffect(() => {
    loadMoreItems();
  }, [currentPage]);

  const resetNotes = (toastMessage) => {
    if (currentPage === 1) loadMoreItems();
    else setCurrentPage(1);
    if (activeNote) setActiveNote(null);
    else setNewNoteToggle(!newNoteToggle);
    toastify(
      'success',
      <div>
        <p className="toastifyTitle">
          {toastMessage}
        </p>
      </div>,
    );
  };
  const docId = fromFocusArea ? JSON.parse(localStorage.getItem('FocusDoc'))?.doc?.id : id;

  const saveNoteParams = {
    id: docId,
    noteText: noteContent,
    activeNote,
  };

  const saveNoteConfig = saveNoteApi(saveNoteParams, true);
  const [saveNotesData, executeSaveNote] = useAxios(
    saveNoteConfig,
    { manual: true },
  );

  const isEmptyText = (x) => {
    setEmptyText(x);
  };

  const onSubmitNote = () => {
    if (!emptyText) {
      executeSaveNote();
    }
    setShowError(emptyText);
  };

  const hideError = (hide) => {
    setShowError(!hide);
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
      if (saveNotesData.data.status === 200 && !(saveNotesData.loading)) {
        setFireSubmit(false);
        setNotesUpdated(true);

        if (activeNote) resetNotes(t('noteUpdated'));
        else resetNotes(t('noteAdded'));

        changeActiveTab();
      } else if (!(saveNotesData.loading)) {
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
                <NoteView
                  note={note}
                  setNotesUpdated={setNotesUpdated}
                  resetNotes={resetNotes}
                  key={note.id}
                  setNoteContent={setNoteContent}
                  setActiveNote={setActiveNote}
                  disableEditor={disableEditor}
                />
              </div>
            ))
          }
              {currentPage < totalPages && (
              <div className="text-center">
                <Button onClick={() => setCurrentPage(currentPage + 1)} variant="transparent" text={t('loadMoreNotes')} className="app-text-primary-dark fs-sm font-regular border-0 mb-4" />
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
          isEmptyText={isEmptyText}
          showError={showError}
          hideError={hideError}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          newNoteToggle={newNoteToggle}
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
  changeActiveTab: PropTypes.func.isRequired,
  setFireSubmit: PropTypes.func.isRequired,
  setNotesUpdated: PropTypes.func.isRequired,
  fromFocusArea: PropTypes.bool,
};

Notes.defaultProps = {
  disableEditor: false,
  disableChangeTab: () => {},
  fromFocusArea: false,
};

export default Notes;
