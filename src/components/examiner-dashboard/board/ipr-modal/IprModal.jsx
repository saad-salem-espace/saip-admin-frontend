import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import IprExpand from '../IprExpand';

const IprModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <BootstrapButton
        onClick={handleShow}
        className="ps-2 py-0 pe-0 text-white expand-icon"
        variant="transparent"
      >
        <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className="me-2" />
      </BootstrapButton>
      <Modal show={show} onHide={handleClose} centered size="xl" className="full-view ipr-modal">
        <Modal.Header className="border-0 py-0 px-4 mt-4 btn-close-wrappper align-items-start fs-base" closeButton />
        <Modal.Body className="px-0 pt-0">
          <IprExpand
            assignment={JSON.parse(localStorage.getItem('FocusDoc'))?.doc}
            collapseIPR={false}
            documentId={JSON.parse(localStorage.getItem('FocusDoc'))?.doc?.filingNumber}
            isIPRExpanded
            // onClose={handleCloseIprDetail}
            activeTab={2}
            activeWorkstream={JSON.parse(localStorage.getItem('FocusDoc'))?.workstreamId}
            isCardInprogress
            selectedCardId={JSON.parse(localStorage.getItem('FocusDoc'))?.doc?.id}
            setNotesUpdated={() => {}}
            className="col-lg-12"
            focusMode
            hideFocus={handleClose}
            updateIprModal={() => setShow(false)}
            fromFocusArea="true"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default IprModal;
