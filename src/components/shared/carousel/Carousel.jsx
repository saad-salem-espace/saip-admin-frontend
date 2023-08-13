import BootstrapCarousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import SearchImageButton from 'components/shared/search-image-button/SearchImageButton';
import Thumb from './Thumb';
import './style.scss';

function Carousel({
  largeThumb,
  className,
  images,
  children,
  handleCloseIprDetail,
  fromFocusArea,
}) {
  const [show, setShow] = useState(false);
  const [activeImg, setActiveImg] = useState(images[0]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setActiveImg(images[0]);
  }, [images]);

  const changeActiveImg = (selectedImg) => {
    setActiveImg(selectedImg);
  };

  let imgIndex = 0;
  const getCarouselThumbs = () => {
    const carouselThumbs = [];

    for (let i = 1; i <= 3; i += 1) {
      if (imgIndex < images.length) {
        carouselThumbs.push(
          <Thumb
            largeThumb={largeThumb}
            changeActiveImg={changeActiveImg}
            srcThumb={images[imgIndex]}
            fromFocusArea={fromFocusArea}
          />,
        );
      }
      imgIndex += 1;
    }
    return carouselThumbs;
  };
  const getCarouselItems = () => {
    const loopCount = (images.length) / 3;
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
          <Image src={activeImg} className="img-fluid object-fit-cover w-100 h-auto" />
          <div className="overlay">
            <SearchImageButton imgSrc={activeImg} handleCloseIprDetail={handleCloseIprDetail} />
            <Button variant="transparent" onClick={handleShow} className="border-0 px-2 icon">
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="fs-24 text-white" />
            </Button>
            <Modal centered show={show} onHide={handleClose}>
              <Modal.Body className="p-0">
                <Image src={activeImg} className="w-100 h-auto" />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
      {
         ((largeThumb && images.length > 1) || (!largeThumb)) && (
         <BootstrapCarousel controls={images.length > 3} indicators={false} prevLabel={null} nextLabel={null} className="mb-8">
           {getCarouselItems()}
         </BootstrapCarousel>
         )
      }
    </div>
  );
}

Carousel.propTypes = {
  largeThumb: PropTypes.bool,
  className: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
  handleCloseIprDetail: PropTypes.func.isRequired,
  fromFocusArea: PropTypes.bool,
};

Carousel.defaultProps = {
  largeThumb: false,
  className: null,
  children: null,
  fromFocusArea: false,
};

export default Carousel;
