import PropTypes from 'prop-types';
import Button from 'components/shared/button/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsExclamationTriangle } from 'react-icons/bs';
import './modalAlert.scss';
import '../../../assets/styles/common/modal.scss';

const ModalAlert = ({
  title, msg, className, handleConfirm, showModal, hideAlert,
}) => {
  const { t } = useTranslation('translation');
  const handleClose = () => {
    hideAlert();
  };

  return (
    <div>
      <Modal centered show={showModal} onHide={handleClose} className={`${className} border-radius`}>
        <Modal.Header className="border-0 p-4 btn-close-wrappper align-items-start" closeButton>
          <BsExclamationTriangle className="mb-4 fs-32 ms-4" />
        </Modal.Header>
        <Modal.Body className="p-0 text-center">
          <h6 className="mb-4">
            {title}
          </h6>
          <p className="text-gray px-4 mb-8">{msg}</p>
          <div className="border-top d-flex">
            <Button
              text={t('cancel')}
              variant="transparent"
              className="py-2 w-50 border-end text-gray rounded-0"
              size="md"
              onClick={() => { handleClose(); }}
            />
            <Button
              text={t('save')}
              variant="primary"
              className="py-2 w-50 rounded-0"
              size="md"
              onClick={() => { handleConfirm(); handleClose(); }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

ModalAlert.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.node.isRequired,
  className: PropTypes.string,
  handleConfirm: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  hideAlert: PropTypes.func.isRequired,
};

ModalAlert.defaultProps = {
  className: null,
  showModal: true,
};

export default ModalAlert;
