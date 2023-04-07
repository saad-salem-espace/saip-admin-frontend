import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ShowMore from 'components/shared/show-more/ShowMore';
import NoData from 'components/shared/empty-states/NoData';
import style from './ipr-details.module.scss';
import HandleEmptyAttribute from '../shared/empty-states/HandleEmptyAttribute';
import Carousel from '../shared/carousel/Carousel';

const BibliographicDataSection = ({ document, isIPRExpanded }) => {
  const { t } = useTranslation('search');
  const { BibliographicData } = document;
  return (
    <Row>
      <Col lg={isIPRExpanded ? 7 : 12} md={isIPRExpanded ? 7 : 12}>
        <h6 className="mt-8 mb-4">{t('register')}</h6>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('applicants')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document.Applicants.join('; ')} />
          </p>
        </div>
        <div className="d-flex mb-4">
          <p className={`text-primary f-14 ${style.label}`}>{t('inventors')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document.Inventors.join('; ')} />
          </p>
        </div>
        <div>
          <p className="text-primary f-14">{t('classifications')}</p>
          <div className="d-flex f-12 mb-5">
            <p className={`${style.label}`}>{t('ipc')}</p>
            <p>
              <HandleEmptyAttribute checkOn={document.IPCClassification.IPC.join('; ')} />
            </p>
          </div>
        </div>
        <div className="d-flex f-12 mb-5">
          <p className={`${style.label}`}>{t('cpc')}</p>
          <p>
            <HandleEmptyAttribute checkOn={document.CPCClassification.CPC.join('; ')} />
          </p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('priorities')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document.Priorities} />
          </p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('application')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={BibliographicData.Application} />
          </p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('publication')}</p>
          <p className="f-12">
            {BibliographicData.PublicationNumber}
            {' '}
            {BibliographicData.PublicationDate}
          </p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('publishedAs')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document.Priorities?.PublishedAs} />
          </p>
        </div>
        <p className="text-primary f-14">{t('abstract')}</p>
        <p className="f-14">
          <ShowMore>
            <HandleEmptyAttribute checkOn={BibliographicData.ApplicationAbstract.join(' ')} />
          </ShowMore>
        </p>
      </Col>
      <Col lg={isIPRExpanded ? 5 : 12} md={isIPRExpanded ? 5 : 12} className={isIPRExpanded ? 'border-start' : ''}>
        <h6>{t('ipr.drawings')}</h6>
        {
            document.Drawings ? (
              <Carousel largeThumb={isIPRExpanded} className="drawings" images={document.Drawings} />
            ) : (
              <NoData />
            )
          }
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
};

export default BibliographicDataSection;
