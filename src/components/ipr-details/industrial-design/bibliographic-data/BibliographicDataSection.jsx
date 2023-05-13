import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import './bibliographic.scss';
import ShowMore from 'components/shared/show-more/ShowMore';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const BibliographicDataSection = (
  {
    isIPRExpanded,
    BibliographicData,
    children,
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
  return (
    <Container fluid>
      <Row>
        <Col md={getGrid('bibliographic')}>
          <h6 className="mb-4">
            {t('register')}
          </h6>
          <div className="d-flex">
            <p className="text-primary f-14 bibliographicLabel">{t('industrialDesign.designTitleEn')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.DesignTitleEN} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('industrialDesign.designTitleAr')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.DesignTitleAR} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.filingNumber')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.FilingNumber} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.filingDate')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.FilingDate} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('industrialDesign.designStatus')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.Status} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.registrationNumber')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.RegistrationNumber} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.registrationDate')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.RegistrationDate} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.publicationNumber')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.PublicationNumber} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('ipr.publicationDate')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.PublicationDate} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('abstract')}</p>
            <p className="f-12">
              <ShowMore>
                <HandleEmptyAttribute checkOn={BibliographicData.DesignAbstract} />
              </ShowMore>
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('industrialDesign.designers')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.Designers.join('; ')} />
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
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('classifications')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.LocarnoClassification.join('; ')} />
            </p>
          </div>
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
};

export default BibliographicDataSection;
