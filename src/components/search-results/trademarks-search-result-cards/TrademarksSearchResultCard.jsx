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
  disableCheckbox,
}) {
  const { BibliographicData } = searchResult;
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const preparedGetAttachmentURL = (fileName, fileType = 'image') => getAttachmentURL(
    {
      workstreamId: searchParams.get('workstreamId') || '2', id: BibliographicData?.FilingNumber, fileName, fileType,
    },
  );

  return (
    <Button
      variant="transparent"
      onClick={() => { setActiveDocument(BibliographicData?.FilingNumber); }}
      className="text-start f-20 px-1 py-0 font-regular app-text-primary-dark border-0 w-100"
      text={(
        <div className={`${activeDocument === BibliographicData?.FilingNumber ? style.active : ''} ${style['result-card']} mb-7 position-relative `}>
          <div className="mb-1">
            <div className="d-flex">
              <div className={`${BibliographicData?.TrademarkLastStatus ? 'checkbox-badge' : ''} d-flex`}>
                {!disableCheckbox && <Checkbox
                  className="me-4"
                  name={`selectedCards.${BibliographicData?.FilingNumber}`}
                  fieldFor={`selectedCards.${BibliographicData?.FilingNumber}`}
                />}
                {
                  BibliographicData?.TrademarkLastStatus && (
                    <Badge text={BibliographicData?.TrademarkLastStatus} className="text-capitalize mb-2 me-2 mt-1 app-bg-secondary" />
                  )
                }
              </div>
              <div className="title">
                <span className="d-block text-truncate mb-1">
                  {BibliographicData?.BrandNameEn && <Highlighter
                    highlightTag="span"
                    highlightClassName="font-medium"
                    textToHighlight={trimStringRelativeToSubtext(
                      BibliographicData?.BrandNameEn,
                      query,
                    )}
                    searchWords={highlightWords}
                    autoEscape
                  />}
                </span>
              </div>
            </div>
            <div className="d-flex">
              <div className="searchImgWrapper border rounded me-2">
                <Image src={preparedGetAttachmentURL(BibliographicData?.Mark)} className="rounded" />
              </div>
              <div className="title">
                <span className="d-block text-truncate">
                  {BibliographicData?.BrandNameAr && <Highlighter
                    highlightTag="span"
                    highlightClassName="font-medium"
                    textToHighlight={trimStringRelativeToSubtext(
                      BibliographicData?.BrandNameAr,
                      query,
                    )}
                    searchWords={highlightWords}
                    autoEscape
                  />}
                </span>
                <div>
                  <p className="mb-1 text-black md-text">
                    {t('filed', { value: BibliographicData?.FilingNumber })}
                    {BibliographicData?.FilingDate && (<FontAwesomeIcon icon={faCircle} className="mx-1 f-5" />)}
                    <span>{BibliographicData?.FilingDate}</span>
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
                        {
                          BibliographicData?.RegistrationNumber && (
                            <>
                              <FontAwesomeIcon icon={faCircle} className="mx-1 f-5" />
                              {t('ipr.registered', { value: BibliographicData?.RegistrationNumber })}
                            </>
                          )
                        }
                        {
                          BibliographicData?.RegistrationDate && (
                            <>
                              <FontAwesomeIcon icon={faCircle} className="mx-1 f-5" />
                              <span>{BibliographicData?.RegistrationDate}</span>
                            </>
                          )
                        }
                      </p>
                      <p className="font-medium mb-0 d-xxl-flex align-items-center text-dark sm-text">
                        {
                          BibliographicData?.PublicationNumber && (
                            <>
                              <FontAwesomeIcon icon={faCircle} className="mx-1 f-5" />
                              {t('ipr.published', { value: BibliographicData?.PublicationNumber })}
                            </>
                          )
                        }
                        {
                          BibliographicData?.PublicationDate && (
                            <>
                              <FontAwesomeIcon icon={faCircle} className="mx-1 f-5" />
                              <span>{BibliographicData?.PublicationDate}</span>
                            </>
                          )
                        }
                      </p>
                    </>
                  )
                }
                </div>
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
  query: PropTypes.string,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
  disableCheckbox: PropTypes.bool.isRequired,
};

TrademarksSearchResultCard.defaultProps = {
  highlightWords: [],
  query: '',
};
export default TrademarksSearchResultCard;
