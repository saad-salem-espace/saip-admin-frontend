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
    getAttachmentURL,
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
              <Image src={getAttachmentURL(BibliographicData.Mark)} className="mw-100" />
            </div>
          </Col>
        )
      }
        <Col md={isIPRExpanded ? 8 : 12}>
          <h6 className="mb-4">
            {t('register')}
          </h6>
          <div className="d-flex">
            <p className="text-primary f-14 bibliographicLabel">{t('industrialDesign.designTitleEn')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.DesignTitleEn} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('industrialDesign.designTitleAr')}</p>
            <p className="f-12">
              <HandleEmptyAttribute checkOn={BibliographicData.DesignTitleAr} />
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
              <HandleEmptyAttribute checkOn={BibliographicData.DesignStatus} />
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
          <div>
            <p className="text-primary f-14">{t('classifications')}</p>
            <div className="d-flex f-12 mb-5">
              <p className="bibliographicLabel">{t('ipc')}</p>
              <p>
                <HandleEmptyAttribute checkOn={document?.IPCClassification?.IPC?.join('; ')} />
              </p>
            </div>
          </div>
          <div className="d-flex f-12 mb-5">
            <p className="bibliographicLabel">{t('cpc')}</p>
            <p>
              <HandleEmptyAttribute checkOn={document?.CPCClassification?.CPC?.join('; ')} />
            </p>
          </div>
          <div className="d-flex mb-4">
            <p className="text-primary f-14 bibliographicLabel">{t('industrialDesign.designDescription')}</p>
            <p className="f-12">
              <ShowMore>
                <HandleEmptyAttribute checkOn={BibliographicData.Description} />
              </ShowMore>
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
        </Col>
      </Row>
    </Container>
  );
};

BibliographicDataSection.propTypes = {
  BibliographicData: PropTypes.shape({
    DesignTitleEn: PropTypes.string,
    DesignTitleAr: PropTypes.string,
    Mark: PropTypes.string,
    FilingNumber: PropTypes.string,
    FilingDate: PropTypes.string,
    DesignStatus: PropTypes.string,
    RegistrationNumber: PropTypes.string,
    RegistrationDate: PropTypes.string,
    Description: PropTypes.string,
    PublicationNumber: PropTypes.string,
    PublicationDate: PropTypes.string,
    Designers: PropTypes.arrayOf(PropTypes.string),
    Representatives: PropTypes.arrayOf(PropTypes.string),
    Applicants: PropTypes.arrayOf(PropTypes.string),
    NICEClassification: PropTypes.arrayOf(PropTypes.string),
    IPCClassification: PropTypes.shape({
      IPC: PropTypes.arrayOf(PropTypes.string),
    }),
    CPCClassification: PropTypes.shape({
      CPC: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  isIPRExpanded: PropTypes.string.isRequired,
  getAttachmentURL: PropTypes.func.isRequired,
};

export default BibliographicDataSection;
