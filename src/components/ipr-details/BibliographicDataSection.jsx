import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ShowMore from 'components/shared/show-more/ShowMore';
import style from './ipr-details.module.scss';
import HandleEmptyAttribute from '../shared/empty-states/HandleEmptyAttribute';

const BibliographicDataSection = ({
  document,
  isIPRExpanded,
  children,
  dashboard,
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
    if (dashboard) {
      if (view === 'drawings') {
        grid = 12;
      } else {
        grid = 6;
      }
    }
    return grid;
  };
  return (
    <Row>
      <Col md={getGrid('bibliographic')}>
        <h6 className="mt-8 mb-4">{t('register')}</h6>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('applicants')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document?.Applicants?.join('; ')} />
          </p>
        </div>
        <div className="d-flex mb-4">
          <p className={`text-primary f-14 ${style.label}`}>{t('inventors')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document?.Inventors?.join('; ')} />
          </p>
        </div>
        <div>
          <p className="text-primary f-14">{t('classifications')}</p>
          <div className="d-flex f-12 mb-5">
            <p className={`${style.label}`}>{t('ipc')}</p>
            <p>
              <HandleEmptyAttribute checkOn={document?.IPCClassification?.IPC?.join('; ')} />
            </p>
          </div>
        </div>
        <div className="d-flex f-12 mb-5">
          <p className={`${style.label}`}>{t('cpc')}</p>
          <p>
            <HandleEmptyAttribute checkOn={document?.CPCClassification?.CPC?.join('; ')} />
          </p>
        </div>
        {/* <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('priorities')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document?.Priorities} />
          </p>
        </div> */}
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('application')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={BibliographicData?.Application} />
          </p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('publication')}</p>
          <p className="f-12">
            {BibliographicData?.PublicationNumber}
            {' '}
            {BibliographicData?.PublicationDate}
          </p>
        </div>
        <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('publishedAs')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document?.Priorities?.PublishedAs} />
          </p>
        </div>
        <p className="text-primary f-14">{t('abstract')}</p>
        <p className="f-14">
          <ShowMore>
            <HandleEmptyAttribute checkOn={BibliographicData?.ApplicationAbstract.join(' ')} />
          </ShowMore>
        </p>
      </Col>
      <Col md={getGrid('drawings')} className={isIPRExpanded ? 'border-start' : ''}>
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
  dashboard: PropTypes.bool,
};

BibliographicDataSection.defaultProps = {
  dashboard: false,
};

export default BibliographicDataSection;
