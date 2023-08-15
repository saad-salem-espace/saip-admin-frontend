/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTranslation } from 'react-i18next';
import React, {
  useState, useContext, useEffect,
} from 'react';
import CacheContext from 'contexts/CacheContext';
import uploadFile from 'apis/uploadFileApi';
import useCacheRequest from 'hooks/useCacheRequest';
import Select from 'components/shared/form/select/Select';
import Search from 'components/shared/form/search/Search';
import 'components/shared/form/form.scss';
import useAxios from 'hooks/useAxios';
import PropTypes from 'prop-types';
import UploadImage from 'components/shared/upload-image/UploadImage';
import '../style.scss';

function SharedSearch({
  isAdvanced, selectedWorkStream, children,
  resultsView, setTouched, setFieldValue, values, setErrors, className,
  setImageName, setIsImgUploaded, isImgUploaded,
  selectedOption, setSelectedOption, speechClassName, onRecordingCallback,
}) {
  const { t, i18n } = useTranslation('search');
  const currentLang = i18n.language;
  const { cachedRequests } = useContext(CacheContext);
  const [showUploadImgSection, setShowUploadImgSection] = useState(false);

  const [searchOption] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${selectedWorkStream}/identifiers` }, { dependencies: [selectedWorkStream] });
  const searchOptions = searchOption?.data;
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imgData, execute] = useAxios({}, { manual: true, onError: 'warning' });

  useEffect(() => {
    if (imgData) {
      if (imgData.data) {
        setImageName(imgData.data.data?.[0]);
        setShowUploadImgSection(false);
        setIsImgUploaded(true);
      } else {
        setIsImgUploaded(false);
      }
      setIsSubmitting(false);
    }
  }, [imgData]);

  useEffect(() => {
    setSelectedOption(searchOptions?.[0]);
  }, [searchOptions, isAdvanced]);

  function identifierName(option) {
    return currentLang === 'ar' ? option.identiferNameAr : option.identiferName;
  }

  const SearchModuleClassName = ({
    lgSearch: !resultsView,
    searchWithSibling: !isAdvanced,
    searchInputWrapper: true,
    imgUploaded: isImgUploaded,
    searchWithImage: ![4, 5].includes(selectedWorkStream), // Disabled for Decisions & Copyright
    smSearch: resultsView,
  });

  const handleUploadImg = () => {
    setShowUploadImgSection(!showUploadImgSection);
  };

  const uploadCurrentFile = async (file, data) => {
    setIsSubmitting(true);
    execute(uploadFile(file));
    if (!data.trim?.()) setErrors({});
  };
  return (
    <div className={`shared-search ${className}`}>
      <div>
        <div className={`${(isAdvanced && !resultsView) ? 'advanced-search-home' : ''} ${isAdvanced && resultsView ? 'advanced-search-result' : ''} d-xl-flex align-items-stretch`}>
          <div className="position-relative mb-xl-0 mb-3">
            {(!isAdvanced && !resultsView)
              && (<span className="position-absolute saip-label">{t('searchFields')}</span>
              )}
            {!isAdvanced && <Select
              name="simpleIdentifier"
              options={searchOptions}
              className={` workstream-select ${resultsView ? 'smSelect' : 'lgSelect'}  selectWithSibling`}
              getOptionName={(option) => identifierName(option)}
              selectedOption={selectedOption}
              setSelectedOption={(identifier) => {
                if (identifier.identifierType === 'Date' || selectedOption.identifierType === 'Date') {
                  setFieldValue('searchQuery', '');
                  setErrors({});
                  setTouched({});
                }
                setSelectedOption(identifier);
              }}
              getOptionValue={(option) => option.identiferName}
            />}
          </div>
          <Search
            id="search"
            name="searchQuery"
            className="flex-grow-1 searchBox"
            onRecordingCallback={onRecordingCallback}
            moduleClassName={
              SearchModuleClassName
            }
            placeholder={t('typeHere')}
            isClearable={!!values.searchQuery && !isAdvanced}
            clearInput={() => { setFieldValue('searchQuery', ''); }}
            handleUploadImg={handleUploadImg}
            searchWithImg={![4, 5].includes(selectedWorkStream)}// Disabled for Decisions, Copyright
            type={selectedOption?.identifierType}
            onChangeDate={(date) => { setFieldValue('searchQuery', date); }}
            imageSearch={isImgUploaded}
            disabled={isAdvanced}
            speech={selectedOption?.identifierType !== 'Date' && !isAdvanced}
            speechClassName={speechClassName}
          />
        </div>
        <div className="rounded">
          <UploadImage
            className={` ${showUploadImgSection ? 'mb-2 rounded shadow' : ''}  workStreamView ${isImgUploaded ? 'imgUploaded' : ''}`}
            showUploadImgSection={showUploadImgSection}
            changeIsImgUploaded={(flag) => { setIsImgUploaded(flag); setErrorMessage(''); }}
            uploadFile={(file) => uploadCurrentFile(file, setErrors, values.searchQuery)}
            isSubmitting={isSubmitting}
          />
        </div>
        {
          errorMessage && (
            <span className="app-text-danger-dark fs-xs">
              {errorMessage}
            </span>
          )
        }
      </div>
      {children}
    </div>
  );
}

SharedSearch.propTypes = {
  selectedWorkStream: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isAdvanced: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  resultsView: PropTypes.bool,
  setTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  className: PropTypes.string,
  isImgUploaded: PropTypes.bool.isRequired,
  setIsImgUploaded: PropTypes.func.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  setImageName: PropTypes.func.isRequired,
  selectedOption: PropTypes.instanceOf(Object).isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  onRecordingCallback: PropTypes.func,
  speechClassName: PropTypes.string,
};

SharedSearch.defaultProps = {
  resultsView: false,
  className: '',
  speechClassName: '',
  onRecordingCallback: () => {},
};
export default SharedSearch;
