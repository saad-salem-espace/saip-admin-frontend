import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AppModal({
  triggerContent,
  modalHeader,
  children,
  variantTriggerBtn,
  classNameTriggerBtn,
  fullscreen,
  size,
  className,
  classNameModalHeader,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variantTriggerBtn}
        className={classNameTriggerBtn}
      >
        {triggerContent}
      </Button>

      <Modal
        show={show}
        fullscreen={fullscreen}
        onHide={handleClose}
        size={size}
        className={className}
        dialogClassName="modal-90w"
      >
        <Modal.Header className={classNameModalHeader} closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

AppModal.propTypes = {
  children: PropTypes.node.isRequired,
  triggerContent: PropTypes.node.isRequired,
  modalHeader: PropTypes.node.isRequired,
  variantTriggerBtn: PropTypes.string,
  classNameTriggerBtn: PropTypes.string,
  fullscreen: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  classNameModalHeader: PropTypes.string,
};
AppModal.defaultProps = {
  fullscreen: false,
  variantTriggerBtn: '',
  classNameTriggerBtn: '',
  classNameModalHeader: '',
  className: '',
  size: '',
};
export default AppModal;
