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
  maxNumber, className,
  maxMbFileSize, showUploadImgSection,
  uploadFile, changeIsImgUploaded,
  isSubmitting,
}) {
  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
    if (imageList.length !== 0) {
      uploadFile(imageList[0]?.file);
    } else {
      changeIsImgUploaded(false);
    }
  };

  const { t } = useTranslation('search');

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
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
              <div className={` dashedBorder ${errors ? 'error' : ''}`}>
                <div className="uploadImage justify-content-center d-flex">
                  {
                  isSubmitting ? (
                    <Spinner className="my-12" />
                  ) : (
                    <Button
                      variant="transparent"
                      className="text-primary-dark f-16 w-100 py-0 border-0"
                      onClick={onImageUpload}
                      {...dragProps}
                      text={
                        <>
                          <div className="icon-file-plus f-60 mb-2" />
                          <span>{t('dragDrop')}</span>
                          <span className="font-regular text-gray f-14 d-block mt-1">
                            <Trans
                              i18nKey="imgFormats"
                              ns="search"
                              components={<span className="my-2 d-block" />}
                            />
                          </span>
                          <span className="font-regular text-primary f-14 text-underline">{t('browseFiles')}</span>
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
              <div key={index} className="image-item">
                <Image src={image.data_url} className="imageView" />
                <Button
                  className="pe-2 removeImg"
                  onClick={() => onImageRemove(index)}
                  text={
                    <FontAwesomeIcon icon={faTimes} className="f-14 text-gray" />
                }
                />
              </div>
            ))}
          </div>
          {errors && (
            <div>
              {errors.acceptType && <span className="text-danger-dark f-12 errorMsg pb-2">{t('validationErrors.imgFormats')}</span>}
            </div>
          )}
          {errors
          && (
            <div>
              {errors.maxFileSize && <span className="text-danger-dark f-12 errorMsg pb-2">{t('validationErrors.maxSize')}</span>}
            </div>
          )}
          {errors
          && (
            <div>
              {errors.maxNumber && <span className="text-danger-dark f-12 errorMsg pb-2">{t('validationErrors.maxNumber')}</span>}
            </div>
          )}
        </>
      )}
    </ImageUploading>
  );
}

UploadImage.propTypes = {
  className: PropTypes.string,
  maxNumber: PropTypes.number,
  maxMbFileSize: PropTypes.number,
  showUploadImgSection: PropTypes.bool.isRequired,
  uploadFile: PropTypes.func.isRequired,
  changeIsImgUploaded: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

UploadImage.defaultProps = {
  className: '',
  maxNumber: 1,
  maxMbFileSize: 10 * 1024 * 1024, // 10Mb
};

export default UploadImage;
