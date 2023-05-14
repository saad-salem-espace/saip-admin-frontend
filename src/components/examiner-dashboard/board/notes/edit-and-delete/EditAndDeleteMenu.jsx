import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import ModalAlert from 'components/shared/modal-alert/ModalAlert';
import '../../../../../assets/styles/common/dropdown-menu.scss';
import deleteNoteApi from 'apis/notes/deleteNoteApi';
import useAxios from 'hooks/useAxios';
import toastify from 'utils/toastify';

function EditAndDeleteMenu({ note, setNotesUpdated, resetNotes }) {
  const { t } = useTranslation('notes');
  const [showAlert, setShowAlert] = useState(false);

  const deleteNoteParams = {
    id: note.id,
  };
  const deleteNoteConfig = deleteNoteApi(deleteNoteParams, true);

  const [deleteNotesData, executeDeleteNote] = useAxios(
    deleteNoteConfig,
    { manual: true },
  );

  useEffect(() => {
    if (deleteNotesData.data) {
      if (deleteNotesData.data.status === 200 && !(deleteNotesData.loading)) {
        setNotesUpdated(true);
        resetNotes(t('noteDeleted'));
      } else if (!(deleteNotesData.loading)) {
        toastify(
          'error',
          <div>
            <p className="toastifyTitle">
              {t('noteNotDeleted')}
            </p>
          </div>,
        );
      }
    }
  }, [deleteNotesData]);

  const handleDeleteNote = () => {
    setShowAlert(true);
  };
  // const handleEditNote = () => {

  // };
  const handleConfirm = () => {
    executeDeleteNote();
  };
  const hideAlert = () => {
    setShowAlert(false);
  };
  return (
    <div>
      <Dropdown className="default-menu">
        <Dropdown.Toggle align="start" className="" id="dropdown-basic" />
        <Dropdown.Menu>
          {/* <Dropdown.Item onClick={handleEditNote}>
            {t('editNote')}
          </Dropdown.Item> */}
          <Dropdown.Item onClick={handleDeleteNote}>
            {t('deleteNote')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {
      showAlert && (
        <div>
          <ModalAlert
            title={t('deleteNote')}
            msg={
            t('confirmDeleteNote')
          }
            confirmBtnText={t('delete')}
            className="danger"
            handleConfirm={handleConfirm}
            hideAlert={hideAlert}
            variant="danger"
          />
        </div>
      )
    }
    </div>
  );
}

EditAndDeleteMenu.propTypes = {
  note: PropTypes.instanceOf(Object).isRequired,
  setNotesUpdated: PropTypes.func.isRequired,
  resetNotes: PropTypes.func.isRequired,
};

export default EditAndDeleteMenu;
