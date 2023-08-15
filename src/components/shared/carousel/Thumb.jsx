import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchImageButton from 'components/shared/search-image-button/SearchImageButton';

function Thumb({
  largeThumb,
  srcThumb,
  changeActiveImg,
  fromFocusArea,
  handleCloseIprDetail,
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
        <div className={`${!largeThumb ? 'sm-thumb' : ''} item-thumb`}>
          <Image src={srcThumb} className="img-fluid" />
          <div className="overlay">
            <SearchImageButton imgSrc={srcThumb} handleCloseIprDetail={handleCloseIprDetail} />
            <Button variant="transparent" onClick={handleShow} className="border-0 px-2 icon">
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="fs-base text-white" />
            </Button>
            <Modal centered show={show} onHide={handleClose} className={`${fromFocusArea ? 'thumb-focus-area' : ''}`}>
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
  fromFocusArea: PropTypes.bool,
  handleCloseIprDetail: PropTypes.func.isRequired,
};

Thumb.defaultProps = {
  largeThumb: false,
  changeActiveImg: null,
  fromFocusArea: false,
};

export default Thumb;
