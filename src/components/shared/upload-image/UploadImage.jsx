import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'react-bootstrap/Image';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import Spinner from '../spinner/Spinner';

function UploadImage({
  className,
  maxMbFileSize, showUploadImgSection,
  uploadFile, changeIsImgUploaded,
  isSubmitting,
}) {
  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    const activeImage = imageList[imageList.length - 1];
    setImages(activeImage ? [activeImage] : []);
    if (imageList.length !== 0) {
      uploadFile(imageList[0]?.file);
    } else {
      changeIsImgUploaded(false);
    }
  };

  const { t } = useTranslation('search');

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
      acceptType={['png', 'gif', 'jpeg', 'tiff', 'jpg', 'tif']}
      maxFileSize={maxMbFileSize}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemove,
        dragProps,
        errors,
      }) => (
        <>
          <div className={`uploadImageWrapper ${className}`}>
            {
            showUploadImgSection && (
              <div className={` dashedBorder mt-2${errors ? 'error' : ''}`}>
                <div className="uploadImage justify-content-center d-flex">
                  {
                  isSubmitting ? (
                    <Spinner className="my-12" />
                  ) : (
                    <Button
                      variant="transparent"
                      className="app-text-primary-dark fs-base w-100 py-0 border-0"
                      onClick={onImageUpload}
                      {...dragProps}
                      text={
                        <>
                          <div className="icon-file-plus fs-60 mb-2" />
                          <span>{t('dragDrop')}</span>
                          <span className="font-regular text-gray fs-sm d-block mt-1">
                            <Trans
                              i18nKey="imgFormats"
                              ns="search"
                              components={<span className="my-2 d-block" />}
                            />
                          </span>
                          <span className="font-regular app-text-primary fs-sm text-underline">{t('browseFiles')}</span>
                        </>
                      }
                    />
                  )
                }
                </div>
              </div>
            )
          }
            {imageList.map((image, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="image-wrapper">
                <div className="image-item">
                  <Image src={image.data_url} className="imageView" />
                  <Button
                    className="pe-2 removeImg"
                    onClick={() => onImageRemove(index)}
                    text={
                      <FontAwesomeIcon icon={faTimes} className="fs-sm text-gray" />
                  }
                  />
                </div>
              </div>
            ))}
          </div>
          {errors && (
            <div>
              {errors.acceptType && <span className="app-text-danger-dark fs-xs errorMsg pb-2">{t('validationErrors.imgFormats')}</span>}
            </div>
          )}
          {errors
          && (
            <div>
              {errors.maxFileSize && <span className="app-text-danger-dark fs-xs errorMsg pb-2">{t('validationErrors.maxSize')}</span>}
            </div>
          )}
          {errors
          && (
            <div>
              {errors.maxNumber && <span className="app-text-danger-dark fs-xs errorMsg pb-2">{t('validationErrors.maxNumber')}</span>}
            </div>
          )}
        </>
      )}
    </ImageUploading>
  );
}

UploadImage.propTypes = {
  className: PropTypes.string,
  maxMbFileSize: PropTypes.number,
  showUploadImgSection: PropTypes.bool.isRequired,
  uploadFile: PropTypes.func.isRequired,
  changeIsImgUploaded: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

UploadImage.defaultProps = {
  className: '',
  maxMbFileSize: 10 * 1024 * 1024, // 10Mb
};

export default UploadImage;
