import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';
// import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import style from './ipr-details.module.scss';
import Button from '../shared/button/Button';
import Select from '../shared/form/select/Select';
import formStyle from '../shared/form/form.module.scss';
import Carousel from './carousel/Carousel';

// eslint-disable-next-line react/prop-types
function IprDetails({ collapseIPR, isExpanded }) {
  const { t } = useTranslation('search');

  const onChangeSelect = () => {

  };
  const sectionsOptions = [
    {
      label: '1',
      value: 'any field',
    },
    {
      label: '2',
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
    <div>
      <div className="border-bottom bg-primary-01">
        <div className="d-flex justify-content-between mb-2 px-6 pt-5">
          <div className="d-flex">
            <FontAwesomeIcon icon={faBookmark} className="me-3 f-22 text-primary-dark" />
            <h5>
              {ipr.publicationNumber}
            </h5>
          </div>
          <div>
            <Button
              variant="link"
              onClick={collapseIPR}
              className="p-0"
              text={<FontAwesomeIcon icon={isExpanded ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} className={`d-md-inline-block d-none f-17 text-gray ${style['expand-icon']}`} />}
            />
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
      <div className="px-6 pt-4">
        <Formik>
          {() => (
            <Form>
              <div className="position-relative">
                <span className={`position-absolute f-12 ${formStyle.label}`}>{t('viewSection')}</span>
                <Select
                  options={sectionsOptions}
                  onChangeSelect={onChangeSelect}
                  id="viewSection"
                  fieldName="viewSection"
                  className={`${style.select} mb-5 select-2`}
                />
              </div>
            </Form>
          )}
        </Formik>
        <h6 className="mt-8 mb-4">{t('register')}</h6>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('applicants')}</p>
          <p className="f-12">
            {ipr.applicants}
          </p>
        </div>
        <div className="d-flex mb-4">
          <p className={`text-primary f-14 ${style.label}`}>{t('inventors')}</p>
          <p className="f-12">
            {ipr.inventors}
          </p>
        </div>
        <div>
          <p className="text-primary f-14">{t('classifications')}</p>
          <div className="d-flex f-12 mb-5">
            <p className={`${style.label}`}>{t('ipc')}</p>
            <p>
              {ipr.ipc}
            </p>
          </div>
        </div>
        <div className="d-flex f-12 mb-5">
          <p className={`${style.label}`}>{t('cpc')}</p>
          <p>
            {ipr.cpc}
          </p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('priorities')}</p>
          <p className="f-12">{ipr.priorities}</p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('application')}</p>
          <p className="f-12">{ipr.application}</p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('publication')}</p>
          <p className="f-12">{ipr.publication}</p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('publishedAs')}</p>
          <p className="f-12">{ipr.publishedAs}</p>
        </div>
        <p className="text-primary f-14">{t('images')}</p>
        <Carousel />
      </div>
    </div>
  );
}

export default IprDetails;
