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
  images,
  children,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ImagePath1 = 'https://picsum.photos/id/273/400/400';

  let imgIndex = 0;
  const getCarouselThumbs = () => {
    const carouselThumbs = [];

    for (let i = 1; i <= 4; i += 1) {
      if (imgIndex < images.length) {
        carouselThumbs.push(
          <Thumb srcThumb={images[imgIndex]} largeThumb={largeThumb} />,
        );
      }
      imgIndex += 1;
    }
    return carouselThumbs;
  };
  const getCarouselItems = () => {
    const loopCount = (images.length) / 4;
    const carouselItem = [];
    for (let i = 0; i < loopCount; i += 1) {
      carouselItem.push(
        <BootstrapCarousel.Item>
          <div className="d-flex justify-content-center carousel-thumbnails">
            {getCarouselThumbs()}
          </div>
        </BootstrapCarousel.Item>,
      );
    }
    return carouselItem;
  };

  return (
    <div className={`${className}`}>
      {children}
      {largeThumb && (
        <div className="position-relative imgWrapper h-auto">
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
      <BootstrapCarousel indicators={false} prevLabel={null} nextLabel={null} className="mb-8">
        {getCarouselItems()}
      </BootstrapCarousel>
    </div>
  );
}

Carousel.propTypes = {
  largeThumb: PropTypes.bool,
  className: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

Carousel.defaultProps = {
  largeThumb: false,
  className: null,
  children: null,
};

export default Carousel;
