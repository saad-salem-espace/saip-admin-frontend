import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import style from './ipr-details.module.scss';
import Button from '../shared/button/Button';
import Select from '../shared/form/select/Select';
import formStyle from '../shared/form/form.module.scss';

function IprDetails() {
  const { t } = useTranslation('search');

  const onChangeSelect = () => {

  };
  const sectionsOptions = [
    {
      key: '1',
      value: 'any field',
    },
    {
      key: '2',
      value: 'bio',
    },
  ];
  const ipr = {
    publicationNumber: 'US10745034B2',
    owner: ' James W. Forbes National Steel Car Limited',
    cpc: 'cpc',
    ipc: 'ipc',
    applicants: 'applicants',
    inventors: 'inventors',
    application: 'application',
    priorities: 'priorities',
    publication: 'publication',
    publishedAs: 'published As',
  };
  return (
    <Col lg={4} md={6}>
      <div className="border-bottom bg-primary-01">
        <div className="d-flex justify-content-between mb-2 px-6 pt-5">
          <div className="d-flex">
            <FontAwesomeIcon icon={faBookmark} className="me-3 f-22 text-primary-dark" />
            <h5>
              {ipr.publicationNumber}
            </h5>
          </div>
          <div>
            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className={`f-17 text-gray ${style['expand-icon']}`} />
            <Button
              variant="link"
              // onClick={}
              className="p-0"
              text={<FontAwesomeIcon icon={faTimes} className="f-20 text-gray ms-5 border-start ps-5" />}
            />
          </div>
        </div>
        <p className="text-gray px-6">
          {ipr.owner}
        </p>
      </div>
      <Formik>
        {() => (
          <Form>
            <div className="position-relative">
              <span className={`position-absolute ${formStyle.label}`}>{t('viewSection')}</span>
              <Select
                options={sectionsOptions}
                onChangeSelect={onChangeSelect}
                id="viewSection"
                fieldName="viewSection"
                moduleClassName="lg-select"
                className="mb-5"
              />
            </div>
          </Form>
        )}
      </Formik>
      <h6>{t('register')}</h6>
      <div className="d-flex">
        <p>{t('applicants')}</p>
        <p>
          {ipr.applicants}
        </p>
      </div>
      <div className="d-flex">
        <p>{t('inventors')}</p>
        <p>
          {ipr.inventors}
        </p>
      </div>
      <div>
        <p>{t('classifications')}</p>
        <div className="d-flex">
          <p>{t('ipc')}</p>
          <p>
            {ipr.ipc}
          </p>
        </div>
      </div>
      <div className="d-flex">
        <p>{t('cpc')}</p>
        <p>
          {ipr.cpc}
        </p>
      </div>
      <div className="d-flex">
        <p>{t('priorities')}</p>
        <p>{ipr.priorities}</p>
      </div>
      <div className="d-flex">
        <p>{t('application')}</p>
        <p>{ipr.application}</p>
      </div>
      <div className="d-flex">
        <p>{t('publication')}</p>
        <p>{ipr.publication}</p>
      </div>
      <div className="d-flex">
        <p>{t('publishedAs')}</p>
        <p>{ipr.publishedAs}</p>
      </div>
    </Col>
  );
}

export default IprDetails;
