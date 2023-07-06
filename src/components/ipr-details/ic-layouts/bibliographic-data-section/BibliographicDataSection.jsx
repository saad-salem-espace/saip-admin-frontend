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
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import ShowMore from 'components/shared/show-more/ShowMore';

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
            value={BibliographicData.ApplicationTitle}
          />
          <LabelValue
            label={t('ipr.filingNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.FilingNumber}
          />
          <LabelValue
            label={t('ipr.filingDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.FilingDate}
          />
          <LabelValue
            label={t('ipr.publicationNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PublicationNumber}
          />
          <LabelValue
            label={t('ipr.publicationDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PublicationDate}
          />
          <LabelValue
            label={t('plantVariety.status')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Status}
          />
          <LabelValue
            label={t('ipr.registrationNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.RegistrationNumber}
          />
          <LabelValue
            label={t('ipr.registrationDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.RegistrationDate}
          />
          <LabelValue
            label={t('ipr.earliestPriorityDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PriorityDate}
          />
          <LabelValue
            label={t('ipr.earliestPriorityNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PriorityNumber}
          />
          <LabelValue
            label={t('applicants')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Applicants.join('; ')}
          />
          <LabelValue
            label={t('industrialDesign.designers')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Designers.join('; ')}
          />
          <LabelValue
            label={t('ipr.representatives')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Representatives.join('; ')}
          />
          <p className="app-text-primary f-14 disable-highlight">{t('abstract')}</p>
          <div className="fs-sm">
            <ShowMore>
              <HandleEmptyAttribute checkOn={BibliographicData?.Abstract.join(' ')} />
            </ShowMore>
          </div>
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
    Status: PropTypes.string,
    RegistrationNumber: PropTypes.string,
    RegistrationDate: PropTypes.string,
    PriorityDate: PropTypes.string,
    PriorityNumber: PropTypes.string,
    Applicants: PropTypes.arrayOf(PropTypes.string),
    Representatives: PropTypes.arrayOf(PropTypes.string),
    Designers: PropTypes.arrayOf(PropTypes.string),
    Abstract: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

BibliographicDataSection.defaultProps = {
  examinerView: false,
};

export default BibliographicDataSection;
