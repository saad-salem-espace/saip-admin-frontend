import { Trans, useTranslation } from 'react-i18next';
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import CacheContext from 'contexts/CacheContext';
import * as Yup from 'yup';
import { DateObject } from 'react-multi-date-picker';
import { parseSingleQuery } from 'utils/search-query/encoder';
import {
  teldaRegex, noTeldaRegex, defaultConditions, convertQueryArrToStr,
  specialCharsValidation,
  wordCountValidation,
} from 'utils/searchQuery';
import FloatWidget from 'components/shared/float-widget/FloatWidget';
import { BsQuestionCircle } from 'react-icons/bs';
import AppPopover from 'components/shared/app-popover/AppPopover';
import useCacheRequest from 'hooks/useCacheRequest';
import validationMessages from 'utils/validationMessages';
import ToggleButton from 'components/shared/toggle-button/ToggleButton';
import SearchQuery from 'components/advanced-search/search-query/SearchQuery';
import WorkStreams from '../work-streams/WorkStreams';
import SharedSearch from './shared/SharedSearch';
import './style.scss';

function WorkstreamSearch() {
  const { t } = useTranslation('search');
  const navigate = useNavigate();
  const { cachedRequests } = useContext(CacheContext);
  const [selectedWorkStream, setSelectedWorkStream] = useState(null);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchOption] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${selectedWorkStream}/identifiers` }, { dependencies: [selectedWorkStream] });
  const searchOptions = searchOption?.data;
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const submitRef = useRef();
  const [imageName, setImageName] = useState(null);
  const [advancedQuery, setAdvancedQuery] = useState('');
  const isSearchSubmitted = Number(localStorage.getItem('isSearchSubmitted') || 0);
  const [advancedValidation, setAdvancedValidation] = useState(true);

  const parseAndSetSearchQuery = (qObjsArr) => {
    setAdvancedQuery(convertQueryArrToStr(qObjsArr));
  };

  const formSchema = Yup.object({
    searchQuery: Yup.mixed()
      .test('Is not empty', validationMessages.search.required, (data) => (
        (isImgUploaded || (data && (typeof data === 'string' || data instanceof String) && data.trim(t('errors.empty'))))
      || data instanceof DateObject
      ))
      .test('Is valid advanced query', validationMessages.search.invalidAdvanced, () => (
        (!isAdvanced || advancedValidation)
      ))
      .test('is Valid String', validationMessages.search.invalidWildcards, (data) => (
        ((isImgUploaded && !data) || isAdvanced || ((typeof data === 'string' || data instanceof String) && (data.trim().match(noTeldaRegex) || data.trim().match(teldaRegex))))
      || data instanceof DateObject
      ))
      .test('Special characters', validationMessages.search.specialChars, (data) => (
        ((isImgUploaded && !data) || ((typeof data === 'string' || data instanceof String) && (specialCharsValidation(data))))
      || data instanceof DateObject
      ))
      .test('Words count', validationMessages.search.tooLong, (data) => (
        ((isImgUploaded && !data) || isAdvanced || ((typeof data === 'string' || data instanceof String) && (wordCountValidation(data))))
      || data instanceof DateObject
      )),
  });

  useEffect(() => {
    setSelectedOption(searchOptions?.[0]);
  }, [searchOptions]);

  const onChangeWorkstream = (newState) => {
    setSelectedWorkStream(newState);
  };

  const onSubmit = (values) => {
    let { searchQuery } = values;
    localStorage.setItem('isSearchSubmitted', (isSearchSubmitted + 1).toString());

    if (!isAdvanced) {
      if (selectedOption.identifierType !== 'Date') searchQuery = values.searchQuery.trim();

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
      }, {
        state: {
          simpleSearch: true,
        },
      });
    } else {
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          workstreamId: selectedWorkStream, sort: 'mostRelevant', q: (advancedQuery || ''), ...(imageName && { imageName }),
        })}`,
      });
    }
  };

  const toggleState = (state) => {
    setIsAdvanced(!state);
    setAdvancedQuery('');
  };

  return (
    <div>
      <div className="workstream-header">
        <Container className="px-0 m-auto">
          <Row className="mx-0">
            <Col className="pt-24 pb-8">
              <div className="text-center mb-8">
                <h3 className="app-text-primary-dark fs-30 mb-3">
                  {t('searchSpecificProperty')}
                </h3>
                <p className="app-text-primary-dark fs-22">{t('chooseSpecificProperty')}</p>
              </div>
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
                  <div className="d-flex justify-content-end align-items-center mb-2">
                    <ToggleButton
                      handleToggleButton={() => toggleState(isAdvanced)}
                      isToggleButtonOn={isAdvanced}
                      text={t('advancedSearch')}
                      className="d-block app-text-primary text-end"
                    />
                    <AppPopover
                      id="advancedSearchTip"
                      Title={t('tips:advancedSearchTipTitle')}
                      btnText={t('common:gotIt')}
                      popoverTrigger={
                        <Button variant="link" className="btn-view-tip">
                          <BsQuestionCircle className="app-text-primary" />
                        </Button>
                      }
                      variant="app-bg-primary-10"
                    >
                      <Trans
                        i18nKey="advancedSearchTipContent"
                        ns="tips"
                        components={{ bold: <b />, break: <br /> }}
                      />
                    </AppPopover>
                  </div>
                  <SharedSearch
                    isAdvanced={isAdvanced}
                    setFieldValue={setFieldValue}
                    values={values}
                    setErrors={setErrors}
                    setTouched={setTouched}
                    selectedWorkStream={selectedWorkStream}
                    setImageName={setImageName}
                    isImgUploaded={isImgUploaded}
                    setIsImgUploaded={setIsImgUploaded}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    className="search-box-index"
                  />
                </Form>
              )}
            </Formik>
            {isAdvanced && <SearchQuery
              workstreamId={selectedWorkStream}
              firstIdentifierStr={searchOptions?.[0].identifierOptions[0]}
              setAdvancedValidation={setAdvancedValidation}
              defaultInitializers={[{
                id: selectedWorkStream,
                data: '',
                identifier: selectedOption,
                condition: selectedOption.identifierOptions[0],
                operator: '',
              }]}
              onChangeSearchQuery={(vals) => {
                parseAndSetSearchQuery(vals);
              }}
              submitRef={submitRef}
              className="mt-8 workstream-view"
            />}
          </Col>
        </Row>
      </Container>
      <FloatWidget
        id="survey-widget"
        widgetTitle={t('common:floatWidget.userSurvey.widgetTitle')}
        widgetAction={t('common:floatWidget.userSurvey.widgetAction')}
        widgetActionText={t('common:floatWidget.userSurvey.widgetActionText')}
        variant="app-bg-primary-10"
        className="survey-widget"
        show
      />
    </div>
  );
}

export default WorkstreamSearch;
