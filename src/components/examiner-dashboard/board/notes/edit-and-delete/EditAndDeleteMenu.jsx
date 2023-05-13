import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import ModalAlert from 'components/shared/modal-alert/ModalAlert';
import '../../../../../assets/styles/common/dropdown-menu.scss';

function EditAndDeleteMenu() {
  const { t } = useTranslation('notes');
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteNote = () => {
    setShowAlert(true);
  };
  // const handleEditNote = () => {

  // };
  const handleConfirm = () => {
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

export default EditAndDeleteMenu;
