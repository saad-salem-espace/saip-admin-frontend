import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SearchImageButton from 'components/shared/search-image-button/SearchImageButton';

function Thumb({
  largeThumb,
  srcThumb,
  changeActiveImg,
  fromFocusArea,
  handleCloseIprDetail,
}) {
  const { t } = useTranslation('error');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isCorrupt, setIsCorrupt] = useState(false);

  return (
    <div>
      {largeThumb ? (
        <Button variant="transparent" className="item-thumb" onClick={() => changeActiveImg(srcThumb)}>
          <Image src={srcThumb} className="img-fluid" alt={t('imgNotAvailable')} />
        </Button>
      ) : (
        <div className={`${!largeThumb ? 'sm-thumb' : ''} item-thumb`}>
          <Image src={srcThumb} className="img-fluid" alt={t('imgNotAvailable')} onError={() => setIsCorrupt(true)} />
          <div className="overlay">
            {!isCorrupt
            && <SearchImageButton imgSrc={srcThumb} handleCloseIprDetail={handleCloseIprDetail} />}
            {!isCorrupt
            && <Button variant="transparent" onClick={handleShow} className="border-0 px-2 icon">
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="fs-base text-white" />
              {/* eslint-disable-next-line react/jsx-closing-tag-location */}
            </Button>}
            <Modal centered show={show} onHide={handleClose} className={`${fromFocusArea ? 'thumb-focus-area' : ''}`}>
              <Modal.Body className="p-0">
                <Image src={srcThumb} className="w-100 h-auto" alt={t('imgNotAvailable')} />
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
