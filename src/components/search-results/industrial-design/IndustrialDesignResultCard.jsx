import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import Image from 'react-bootstrap/Image';
import Badge from 'components/shared/badge/Badge';
import Highlighter from 'react-highlight-words';
import { trimStringRelativeToSubtext } from 'utils/strings';
import { getAttachmentURL } from 'utils/attachments';
import { useSearchParams } from 'react-router-dom';
import style from '../search-result-cards/search-result-card/style.module.scss';
import '../trademarks-search-result-cards/style.scss';

function IndustrialDesignResultCard({
  searchResult,
  setActiveDocument, activeDocument, highlightWords, query, selectedView,
  disableCheckbox,
}) {
  const { BibliographicData } = searchResult;
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const preparedGetAttachmentURL = (fileName, fileType = 'image') => getAttachmentURL(
    {
      workstreamId: searchParams.get('workstreamId') || '3', id: BibliographicData?.FilingNumber, fileName, fileType,
    },
  );

  const imgFilename = BibliographicData?.OverallProductDrawing
    || searchResult?.Drawings?.[0]?.FileName;

  return (
    <Button
      variant="transparent"
      onClick={() => { setActiveDocument(BibliographicData?.FilingNumber); }}
      className="text-start fs-20 px-1 py-0 font-regular app-text-primary-dark border-0 w-100"
      text={(
        <div className={`${activeDocument === BibliographicData?.FilingNumber ? style.active : ''} ${style['result-card']} mb-7 position-relative `}>
          <div className="d-flex mb-1">
            <div>
              <div className="d-flex">
                {!disableCheckbox && <Checkbox
                  className="me-4"
                  name={`selectedCards.${BibliographicData?.FilingNumber}`}
                  fieldFor={`selectedCards.${BibliographicData?.FilingNumber}`}
                />}
                <Badge text={BibliographicData?.Status} className="text-capitalize mb-2 me-2 mt-1 bg-secondary" />
              </div>
              <div className="searchImgWrapper border rounded me-2">
                <Image src={preparedGetAttachmentURL(imgFilename)} className="rounded" />
              </div>
            </div>
            <div className="title">
              <span className="d-block text-truncate mb-1">
                {BibliographicData?.DesignTitleEN && <Highlighter
                  highlightTag="span"
                  highlightClassName="font-medium"
                  textToHighlight={trimStringRelativeToSubtext(
                    BibliographicData?.DesignTitleEN,
                    query,
                  )}
                  searchWords={highlightWords}
                  autoEscape
                />}
              </span>
              <span className="d-block text-truncate">
                {BibliographicData?.DesignTitleAR && <Highlighter
                  highlightTag="span"
                  highlightClassName="font-medium"
                  textToHighlight={trimStringRelativeToSubtext(
                    BibliographicData?.DesignTitleAR,
                    query,
                  )}
                  searchWords={highlightWords}
                  autoEscape
                />}
              </span>
              <div>
                <p className="mb-1 text-black md-text">
                  {t('filed', { value: BibliographicData?.FilingNumber })}
                  <FontAwesomeIcon icon={faCircle} className="mx-1 small-icon" />
                  <span>{BibliographicData?.FilingDate}</span>
                </p>
                {
                  selectedView.value !== 'compact' && (
                    <p className="text-gray md-text mb-2">
                      {BibliographicData?.Designers?.join('; ')}
                    </p>
                  )
                }
                {
                  selectedView.value === 'detailed' && (
                    <>
                      <p className="font-medium mb-2 d-xxl-flex align-items-center text-dark sm-text">
                        <FontAwesomeIcon icon={faCircle} className="mx-1 small-icon" />
                        {t('ipr.registered', { value: BibliographicData?.RegistrationNumber })}
                        <FontAwesomeIcon icon={faCircle} className="mx-1 small-icon" />
                        <span>{BibliographicData?.RegistrationDate}</span>
                      </p>
                      <p className="font-medium mb-0 d-xxl-flex align-items-center text-dark sm-text">
                        <FontAwesomeIcon icon={faCircle} className="mx-1 small-icon" />
                        {t('ipr.published', { value: BibliographicData?.PublicationNumber })}
                        <FontAwesomeIcon icon={faCircle} className="mx-1 small-icon" />
                        <span>{BibliographicData?.PublicationDate}</span>
                      </p>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}

IndustrialDesignResultCard.propTypes = {
  searchResult: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      Designers: PropTypes.arrayOf(PropTypes.string),
      DesignTitleEN: PropTypes.string.isRequired,
      DesignTitleAR: PropTypes.string.isRequired,
      ApplicationTitle: PropTypes.string.isRequired,
      FilingNumber: PropTypes.string.isRequired,
      FilingDate: PropTypes.string.isRequired,
      RegistrationNumber: PropTypes.string.isRequired,
      RegistrationDate: PropTypes.string.isRequired,
      PublicationNumber: PropTypes.string.isRequired,
      PublicationDate: PropTypes.string.isRequired,
      OverallProductDrawing: PropTypes.string.isRequired,
      Status: PropTypes.string.isRequired,
    }),
    Drawings: PropTypes.arrayOf(PropTypes.shape({
      FileName: PropTypes.string.isRequired,
    })),
  }).isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  query: PropTypes.string,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
  selectedView: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  disableCheckbox: PropTypes.bool.isRequired,
};

IndustrialDesignResultCard.defaultProps = {
  highlightWords: [],
  query: '',
};
export default IndustrialDesignResultCard;
