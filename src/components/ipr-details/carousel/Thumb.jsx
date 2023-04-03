import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Thumb({
  enLarge,
  srcThumb,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Button variant="transparent" className="item-thumb">
      <Image src={srcThumb} className="img-fluid" />
      { enLarge && (
        <div className="overlay">
          <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="f-24 text-white" />
          </Button>
          <Modal centered show={show} onHide={handleClose}>
            <Modal.Body className="p-0">
              <Image src={srcThumb} className="w-100 h-auto" />
            </Modal.Body>
          </Modal>
        </div>
      )}
    </Button>
  );
}
Thumb.propTypes = {
  enLarge: PropTypes.bool,
  srcThumb: PropTypes.string.isRequired,
};

Thumb.defaultProps = {
  enLarge: false,
};

export default Thumb;
