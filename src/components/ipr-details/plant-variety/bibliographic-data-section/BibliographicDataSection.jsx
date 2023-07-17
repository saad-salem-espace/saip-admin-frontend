import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './bibliographic.scss';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { highlightListener } from 'utils/eventListeners';
import Row from 'react-bootstrap/Row';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';
import LabelValue from 'components/ipr-details/shared/label-value/LabelValue';

const BibliographicDataSection = (
  {
    BibliographicData,
    handleClick,
    examinerView,
  },
) => {
  const { t } = useTranslation('search');

  const [left, setLeft] = useState();
  const [top, setTop] = useState();

  useEffect(() => {
    const handleSelectionChange = () => {
      highlightListener(setLeft, setTop);
    };
    if (examinerView) {
      window.addEventListener('selectionchange', handleSelectionChange);
    }
    return () => {
      window.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const btnPosition = {
    left: `${left + 17}px`,
    top: `${top - 38}px`,
  };

  return (
    <Container fluid>
      <Row>
        <Col id="col">
          <KeywordPlannerButton btnPosition={btnPosition} handleClick={handleClick} />
          <LabelValue
            label={t('plantVariety.title')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.ApplicationTitle}
          />
          <LabelValue
            label={t('ipr.filingNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.FilingNumber}
          />
          <LabelValue
            label={t('ipr.filingDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.FilingDate}
          />
          <LabelValue
            label={t('plantVariety.classification')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.Classification.join(' , ')}
          />
          <LabelValue
            label={t('ipr.publicationNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.PublicationNumber}
          />
          <LabelValue
            label={t('ipr.publicationDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.PublicationDate}
          />
          <LabelValue
            label={t('plantVariety.status')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.Status}
          />
          <LabelValue
            label={t('plantVariety.ipOffice')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.IPOffice}
          />
          <LabelValue
            label={t('ipr.earliestPriorityDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.PriorityDate}
          />
          <LabelValue
            label={t('ipr.earliestPriorityNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.PriorityNumber}
          />
          <LabelValue
            label={t('applicants')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.Applicants?.join('; ')}
          />
          <LabelValue
            label={t('inventors')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.Inventors?.join('; ')}
          />
          <LabelValue
            label={t('ipr.representatives')}
            labelClassName="bibliographicLabel"
            value={BibliographicData?.Representatives?.join('; ')}
          />
        </Col>
      </Row>
    </Container>
  );
};

BibliographicDataSection.propTypes = {
  BibliographicData: PropTypes.shape({
    ApplicationTitle: PropTypes.string,
    FilingNumber: PropTypes.string,
    FilingDate: PropTypes.string,
    PublicationNumber: PropTypes.string,
    PublicationDate: PropTypes.string,
    Classification: PropTypes.arrayOf(PropTypes.string),
    Status: PropTypes.string,
    IPOffice: PropTypes.string,
    PriorityDate: PropTypes.string,
    PriorityNumber: PropTypes.string,
    Applicants: PropTypes.arrayOf(PropTypes.string),
    Representatives: PropTypes.arrayOf(PropTypes.string),
    Inventors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

BibliographicDataSection.defaultProps = {
  examinerView: false,
};

export default BibliographicDataSection;
