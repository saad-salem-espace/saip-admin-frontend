import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ShowMore from 'components/shared/show-more/ShowMore';
import style from './ipr-details.module.scss';
import HandleEmptyAttribute from '../shared/empty-states/HandleEmptyAttribute';
import Carousel from './carousel/Carousel';

const BibliographicDataSection = ({ document }) => {
  const { t } = useTranslation('search');

  const { BibliographicData } = document;

  return (
    <>
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
      <p className="text-primary f-14">{t('images')}</p>
      <HandleEmptyAttribute checkOn={document.Images} RenderedComponent={Carousel} />
    </>
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
    Images: PropTypes.arrayOf(Object),
  }).isRequired,
};

export default BibliographicDataSection;
