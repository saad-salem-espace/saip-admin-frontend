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
import './style.scss';

function TrademarksSearchResultCard({
  searchResult,
  setActiveDocument, activeDocument, selectedView, highlightWords, query,
}) {
  const { BibliographicData } = searchResult;
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const preparedGetAttachmentURL = (fileName, fileType = 'image') => getAttachmentURL(
    {
      workstreamId: searchParams.get('workstreamId'), id: BibliographicData.FilingNumber, fileName, fileType,
    },
  );

  return (
    <Button
      variant="transparent"
      onClick={() => { setActiveDocument(BibliographicData.FilingNumber); }}
      className="text-start f-20 px-1 py-0 font-regular text-primary-dark border-0 w-100"
      text={(
        <div className={`${activeDocument === BibliographicData.FilingNumber ? style.active : ''} ${style['result-card']} mb-7 position-relative `}>
          <div className="d-flex mb-1">
            <div>
              <div className="d-flex">
                <Checkbox className="me-4" />
                <Badge text={BibliographicData.TrademarkLastStatus} varient="secondary" className="text-capitalize mb-2 me-2 mt-1" />
              </div>
              <div className="searchImgWrapper border rounded me-2">
                <Image src={preparedGetAttachmentURL(BibliographicData.Mark)} className="rounded" />
              </div>
            </div>
            <div className="title">
              <span className="d-block text-truncate mb-1">
                {BibliographicData.BrandNameEn && <Highlighter
                  highlightTag="span"
                  highlightClassName="font-medium"
                  textToHighlight={trimStringRelativeToSubtext(
                    BibliographicData.BrandNameEn,
                    query,
                  )}
                  searchWords={highlightWords}
                  autoEscape
                />}
              </span>
              <span className="d-block text-truncate">
                {BibliographicData.BrandNameAr && <Highlighter
                  highlightTag="span"
                  highlightClassName="font-medium"
                  textToHighlight={trimStringRelativeToSubtext(
                    BibliographicData.BrandNameAr,
                    query,
                  )}
                  searchWords={highlightWords}
                  autoEscape
                />}
              </span>
              <div>
                <p className="mb-1 text-black md-text">
                  {t('filed', { value: BibliographicData.FilingNumber })}
                  <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
                  <span>{BibliographicData.FilingDate}</span>
                </p>
                {
                  (selectedView.value === 'detailed' || selectedView.value === 'summary') && (
                    <p className="text-gray md-text mb-2">
                      {BibliographicData?.Applicants?.join('; ')}
                    </p>)
                }
                {
                  selectedView.value === 'detailed' && (
                    <>
                      <p className="font-medium mb-2 d-xxl-flex align-items-center text-dark sm-text">
                        <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
                        {t('trademarks.registered', { value: BibliographicData.RegistrationNumber })}
                        <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
                        <span>{BibliographicData.RegistrationDate}</span>
                      </p>
                      <p className="font-medium mb-0 d-xxl-flex align-items-center text-dark sm-text">
                        <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
                        {t('trademarks.published', { value: BibliographicData.PublicationNumber })}
                        <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
                        <span>{BibliographicData.PublicationDate}</span>
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

TrademarksSearchResultCard.propTypes = {
  searchResult: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      Applicants: PropTypes.arrayOf(PropTypes.string),
      BrandNameEn: PropTypes.string.isRequired,
      BrandNameAr: PropTypes.string.isRequired,
      ApplicationTitle: PropTypes.string.isRequired,
      FilingNumber: PropTypes.string.isRequired,
      FilingDate: PropTypes.string.isRequired,
      RegistrationNumber: PropTypes.string.isRequired,
      RegistrationDate: PropTypes.string.isRequired,
      PublicationNumber: PropTypes.string.isRequired,
      PublicationDate: PropTypes.string.isRequired,
      Mark: PropTypes.string.isRequired,
      TrademarkLastStatus: PropTypes.string.isRequired,
    }),
  }).isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  query: PropTypes.string.isRequired,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
};

TrademarksSearchResultCard.defaultProps = {
  highlightWords: [],
};
export default TrademarksSearchResultCard;
