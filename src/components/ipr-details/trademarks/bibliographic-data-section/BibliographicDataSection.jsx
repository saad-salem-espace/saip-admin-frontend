import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import './bibliographic.scss';
import ShowMore from 'components/shared/show-more/ShowMore';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const BibliographicDataSection = (
  {
    isIPRExpanded,
    BibliographicData,
  },
) => {
  const { t } = useTranslation('search');

  return (
    <Container fluid>
      <Row>
        {
        isIPRExpanded && (
          <Col md={4} className="mb-md-0 mb-2">
            <div className="me-4">
              <Image src={BibliographicData.Mark} className="mw-100" />
            </div>
          </Col>
        )
      }
        <Col md={isIPRExpanded ? 8 : 12}>
          <h6 className="mb-4">
            {t('register')}
          </h6>
          <div className="d-flex">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.markNameEN')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.BrandNameEn} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.markNameAR')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.BrandNameAr} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.filingNumber')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.FilingNumber} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.filingDate')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.FilingDate} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.markType')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.TrademarkType} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.markStatus')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.TrademarkLastStatus} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.registrationNumber')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.RegistrationNumber} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.registrationDate')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.RegistrationDate} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.publicationNumber')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.PublicationNumber} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.publicationDate')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.PublicationDate} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('trademarks.markDescription')}</p>
            <p className="f-12">
              <ShowMore>
                <HandleEmptyAttribute checkOn={BibliographicData.Description} />
              </ShowMore>
            </p>
          </div>
          {/*  <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.owners')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.Owners.join('; ')} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.applicants')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.Applicants.join('; ')} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.representatives')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.Representatives.join('; ')} />
            </p>
          </div> */}
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('classifications')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.NICEClassification.join('; ')} />
            </p>
          </div>
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
    Owners: PropTypes.string,
    Representatives: PropTypes.string,
    Applicants: PropTypes.string,
    NICEClassification: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isIPRExpanded: PropTypes.string.isRequired,
};

export default BibliographicDataSection;
