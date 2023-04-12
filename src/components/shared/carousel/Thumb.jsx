import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Thumb({
  largeThumb,
  srcThumb,
  changeActiveImg,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {largeThumb ? (
        <Button variant="transparent" className="item-thumb" onClick={() => changeActiveImg(srcThumb)}>
          <Image src={srcThumb} className="img-fluid" />
        </Button>
      ) : (
        <div className="item-thumb">
          <Image src={srcThumb} className="img-fluid" />
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
        </div>
      )}
    </div>
  );
}
Thumb.propTypes = {
  largeThumb: PropTypes.bool,
  srcThumb: PropTypes.string.isRequired,
  changeActiveImg: PropTypes.func,
};

Thumb.defaultProps = {
  largeThumb: false,
  changeActiveImg: null,
};

export default Thumb;
