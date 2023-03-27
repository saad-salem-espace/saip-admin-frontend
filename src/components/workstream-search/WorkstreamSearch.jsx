import { Trans, useTranslation } from 'react-i18next';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, createSearchParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import CacheContext from 'contexts/CacheContext';
import uploadFile from 'apis/uploadFileApi';
import * as Yup from 'yup';
import ErrorMessage from 'components/shared/error-message/ErrorMessage';
import { parseSingleQuery } from 'utils/searchQuery/encoder';
import useCacheRequest from '../../hooks/useCacheRequest';
import WorkStreams from '../work-streams/WorkStreams';
import style from './style.module.scss';
import Select from '../shared/form/select/Select';
import Search from '../shared/form/search/Search';
import UploadImage from '../shared/upload-image/UploadImage';
import formStyle from '../shared/form/form.module.scss';

function WorkstreamSearch() {
  const { t } = useTranslation('search');
  const navigate = useNavigate();
  const { cachedRequests } = useContext(CacheContext);
  const [selectedWorkStream, setSelectedWorkStream] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showUploadImgSection, setShowUploadImgSection] = useState(false);
  const [searchOption] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${selectedWorkStream}/identifiers` }, { dependencies: [selectedWorkStream] });
  const searchOptions = searchOption?.data;
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageName, setImageName] = useState(null);

  const formSchema = Yup.object({
    searchQuery: Yup.string().trim().required('Input search criteria to display search results.'),
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

    if (selectedOption.identifierType !== 'Date') searchQuery = values.searchQuery.trim();

    const defaultConditions = new Map();
    defaultConditions.set('Text', 'hasExactly');
    defaultConditions.set('Date', 'is');

    const defaultCondition = (defaultConditions.get(selectedOption.identifierType));

    const query = parseSingleQuery({
      identifier: selectedOption,
      condition: { optionParserName: defaultCondition },
      data: searchQuery,
    }, 0, true);

    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ workstreamId: selectedWorkStream, q: (searchQuery ? query : ''), ...(imageName && { imageName }) })}`,
    });
  };

  const SearchModuleClassName = ({
    lgSearch: true,
    searchWithSibling: true,
    imgUploaded: isImgUploaded,
    searchWithImage: selectedWorkStream === 1,
  });

  const uploadCurrentFile = async (file) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('file', file);
    const { res, err } = await uploadFile(formData);
    setImageName(res.data.data?.[0]);
    if (err) setErrorMessage(err);
    setIsImgUploaded(true);
    setShowUploadImgSection(false);
    setIsSubmitting(false);
  };

  const handleUploadImg = () => {
    setShowUploadImgSection(!showUploadImgSection);
  };

  return (
    <div>
      <div className={`${style.header}`}>
        <Container className="px-0 m-auto">
          <Row className="mx-0">
            <Col className="pt-18 pb-8">
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
      <Container className="px-0 m-auto">
        <Row className="mx-0">
          <Col className="pt-5 pb-8" lg={{ span: 8, offset: 2 }}>
            <Formik
              onSubmit={onSubmit}
              initialValues={{ searchQuery: '' }}
              validationSchema={isImgUploaded ? Yup.object().shape({}) : formSchema}
              validateOnChange
              validateOnBlur={false}
            >
              {({
                handleSubmit, values, setFieldValue, errors, touched, setErrors, setTouched,
              }) => (
                <Form className="mt-8 position-relative" onSubmit={handleSubmit}>
                  <Link
                    to={{
                      pathname: '/search',
                      search: `?${createSearchParams({
                        workstreamId: selectedWorkStream,
                        identifierStrId: selectedOption?.identiferStrId,
                        query: values.searchQuery,
                        fireSearch: false,
                      })}`,
                    }}
                    className="d-block text-primary-dark mb-1 text-end"
                  >
                    {t('advancedSearch')}
                  </Link>
                  <div className="d-xl-flex align-items-stretch">
                    <div className="position-relative mb-xl-0 mb-3">
                      <span className={`position-absolute ${formStyle.label}`}>{t('searchFields')}</span>
                      <Select
                        options={searchOptions}
                        className={`${style.select} lgSelect selectWithSibling`}
                        getOptionName={(option) => option.identiferName}
                        selectedOption={selectedOption}
                        setSelectedOption={(identifier) => onChangeIdentifier(identifier, () => setFieldValue('searchQuery', ''), () => setErrors({}), () => setTouched({}))}
                        getOptionValue={(option) => option.identiferName}
                      />
                    </div>
                    <Search
                      id="search"
                      name="searchQuery"
                      className="flex-grow-1"
                      moduleClassName={
                        SearchModuleClassName
                      }
                      placeholder={t('typeHere')}
                      isClearable={!!values.searchQuery}
                      clearInput={() => { setFieldValue('searchQuery', ''); }}
                      handleUploadImg={handleUploadImg}
                      searchWithImg={selectedWorkStream === 1}
                      type={selectedOption?.identifierType}
                      onChangeDate={(date) => { setFieldValue('searchQuery', date); }}
                      imageSearch={isImgUploaded}
                    >
                      {/* please show this span if the search has text value */}
                      {/* <span className={`position-absolute ${formStyle.label}
                      ${isImgUploaded ? style.customLabel : ''}`}
                      >
                        {t('searchFields')}
                      </span> */}
                    </Search>
                  </div>
                  {touched.searchQuery && errors.searchQuery && !isImgUploaded
                    ? (<ErrorMessage msg={errors.searchQuery} className="mt-2" />
                    ) : null}
                  <div className="rounded">
                    <UploadImage
                      className={` ${showUploadImgSection ? 'mt-4 mb-2 rounded shadow' : ''}  workStreamView ${isImgUploaded ? 'imgUploaded' : ''}`}
                      showUploadImgSection={showUploadImgSection}
                      changeIsImgUploaded={(flag) => { setIsImgUploaded(flag); setErrorMessage(''); }}
                      uploadFile={(file) => uploadCurrentFile(file)}
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
