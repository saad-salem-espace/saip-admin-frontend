import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import {
  faTimes, faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter, faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
// import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'components/shared/badge/Badge';
import Image from 'react-bootstrap/Image';
import Button from 'components/shared/button/Button';
import Select from 'components/shared/form/select/Select';
import formStyle from 'components/shared/form/form.module.scss';
import { documentApi } from 'apis/search/documentsApi';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import style from './ipr-details.module.scss';
import BibliographicDataSection from './BibliographicDataSection';
import c from '../../assets/images/search-header-bg.svg';
// import Citation from './citation/Citation';
// import CitationRow from './citation/CitationRow';

// TODO change structure when trademarks are added
function IprDetails({
  collapseIPR,
  isIPRExpanded,
  documentId,
  onClose,
  moreDetails,
  getNextDocument,
  getPreviousDocument,
  setActiveDocument,
}) {
  const { t } = useTranslation('search');
  const previousDocument = getPreviousDocument();
  const nextDocument = getNextDocument();
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

  // TODO to be handled on handling section task
  const sectionsOptions = [
    {
      label: 'Bibliographic Data',
      value: 1,
    },
  ];

  // const citation = [
  //   {
  //     id: 1,
  //     citationOrigin: '1',
  //     publication: 'publication',
  //     publicationURL: '/',
  //     title: 'title',
  //     priorityDate: '20/2',
  //     publicationDate: '8/8',
  //     applicants: 'applicants',
  //     IPC: 'IPC',
  //     CPC: 'CPC',
  //   },
  //   {
  //     id: 2,
  //     citationOrigin: '2',
  //     publication: 'publication',
  //     publicationURL: '/',
  //     title: 'title',
  //     priorityDate: '20/2',
  //     publicationDate: '8/8',
  //     applicants: 'applicants',
  //     IPC: 'IPC',
  //     CPC: 'CPC',
  //   },
  // ];

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
              className="p-0 pe-5"
              text={<FontAwesomeIcon icon={faChevronLeft} className="md-text text-gray" />}
              disabled={!previousDocument}
              onClick={() => setActiveDocument(previousDocument)}
            />
            <Button
              variant="link"
              className="p-0 pe-5 border-end me-4"
              text={<FontAwesomeIcon icon={faChevronRight} className="md-text text-gray" />}
              disabled={!nextDocument}
              onClick={() => setActiveDocument(nextDocument)}
            />
            <Button
              variant="link"
              onClick={collapseIPR}
              className="p-0 pe-5 d-md-inline-block d-none"
              data-testid="expand-ipr-detail-button"
              text={<FontAwesomeIcon icon={isIPRExpanded ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} className={`f-17 text-gray ${style['expand-icon']}`} />}
            />
            <Button
              variant="link"
              data-testid="close-ipr-detail-button"
              onClick={onClose}
              className="p-0"
              text={<FontAwesomeIcon icon={faTimes} className="f-20 text-gray border-start ps-5" />}
            />
          </div>
        </div>
        {
            moreDetails && (
              <div className="ms-6 d-flex align-items-center mb-2">
                <Badge text="ended" varient="secondary" className="text-capitalize me-2" />
                <h5 className="text-capitalize text-primary font-regular mb-0">title</h5>
              </div>
            )
          }
        <p className="text-gray px-6">
          <HandleEmptyAttribute checkOn={document.BibliographicData.owner} />
        </p>
        {
            moreDetails && (
              <div className={`ms-6 mb-4 ${style.img}`}>
                <Image src={c} />
              </div>
            )
}
      </div>
      <div className="px-6 pt-4">
        <Formik>
          {() => (
            <Form>
              <div className="position-relative">
                <span className={`position-absolute f-12 ${formStyle.label} ${formStyle.select2}`}>{t('viewSection')}</span>
                <Select
                  options={sectionsOptions}
                  onChangeSelect={onChangeSelect}
                  selectedOption={sectionsOptions[0]}
                  id="viewSection"
                  fieldName="viewSection"
                  className={`${style.select} mb-5 select-2`}
                />
              </div>
            </Form>
          )}
        </Formik>
        <BibliographicDataSection document={document} />
        {/* <Citation>
          {
            citation.map((row) => (
              <CitationRow row={row} />
            ))
          }
        </Citation> */}
      </div>
    </div>
  );
}

IprDetails.propTypes = {
  collapseIPR: PropTypes.func.isRequired,
  isIPRExpanded: PropTypes.bool.isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func,
  moreDetails: PropTypes.bool,
  getNextDocument: PropTypes.func,
  getPreviousDocument: PropTypes.func,
  setActiveDocument: PropTypes.func,
};

IprDetails.defaultProps = {
  documentId: null,
  onClose: () => {},
  moreDetails: false,
  getNextDocument: () => {},
  getPreviousDocument: () => {},
  setActiveDocument: () => {},
};

export default IprDetails;
