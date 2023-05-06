/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTranslation } from 'react-i18next';
import React, {
  useState, useContext, useEffect,
} from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import CacheContext from 'contexts/CacheContext';
import uploadFile from 'apis/uploadFileApi';
import * as Yup from 'yup';
import { DateObject } from 'react-multi-date-picker';
import { parseSingleQuery } from 'utils/search-query/encoder';
import { teldaRegex, noTeldaRegex } from 'utils/searchQuery';
import useCacheRequest from 'hooks/useCacheRequest';
import Select from 'components/shared/form/select/Select';
import Search from 'components/shared/form/search/Search';
import UploadImage from 'components/shared/upload-image/UploadImage';
import formStyle from 'components/shared/form/form.module.scss';
import useAxios from 'hooks/useAxios';
import validationMessages from 'utils/validationMessages';
import PropTypes from 'prop-types';
import style from '../style.module.scss';

function SharedSearch({
  isAdvanced, selectedWorkStream, advancedQuery, children, submitRef,
  WorkStreamsOptions, resetSearch,
  setTouched, setFieldValue, values, setErrors,
  // setErrors,
}) {
  const { t, i18n } = useTranslation('search');
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const { cachedRequests } = useContext(CacheContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showUploadImgSection, setShowUploadImgSection] = useState(false);
  const [searchOption] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${selectedWorkStream}/identifiers` }, { dependencies: [selectedWorkStream] });
  const searchOptions = searchOption?.data;
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageName, setImageName] = useState(null);

  const [imgData, execute] = useAxios({}, { manual: true });

  const onChangeIdentifier = (identifier, clearData, clearErrors, clearTouch) => {
    if (identifier.identifierType === 'Date' || selectedOption.identifierType === 'Date') {
      clearData();
      clearErrors();
      clearTouch();
    }

    setSelectedOption(identifier);
  };

  function identifierName(option) {
    return currentLang === 'ar' ? option.identiferNameAr : option.identiferName;
  }

  const SearchModuleClassName = ({
    lgSearch: true,
    searchWithSibling: !isAdvanced,
    searchInputWrapper: true,
    imgUploaded: isImgUploaded,
    searchWithImage: selectedWorkStream === 2 || selectedWorkStream === 1,
  });

  const handleUploadImg = () => {
    setShowUploadImgSection(!showUploadImgSection);
  };

  const uploadCurrentFile = async (file, data) => {
    setIsSubmitting(true);
    execute(uploadFile(file));
    if (!data.trim()) setErrors({});
  };

  return (
    <div>
      <div className="d-xl-flex align-items-stretch">
        <div className="position-relative mb-xl-0 mb-3">
          <span className={`position-absolute ${formStyle.label}`}>{t('searchFields')}</span>
          {!isAdvanced && <Select
            options={searchOptions}
            className={`${style.select} lgSelect selectWithSibling`}
            getOptionName={(option) => identifierName(option)}
            selectedOption={selectedOption}
            setSelectedOption={(identifier) => onChangeIdentifier(identifier, () => setFieldValue('searchQuery', ''), () => setErrors({}), () => setTouched({}))}
            getOptionValue={(option) => option.identiferName}
          />}
        </div>
        <Search
          id="search"
          name="searchQuery"
          className="flex-grow-1 searchBox"
          moduleClassName={
            SearchModuleClassName
          }
          placeholder={isAdvanced ? null : t('typeHere')}
          isClearable={!!values.searchQuery}
          clearInput={() => { setFieldValue('searchQuery', ''); }}
          handleUploadImg={handleUploadImg}
          searchWithImg={selectedWorkStream === 2 || selectedWorkStream === 1}
          type={selectedOption?.identifierType}
          onChangeDate={(date) => { setFieldValue('searchQuery', date); }}
          imageSearch={isImgUploaded}
          disabled={isAdvanced}
        />
      </div>
      <div className="rounded">
        <UploadImage
          className={` ${showUploadImgSection ? 'mt-4 mb-2 rounded shadow' : ''}  workStreamView ${isImgUploaded ? 'imgUploaded' : ''}`}
          showUploadImgSection={showUploadImgSection}
          changeIsImgUploaded={(flag) => { setIsImgUploaded(flag); setErrorMessage(''); }}
          uploadFile={(file) => uploadCurrentFile(file, setErrors, values.searchQuery)}
          isSubmitting={isSubmitting}
        />
      </div>
      {
        errorMessage && (
          <span className="text-danger-dark f-12">
            {errorMessage}
          </span>
        )
      }
    </div>
  );
}

SharedSearch.propTypes = {
  selectedWorkStream: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isAdvanced: PropTypes.bool.isRequired,
  advancedQuery: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SharedSearch;
