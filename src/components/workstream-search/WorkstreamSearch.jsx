/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Trans, useTranslation } from 'react-i18next';
import React, {
  useState, useContext, useEffect, useRef,
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
import Search from 'components/shared/form/search/Search';
import formStyle from 'components/shared/form/form.module.scss';
import useAxios from 'hooks/useAxios';
import validationMessages from 'utils/validationMessages';
import ToggleButton from 'components/shared/toggle-button/ToggleButton';
import Select from 'components/shared/form/select/Select';
import SearchQuery from 'components/advanced-search/search-query/SearchQuery';
import UploadImage from 'components/shared/upload-image/UploadImage';
import style from './style.module.scss';
import WorkStreams from '../work-streams/WorkStreams';

function WorkstreamSearch() {
  const { t, i18n } = useTranslation('search');
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const { cachedRequests } = useContext(CacheContext);
  const [selectedWorkStream, setSelectedWorkStream] = useState(null);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showUploadImgSection, setShowUploadImgSection] = useState(false);
  const [searchOption] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${selectedWorkStream}/identifiers` }, { dependencies: [selectedWorkStream] });
  const searchOptions = searchOption?.data;
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitRef = useRef();
  const [imageName, setImageName] = useState(null);
  const [advancedQuery, setAdvancedQuery] = useState('');

  const [imgData, execute] = useAxios({}, { manual: true });

  useEffect(() => {
    if (imgData.data) {
      setImageName(imgData.data.data?.[0]);
    } else if (imgData.error) {
      setErrorMessage(imgData.error);
    }
    if (imgData.response) {
      setIsImgUploaded(true);
      setShowUploadImgSection(false);
      setIsSubmitting(false);
    }
  }, [imgData]);

  const formSchema = Yup.object({
    searchQuery: Yup.mixed()
      .test('Is not empty', validationMessages.search.required, (data) => (
        (isImgUploaded || (data && (typeof data === 'string' || data instanceof String) && data.trim(t('errors.empty'))))
      || data instanceof DateObject
      ))
      .test('is Valid String', validationMessages.search.invalidWildcards, (data) => (
        ((isImgUploaded && !data) || ((typeof data === 'string' || data instanceof String) && (data.trim().match(noTeldaRegex) || data.trim().match(teldaRegex))))
      || data instanceof DateObject
      )),
  });

  useEffect(() => {
    setSelectedOption(searchOptions?.[0]);
  }, [searchOptions]);

  const onChangeWorkstream = (newState) => {
    setSelectedWorkStream(newState);
  };

  const onChangeIdentifier = (identifier, clearData, clearErrors, clearTouch) => {
    if (identifier.identifierType === 'Date' || selectedOption.identifierType === 'Date') {
      clearData();
      clearErrors();
      clearTouch();
    }

    setSelectedOption(identifier);
  };

  const onSubmit = (values) => {
    let { searchQuery } = values;

    if (!isAdvanced) {
      if (selectedOption.identifierType !== 'Date') searchQuery = values.searchQuery.trim();

      const defaultConditions = new Map();
      defaultConditions.set('Text', 'hasExactly');
      defaultConditions.set('Date', 'is');
      defaultConditions.set('Number', 'is');
      defaultConditions.set('LKP', 'hasAny');

      const defaultCondition = (defaultConditions.get(selectedOption.identifierType));

      const query = parseSingleQuery({
        identifier: selectedOption,
        condition: { optionParserName: defaultCondition },
        data: searchQuery,
      }, 0, true);

      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          workstreamId: selectedWorkStream, sort: 'mostRelevant', q: (searchQuery ? query : ''), ...(imageName && { imageName }),
        })}`,
      });
    } else {
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          workstreamId: selectedWorkStream, sort: 'mostRelevant', q: (searchQuery || ''), ...(imageName && { imageName }),
        })}`,
      });
    }
  };

  const SearchModuleClassName = ({
    lgSearch: true,
    searchWithSibling: !isAdvanced,
    searchInputWrapper: true,
    imgUploaded: isImgUploaded,
    searchWithImage: selectedWorkStream === 2 || selectedWorkStream === 1,
  });

  const uploadCurrentFile = async (file, setErrors, data) => {
    setIsSubmitting(true);
    execute(uploadFile(file));
    if (!data.trim()) setErrors({});
  };

  const handleUploadImg = () => {
    setShowUploadImgSection(!showUploadImgSection);
  };

  const toggleState = (state) => {
    setIsAdvanced(!state);
    setAdvancedQuery('');
  };

  function identifierName(option) {
    return currentLang === 'ar' ? option.identiferNameAr : option.identiferName;
  }

  return (
    <div>
      <div className={`${style.header}`}>
        <Container className="px-0 m-auto">
          <Row className="mx-0">
            <Col className="pt-24 pb-8">
              <p className="text-primary-dark f-30 text-center mb-8">
                <Trans
                  i18nKey="searchSpecificProperty"
                  ns="search"
                  components={<span className="h3" />}
                />
              </p>
              <WorkStreams
                selectedWorkStream={selectedWorkStream}
                onChange={onChangeWorkstream}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="px-0 m-auto search-container">
        <Row className="mx-0">
          <Col className="pt-5 pb-8" lg={{ span: 8, offset: 2 }}>
            <Formik
              onSubmit={onSubmit}
              initialValues={{ searchQuery: advancedQuery, isAdvanced }}
              validationSchema={formSchema}
              validateOnChange
              enableReinitialize
              validateOnBlur={false}
              innerRef={submitRef}
            >
              {({
                handleSubmit, values, setFieldValue, setErrors, setTouched,
              }) => (
                <Form className="mt-8 position-relative" onSubmit={handleSubmit}>
                  <ToggleButton
                    handleToggleButton={() => toggleState(isAdvanced)}
                    isToggleButtonOn={isAdvanced}
                    text={t('advancedSearch')}
                    className="d-block text-primary mb-2 text-end"
                  />
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
                    >
                      {/* please show this span if the search has text value */}
                      {/* <span className={`position-absolute ${formStyle.label}
                      ${isImgUploaded ? style.customLabel : ''}`}
                      >
                        {t('searchFields')}
                      </span> */}
                    </Search>
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
                        { errorMessage }
                      </span>
                    )
                  }
                  {isAdvanced && <SearchQuery
                    workstreamId={selectedWorkStream}
                    firstIdentifierStr={searchOptions?.[0].identifierOptions[0]}
                    defaultInitializers={[{
                      id: selectedWorkStream,
                      data: '',
                      identifier: selectedOption,
                      condition: selectedOption.identifierOptions[0],
                      operator: '',
                    }]}
                    onChangeSearchQuery={(setAdvancedQuery)}
                    submitRef={submitRef}
                    className="mt-8 workstream-view"
                  />}
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WorkstreamSearch;
