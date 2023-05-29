import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import './bibliographic.scss';
import React, { useEffect, useState } from 'react';
import ShowMore from 'components/shared/show-more/ShowMore';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { highlightListener } from 'utils/eventListeners';
import Row from 'react-bootstrap/Row';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';
import LabelValue from 'components/ipr-details/shared/label-value/LabelValue';

const BibliographicDataSection = (
  {
    isIPRExpanded,
    BibliographicData,
    getAttachmentURL,
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
        {
        isIPRExpanded && (
          <Col md={4} className="mb-md-0 mb-2">
            <div className="me-4">
              <Image src={getAttachmentURL(BibliographicData.Mark)} className="mw-100" />
            </div>
          </Col>
        )
      }
        <Col md={isIPRExpanded ? 8 : 12} id="col">
          <KeywordPlannerButton btnPosition={btnPosition} handleClick={handleClick} />
          <h6 className="mb-4 disable-highlight">
            {t('register')}
          </h6>
          <LabelValue
            label={t('trademarks.markNameEN')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.BrandNameEn}
          />
          <LabelValue
            label={t('trademarks.markNameAR')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.BrandNameAr}
          />
          <LabelValue
            label={t('ipr.filingNumber')}
            labelClassName="bibliographicLabel"
            className="mb-4"
            value={BibliographicData.FilingNumber}
          />
          <LabelValue
            label={t('ipr.filingDate')}
            labelClassName="bibliographicLabel"
            className="mb-4"
            value={BibliographicData.FilingDate}
          />
          <LabelValue
            label={t('trademarks.markType')}
            labelClassName="bibliographicLabel"
            className="mb-4"
            value={BibliographicData.TrademarkType}
          />
          <LabelValue
            label={t('trademarks.markStatus')}
            labelClassName="bibliographicLabel"
            className="mb-4"
            value={BibliographicData.TrademarkLastStatus}
          />
          <LabelValue
            label={t('ipr.registrationNumber')}
            labelClassName="bibliographicLabel"
            className="mb-4"
            value={BibliographicData.RegistrationNumber}
          />
          <LabelValue
            label={t('ipr.registrationDate')}
            labelClassName="bibliographicLabel"
            className="mb-4"
            value={BibliographicData.RegistrationDate}
          />
          <LabelValue
            label={t('ipr.publicationNumber')}
            labelClassName="bibliographicLabel"
            className="mb-4"
            value={BibliographicData.PublicationNumber}
          />
          <LabelValue
            label={t('ipr.publicationDate')}
            labelClassName="bibliographicLabel"
            className="mb-4"
            value={BibliographicData.PublicationDate}
          />
          <p className="text-primary f-14 disable-highlight">{t('trademarks.markDescription')}</p>
          <LabelValue
            labelClassName="bibliographicLabel"
            value={
              <ShowMore>
                <HandleEmptyAttribute checkOn={BibliographicData.Description} />
              </ShowMore>
}
            handleClick={handleClick}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.owners')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Owners.join('; ')}
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
            value={BibliographicData.NICEClassification.join('; ')}
            className="mb-4"
          />
        </Col>
      </Row>
    </Container>
  );
};

BibliographicDataSection.propTypes = {
  BibliographicData: PropTypes.shape({
    BrandNameEn: PropTypes.string,
    BrandNameAr: PropTypes.string,
    Mark: PropTypes.string,
    FilingNumber: PropTypes.string,
    FilingDate: PropTypes.string,
    TrademarkType: PropTypes.string,
    TrademarkLastStatus: PropTypes.string,
    RegistrationNumber: PropTypes.string,
    RegistrationDate: PropTypes.string,
    Description: PropTypes.string,
    PublicationNumber: PropTypes.string,
    PublicationDate: PropTypes.string,
    Owners: PropTypes.arrayOf(PropTypes.string),
    Representatives: PropTypes.arrayOf(PropTypes.string),
    Applicants: PropTypes.arrayOf(PropTypes.string),
    NICEClassification: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isIPRExpanded: PropTypes.bool.isRequired,
  getAttachmentURL: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

BibliographicDataSection.defaultProps = {
  examinerView: false,
};

export default BibliographicDataSection;
