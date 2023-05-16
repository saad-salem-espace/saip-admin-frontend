import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Button as BootstrapButton, Col } from 'react-bootstrap';
import IprSections from 'components/ipr-details/ipr-sections/IprSections';
import IprDetails from 'components/ipr-details/IprDetails';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

const IprModal = ({
  documentId,
}) => {
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
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="d-lg-flex">
            <Col lg={6} className="border-end">
              <IprDetails
                dashboard
                collapseIPR={false}
                isIPRExpanded
                documentId={documentId}
                activeWorkstream={1}
                showActions={false}
                isCardInprogress
                // selectedCardId="1"
                className="mx-0"
              />
            </Col>
            <Col lg={6}>
              <IprSections
                showInfo={false}
                className="expand-view"
                isCardInprogress
                // selectedCardId="1"
              />
            </Col>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
IprModal.propTypes = {
  documentId: PropTypes.string.isRequired,
};
export default IprModal;
