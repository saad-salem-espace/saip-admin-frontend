import { Trans, useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import WorkStreams from '../work-streams/WorkStreams';
import style from './style.module.scss';
import Select from '../shared/form/select/Select';
import Search from '../shared/form/search/Search';
import formStyle from '../shared/form/form.module.scss';
import { getWorkstreamIdentifiers } from '../../api/workstreamApi';

function PatentsSearch() {
  const { t } = useTranslation('search');
  const [selectedWorkStream, setSelectedWorkStream] = useState(1);
  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    async function fetchWorkstreamIdentifiers() {
      const response = await getWorkstreamIdentifiers(selectedWorkStream);
      setSearchOptions(response.data);
    }
    fetchWorkstreamIdentifiers();
  }, [selectedWorkStream]);

  console.log(searchOptions);

  const onChangeWorkstream = (newState) => {
    setSelectedWorkStream(newState);
  };

  // const options = [
  //   {
  //     key: '1',
  //     value: 'any field',
  //   },
  //   {
  //     key: '2',
  //     value: 'Int. Classification(IPC)',
  //   },
  // ];

  const onChangeSelect = () => {

  };

  const onSubmit = () => {

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
            <Formik>
              {() => (
                <Form className="mt-8">
                  <div className="d-flex align-items-stretch">
                    <div className="position-relative">
                      <span className={`position-absolute ${formStyle.label}`}>{t('searchFields')}</span>
                      <Select options={searchOptions} onChangeSelect={onChangeSelect} id="searchFields" fieldName="searchFields" moduleClassName="lg-select" />
                    </div>
                    <Search id="search" className="flex-grow-1" placeholder={t('typeSearchTerms')} onSubmit={onSubmit}>
                      <span className={`position-absolute ${formStyle.label}`}>{t('searchFields')}</span>
                    </Search>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PatentsSearch;
