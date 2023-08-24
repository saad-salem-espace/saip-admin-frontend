import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
// import searchImg from '../../../../assets/images/icons/search-image.svg';

const ImageWithZoom = ({ img, className, fromFocusArea }) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation('error');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={`position-relative imgWrapper m-auto ${className} `}>
      <Image src={img} className="img" alt={t('imgNotAvailable')} />
      <div className="overlay">
        {/* <Button variant="transparent" className="border-0 icon">
          <Image
            src={searchImg}
            className="fs-base"
          />
        </Button> */}
        <Button variant="transparent" onClick={handleShow} className="border-0 px-2 icon">
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="fs-24 text-white" />
        </Button>
        <Modal centered show={show} onHide={handleClose} className={`${fromFocusArea ? 'thumb-focus-area' : ''}`}>
          <Modal.Body className="p-0">
            <Image src={img} className="innerImg" alt={t('imgNotAvailable')} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

ImageWithZoom.propTypes = {
  img: PropTypes.string.isRequired,
  className: PropTypes.string,
  fromFocusArea: PropTypes.bool,
};

ImageWithZoom.defaultProps = {
  className: null,
  fromFocusArea: false,
};

export default ImageWithZoom;
