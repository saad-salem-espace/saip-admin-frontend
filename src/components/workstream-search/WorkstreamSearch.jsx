import { Trans, useTranslation } from 'react-i18next';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import CacheContext from 'contexts/CacheContext';
import * as Yup from 'yup';
import ErrorMessage from 'components/shared/error-message/ErrorMessage';
import useCacheRequest from '../../hooks/useCacheRequest';
import WorkStreams from '../work-streams/WorkStreams';
import style from './style.module.scss';
import Select from '../shared/form/select/Select';
import Search from '../shared/form/search/Search';
import formStyle from '../shared/form/form.module.scss';

function WorkstreamSearch() {
  const { t } = useTranslation('search');
  const navigate = useNavigate();
  const { cachedRequests } = useContext(CacheContext);
  const [selectedWorkStream, setSelectedWorkStream] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchOption] = useCacheRequest(cachedRequests.workstreamList, { url: `workstreams/${selectedWorkStream}/identifiers` }, { dependencies: [selectedWorkStream] });
  const searchOptions = searchOption?.data;

  const formSchema = Yup.object({
    searchQuery: Yup.string().trim().required('Input search criteria to display search results.'),
  });

  useEffect(() => {
    setSelectedOption(searchOptions?.[0]);
  }, [searchOptions]);

  const onChangeWorkstream = (newState) => {
    setSelectedWorkStream(newState);
  };

  const onSubmit = (values) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ workstreamId: selectedWorkStream, identifierStrId: selectedOption?.identiferStrId, query: values.searchQuery })}`,
    });
  };

  const SearchModuleClassName = ({
    lgSearch: true,
    searchWithSibling: true,
  });

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
              validationSchema={formSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({
                handleSubmit, values, setFieldValue, errors, touched,
              }) => (
                <Form className="mt-8" onSubmit={handleSubmit}>
                  <div className="d-md-flex align-items-stretch">
                    <div className="position-relative mb-md-0 mb-3">
                      <span className={`position-absolute ${formStyle.label}`}>{t('searchFields')}</span>
                      <Select
                        options={searchOptions}
                        className={`${style.select} lgSelect selectWithSibling`}
                        getOptionName={(option) => option.identiferName}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
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
                      placeholder={t('typeSearchTerms')}
                      isClearable={!!values.searchQuery}
                      clearInput={() => { setFieldValue('searchQuery', ''); }}
                    >
                      {/* <span className={`position-absolute ${formStyle.label}`}>
                      {t('searchFields')}</span> */}
                    </Search>
                  </div>
                  {touched.searchQuery && errors.searchQuery && !values.searchQuery.trim()
                    ? (<ErrorMessage msg={errors.searchQuery} className={`mt-2 ${style.errorMsg}`} />
                    ) : null}
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
