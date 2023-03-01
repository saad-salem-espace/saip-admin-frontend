import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';
// import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './ipr-details.module.scss';
import Button from '../shared/button/Button';
import Select from '../shared/form/select/Select';
import formStyle from '../shared/form/form.module.scss';
import { documentApi } from '../../apis/workstreams/documentsApi';
import HandleEmptyAttribute from '../shared/empty-states/HandleEmptyAttribute';
import BibliographicDataSection from './BibliographicDataSection';

function IprDetails({
  collapseIPR, isExpanded, documentId, onClose,
}) {
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const [document, setDocument] = useState(null);
  useEffect(() => {
    if (documentId) {
      documentApi({ workstreamId: searchParams.get('workstreamId'), documentId })
        .then((resp) => {
          setDocument(resp.data?.data[0]);
        });
    }
  }, [documentId]);

  if (!document) {
    return null;
  }

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

  return (
    <div className={`${style.iprWrapper}`}>
      <div className="border-bottom bg-primary-01">
        <div className="d-flex justify-content-between mb-2 px-6 pt-5">
          <div className="d-flex">
            <FontAwesomeIcon icon={faBookmark} className="me-3 f-22 text-primary-dark" />
            <h5>
              {document.BibliographicData.PublicationNumber}
            </h5>
          </div>
          <div>
            <Button
              variant="link"
              onClick={collapseIPR}
              className="p-0"
              data-testid="expand-ipr-detail-button"
              text={<FontAwesomeIcon icon={isExpanded ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} className={`d-md-inline-block d-none f-17 text-gray ${style['expand-icon']}`} />}
            />
            <Button
              variant="link"
              data-testid="close-ipr-detail-button"
              onClick={onClose}
              className="p-0"
              text={<FontAwesomeIcon icon={faTimes} className="f-20 text-gray ms-5 border-start ps-5" />}
            />
          </div>
        </div>
        <p className="text-gray px-6">
          <HandleEmptyAttribute checkOn={document.BibliographicData.owner} />
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
        <BibliographicDataSection document={document} />
      </div>
    </div>
  );
}

IprDetails.propTypes = {
  collapseIPR: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func,
};

IprDetails.defaultProps = {
  documentId: null,
  onClose: () => {},
};

export default IprDetails;
