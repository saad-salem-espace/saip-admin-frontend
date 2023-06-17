import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import './bibliographic.scss';
import ShowMore from 'components/shared/show-more/ShowMore';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LabelValue from 'components/ipr-details/shared/label-value/LabelValue';
import { highlightListener } from 'utils/eventListeners';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const BibliographicDataSection = (
  {
    isIPRExpanded,
    BibliographicData,
    children,
    handleClick,
    examinerView,
  },
) => {
  const { t } = useTranslation('search');
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
    <Container fluid>
      <Row>
        <Col md={getGrid('bibliographic')} id="col">
          <KeywordPlannerButton handleClick={handleClick} btnPosition={btnPosition} />
          <h6 className="mb-4 disable-highlight">
            {t('register')}
          </h6>
          <LabelValue
            label={t('industrialDesign.designTitleEn')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.DesignTitleEN}
            className="mb-4"
          />
          <LabelValue
            label={t('industrialDesign.designTitleAr')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.DesignTitleAR}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.filingNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.FilingNumber}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.filingDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.FilingDate}
            className="mb-4"
          />
          <LabelValue
            label={t('industrialDesign.designStatus')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Status}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.registrationNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.RegistrationNumber}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.registrationDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.RegistrationDate}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.publicationNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PublicationNumber}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.publicationDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PublicationDate}
            className="mb-4"
          />
          <p className="app-text-primary f-14 disable-highlight">{t('abstract')}</p>
          <LabelValue
            labelClassName="bibliographicLabel"
            value={
              <ShowMore>
                <HandleEmptyAttribute checkOn={BibliographicData.DesignAbstract} />
              </ShowMore>
            }
            className="mb-4"
          />
          <LabelValue
            label={t('industrialDesign.designers')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Designers.join('; ')}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.applicants')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Applicants.join('; ')}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.representatives')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Representatives.join('; ')}
            className="mb-4"
          />
          <LabelValue
            label={t('classifications')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.LocarnoClassification.join('; ')}
            className="mb-4"
          />
        </Col>
        <Col md={getGrid('drawings')} className={isIPRExpanded ? 'border-start' : ''}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

BibliographicDataSection.propTypes = {
  BibliographicData: PropTypes.shape({
    DesignTitleEN: PropTypes.string,
    DesignTitleAR: PropTypes.string,
    Mark: PropTypes.string,
    FilingNumber: PropTypes.string,
    FilingDate: PropTypes.string,
    Status: PropTypes.string,
    RegistrationNumber: PropTypes.string,
    RegistrationDate: PropTypes.string,
    DesignAbstract: PropTypes.string,
    PublicationNumber: PropTypes.string,
    PublicationDate: PropTypes.string,
    Designers: PropTypes.arrayOf(PropTypes.string),
    Representatives: PropTypes.arrayOf(PropTypes.string),
    Applicants: PropTypes.arrayOf(PropTypes.string),
    LocarnoClassification: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isIPRExpanded: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

BibliographicDataSection.defaultProps = {
  examinerView: false,
};

export default BibliographicDataSection;
