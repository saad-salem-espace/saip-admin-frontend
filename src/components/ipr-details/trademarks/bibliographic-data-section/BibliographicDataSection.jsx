import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import './bibliographic.scss';
import ShowMore from 'components/shared/show-more/ShowMore';
import trademarkSample from '../../../../testing-resources/trademarks/sampleTrademark.json';

// eslint-disable-next-line function-paren-newline
const BibliographicDataSection = (
  // { document }
  // eslint-disable-next-line function-paren-newline
) => {
  const { t } = useTranslation('search');

  // const { BibliographicData } = document;
  const { BibliographicData } = trademarkSample;
  return (
    <>
      <h6 className="mt-8 mb-4">
        {t('register')}
      </h6>
      <div className="d-flex">
        <p className="text-primary f-14 bibliographicLabel">{t('trademarks.markName')}</p>
        <p className="f-12">
          <HandleEmptyAttribute checkOn={BibliographicData.BrandNameEn} />
        </p>
      </div>
      <div className="d-flex mb-4">
        <p className="text-primary f-14 bibliographicLabel">{t('trademarks.markName')}</p>
        <p className="f-12">
          <HandleEmptyAttribute checkOn={BibliographicData.BrandNameAr} />
        </p>
      </div>
      <div className="d-flex mb-4">
        <p className="text-primary f-14 bibliographicLabel">{t('trademarks.mark')}</p>
        <p className="f-12">
          <HandleEmptyAttribute checkOn={BibliographicData.Mark} />
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
      <div className="d-flex mb-4">
        <p className="text-primary f-14 bibliographicLabel">{t('classifications')}</p>
        <p className="f-12">
          <HandleEmptyAttribute checkOn={BibliographicData.NICEClassification.join('; ')} />
        </p>
      </div>
    </>
  );
};

// BibliographicDataSection.propTypes = {
//   document: PropTypes.shape({
//     BibliographicData: PropTypes.shape({
//       BrandNameEn: PropTypes.string,
//       BrandNameAr: PropTypes.string,
//       Mark: PropTypes.string,
//       FilingNumber: PropTypes.string,
//       FilingDate: PropTypes.string,
//       TrademarkType: PropTypes.string,
//       TrademarkLastStatus: PropTypes.string,
//       RegistrationNumber: PropTypes.string,
//       RegistrationDate: PropTypes.string,
//       Description: PropTypes.string,
//       PublicationNumber: PropTypes.string,
//       PublicationDate: PropTypes.string,
//       NICEClassification: PropTypes.arrayOf(PropTypes.string),
//     }).isRequired,
//   }),
// };

export default BibliographicDataSection;
