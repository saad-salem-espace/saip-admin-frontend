import BootstrapCarousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Thumb from './Thumb';
import './style.scss';

function Carousel({
  largeThumb,
  className,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ImagePath1 = 'https://picsum.photos/id/273/400/400';
  const ImagePath2 = 'https://picsum.photos/id/250/400/400';
  return (
    <>
      { largeThumb && (
        <div className="position-relative imgWrapper h-auto w-100 m-0">
          <Image src={ImagePath1} className="img-fluid object-fit-cover w-100 h-auto" />
          <div className="overlay">
            <Button variant="transparent" onClick={handleShow} className="border-0 w-100 h-100">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="f-24 text-white" />
            </Button>
            <Modal centered show={show} onHide={handleClose}>
              <Modal.Body className="p-0">
                <Image src={ImagePath1} className="w-100 h-auto" />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
      <BootstrapCarousel indicators={false} prevLabel={null} nextLabel={null} className={`${className} mb-8`}>
        <BootstrapCarousel.Item>
          <div className="d-flex justify-content-center carousel-thumbnails">
            <Thumb srcThumb={ImagePath1} largeThumb={largeThumb} />
            <Thumb srcThumb={ImagePath1} largeThumb={largeThumb} />
            <Thumb srcThumb={ImagePath1} largeThumb={largeThumb} />
          </div>
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <div className="d-flex justify-content-center carousel-thumbnails">
            <Thumb srcThumb={ImagePath2} largeThumb={largeThumb} />
            <Thumb srcThumb={ImagePath2} largeThumb={largeThumb} />
            <Thumb srcThumb={ImagePath2} largeThumb={largeThumb} />
          </div>
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
    </>
  );
}

Carousel.propTypes = {
  largeThumb: PropTypes.bool,
  className: PropTypes.string,
};

Carousel.defaultProps = {
  largeThumb: false,
  className: null,
};

export default Carousel;
