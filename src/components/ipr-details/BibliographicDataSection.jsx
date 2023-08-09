import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShowMore from 'components/shared/show-more/ShowMore';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';
import { highlightListener } from 'utils/eventListeners';
import HandleEmptyAttribute from '../shared/empty-states/HandleEmptyAttribute';
import LabelValue from './shared/label-value/LabelValue';

const BibliographicDataSection = ({
  document, isIPRExpanded, children, handleClick,
  examinerView,
}) => {
  const { t } = useTranslation('search');
  const { BibliographicData } = document;
  const getGrid = (view) => {
    let grid = 12;
    if (isIPRExpanded) {
      if (view === 'drawings') {
        grid = 5;
      } else {
        grid = 7;
      }
    }
    return grid;
  };

  const getPublishedAs = (doc) => {
    if (!doc?.PrioritiesDetails || doc.PrioritiesDetails.length === 0) return null;
    let publishedAs = '';
    if (doc.PrioritiesDetails[0]?.publishedAs) publishedAs += doc.PrioritiesDetails[0].publishedAs;
    if (doc.PrioritiesDetails.length > 1 && doc.PrioritiesDetails[1]?.publishedAs) {
      publishedAs += ' , ';
      publishedAs += doc.PrioritiesDetails[1].publishedAs;
    }
    return publishedAs;
  };

  const [left, setLeft] = useState();
  const [top, setTop] = useState();

  useEffect(() => {
    const handleSelectionChange = () => {
      highlightListener(setLeft, setTop);
    };
    if (examinerView) {
      window.document.addEventListener('selectionchange', handleSelectionChange);
    }
    return () => {
      window.document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const btnPosition = {
    left: `${left + 17}px`,
    top: `${top - 38}px`,
  };

  return (
    <Row>
      <Col md={getGrid('bibliographic')} id="col">
        <h6 className="mt-7 mb-4 disable-highlight">{t('register')}</h6>
        <KeywordPlannerButton btnPosition={btnPosition} handleClick={handleClick} />
        <LabelValue
          label={t('applicants')}
          value={document?.Applicants?.join('; ')}
        />
        <LabelValue
          label={t('inventors')}
          value={document?.Inventors?.join('; ')}
          className="mb-4"
        />
        <div>
          <p className="app-text-primary fs-sm disable-highlight">{t('classifications')}</p>
          <LabelValue
            label={t('ipc')}
            value={document?.IPCClassification?.IPC?.join('; ')}
            className="fs-xs mb-5"
            customLabel
          />
        </div>
        <LabelValue
          label={t('cpc')}
          value={document?.CPCClassification?.CPC?.join('; ')}
          className="fs-xs mb-5"
          customLabel
        />
        {/* <div className="d-flex">
          <p className={`app-text-primary fs-sm ${style.label}`}>{t('priorities')}</p>
          <p className="fs-xs">
            <HandleEmptyAttribute checkOn={document?.Priorities} />
          </p>
        </div> */}
        <LabelValue
          label={t('application')}
          value={
            <>
              {BibliographicData?.FilingNumber}
              {' '}
              {BibliographicData?.FilingDate}
            </>
          }
        />
        <LabelValue
          label={t('publication')}
          value={
            <>
              {BibliographicData?.PublicationNumber}
              {' '}
              {BibliographicData?.PublicationDate}
            </>
          }
        />
        <LabelValue
          label={t('internationalNumbers')}
          value={getPublishedAs(document)}
        />
        <p className="app-text-primary fs-sm disable-highlight">{t('abstract')}</p>
        <div className="fs-sm">
          <ShowMore>
            <HandleEmptyAttribute checkOn={BibliographicData?.ApplicationAbstract.join(' ')} />
          </ShowMore>
        </div>
      </Col>
      <Col md={getGrid('drawings')} className={`mb-4 ${isIPRExpanded ? 'border-start' : ''}`}>
        {children}
      </Col>
    </Row>
  );
};

BibliographicDataSection.propTypes = {
  document: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      Application: PropTypes.string,
      PublicationNumber: PropTypes.string,
      PublicationDate: PropTypes.string,
      FilingNumber: PropTypes.string,
      FilingDate: PropTypes.string,
      ApplicationAbstract: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    Applicants: PropTypes.arrayOf(PropTypes.string),
    Inventors: PropTypes.arrayOf(PropTypes.string),
    IPCClassification: PropTypes.shape({
      IPC: PropTypes.arrayOf(PropTypes.string),
    }),
    CPCClassification: PropTypes.shape({
      CPC: PropTypes.arrayOf(PropTypes.string),
    }),
    Priorities: PropTypes.shape({
      PublishedAs: PropTypes.string,
    }),
    Drawings: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isIPRExpanded: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

BibliographicDataSection.defaultProps = {
  examinerView: false,
};

export default BibliographicDataSection;
