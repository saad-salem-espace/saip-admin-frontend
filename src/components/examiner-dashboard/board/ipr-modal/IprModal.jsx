import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import IprExpand from '../IprExpand';

const IprModal = ({
  documentId,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const assignment = {
    queuePriorityDate: '20-1',
    earliestPriorityDate: '5-20',
  };
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
            assignment={assignment}
            collapseIPR={false}
            documentId={documentId}
            isIPRExpanded
            // onClose={handleCloseIprDetail}
            activeTab={2}
            activeWorkstream={1}
            isCardInprogress
            selectedCardId="1"
            setNotesUpdated
            className="col-lg-12"
            focusMode
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
IprModal.propTypes = {
  documentId: PropTypes.string.isRequired,
};
export default IprModal;
