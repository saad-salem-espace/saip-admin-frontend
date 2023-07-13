import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import Badge from 'components/shared/badge/Badge';
import Highlighter from 'react-highlight-words';
import { trimStringRelativeToSubtext } from 'utils/strings';
import Moment from 'moment';
import style from '../search-result-cards/search-result-card/style.module.scss';
import './style.scss';
import { LONG_DATE } from '../../../constants';

function CopyrightsResultCard({
  searchResult,
  setActiveDocument, activeDocument, highlightWords, query, disableCheckbox, selectedView,
}) {
  const { BibliographicData } = searchResult;
  const { t } = useTranslation('search');
  return (
    <Button
      variant="transparent"
      onClick={() => { setActiveDocument(BibliographicData?.FilingNumber); }}
      className="text-start px-1 py-0 font-regular app-text-primary-dark border-0 w-100"
      text={(
        <div className={`${activeDocument === BibliographicData?.FilingNumber ? style.active : ''} ${style['result-card']} mb-8 position-relative `}>
          <div className="mb-1">
            <div className="d-flex">
              {!disableCheckbox && <Checkbox
                className="me-4"
                name={`selectedCards.${BibliographicData?.FilingNumber}`}
                fieldFor={`selectedCards.${BibliographicData?.FilingNumber}`}
              />}
              <div className="d-flex align-items-center mb-2">
                <Badge text={BibliographicData?.Status} className="text-capitalize me-2 mt-1 bg-secondary" />
                <span className="d-block fs-20 text-truncate">
                  {BibliographicData?.Title
                    && (
                      <Highlighter
                        highlightTag="span"
                        highlightClassName="font-medium"
                        textToHighlight={trimStringRelativeToSubtext(
                          BibliographicData?.Title,
                          query,
                        )}
                        searchWords={highlightWords}
                        autoEscape
                      />)}
                </span>
              </div>
            </div>
            <p className="mb-2 d-xxl-flex align-items-center text-dark fs-base">
              {BibliographicData?.FilingNumber}
              <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
              {BibliographicData?.Applicants && (BibliographicData?.Applicants.join(' , '))}
            </p>
            <p className="mb-2 text-black fs-sm font-medium">
              {t('filed', { value: Moment(BibliographicData?.FilingDate).format(LONG_DATE) })}
              <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
              {t('published', { value: Moment(BibliographicData?.PublicationDate).format(LONG_DATE) })}
              <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
              {t('copyrights.granted', { value: Moment(BibliographicData?.GrantDate).format(LONG_DATE) })}
            </p>
            {
              selectedView.value === 'detailed' && (
                <p className="fs-sm text-gray">
                  {BibliographicData?.Description
                    && (
                      <Highlighter
                        highlightTag="span"
                        highlightClassName="font-medium"
                        textToHighlight={trimStringRelativeToSubtext(
                          BibliographicData?.Description,
                          query,
                        )}
                        searchWords={highlightWords}
                        autoEscape
                      />)}
                </p>
              )
            }
          </div>
        </div>
      )}
    />
  );
}

CopyrightsResultCard.propTypes = {
  searchResult: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      Status: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      FilingNumber: PropTypes.string.isRequired,
      FilingDate: PropTypes.string.isRequired,
      PublicationDate: PropTypes.string.isRequired,
      GrantDate: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Applicants: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  query: PropTypes.string,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
  disableCheckbox: PropTypes.bool.isRequired,
  selectedView: PropTypes.instanceOf(Object).isRequired,
};

CopyrightsResultCard.defaultProps = {
  highlightWords: [],
  query: '',
};
export default CopyrightsResultCard;
