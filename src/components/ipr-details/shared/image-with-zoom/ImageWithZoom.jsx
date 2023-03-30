import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const ImageWithZoom = ({ img, className }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={`position-relative imgWrapper m-auto ${className} `}>
      <Image src={img} className="img" />
      <div className="overlay">
        <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="f-24 text-white" />
        </Button>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Body className="p-0">
            <Image src={img} className="innerImg" />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

ImageWithZoom.propTypes = {
  img: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ImageWithZoom.defaultProps = {
  className: null,
};

export default ImageWithZoom;
