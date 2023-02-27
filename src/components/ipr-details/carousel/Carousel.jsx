import BootstrapCarousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import c from '../../../assets/images/search-header-bg.svg';

function Carousel() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <BootstrapCarousel indicators={false} prevLabel={null} nextLabel={null} className="mb-8">
      <BootstrapCarousel.Item>
        <div className="d-flex">
          <div className="position-relative imgWrapper">
            <Image src={c} className="img" />
            <div className="overlay">
              <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="f-24 text-white" />
              </Button>
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Body className="p-0">
                  <Image src={c} className="innerImg" />
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="position-relative imgWrapper">
            <Image src={c} className="img" />
            <div className="overlay">
              <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="f-24 text-white" />
              </Button>
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Body className="p-0">
                  <Image src={c} className="innerImg" />
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="position-relative imgWrapper">
            <Image src={c} className="img" />
            <div className="overlay">
              <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="f-24 text-white" />
              </Button>
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Body className="p-0">
                  <Image src={c} className="innerImg" />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item>
        <div className="d-flex">
          <div className="position-relative imgWrapper">
            <Image src={c} className="img" />
            <div className="overlay">
              <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="f-24 text-white" />
              </Button>
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Body className="p-0">
                  <Image src={c} className="innerImg" />
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="position-relative imgWrapper">
            <Image src={c} className="img" />
            <div className="overlay">
              <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="f-24 text-white" />
              </Button>
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Body className="p-0">
                  <Image src={c} className="innerImg" />
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="position-relative imgWrapper">
            <Image src={c} className="img" />
            <div className="overlay">
              <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="f-24 text-white" />
              </Button>
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Body className="p-0">
                  <Image src={c} className="innerImg" />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  );
}

export default Carousel;
