import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import Badge from 'components/shared/badge/Badge';
import Highlighter from 'react-highlight-words';
import { trimStringRelativeToSubtext } from 'utils/strings';
import style from '../search-result-cards/search-result-card/style.module.scss';
import './style.scss';

function DecisionsResultCard({
  searchResult,
  setActiveDocument, activeDocument, highlightWords, query, disableCheckbox,
}) {
  const { BibliographicData } = searchResult;
  const { t } = useTranslation('search');
  return (
    <Button
      variant="transparent"
      onClick={() => { setActiveDocument(BibliographicData.FilingNumber); }}
      className="text-start px-1 py-0 font-regular app-text-primary-dark border-0 w-100"
      text={(
        <div className={`${activeDocument === BibliographicData.FilingNumber ? style.active : ''} ${style['result-card']} mb-8 position-relative `}>
          <div className="mb-1">
            <div className="d-flex">
              {!disableCheckbox && <Checkbox
                className="me-4"
                name={`selectedCards.${BibliographicData?.FilingNumber}`}
                fieldFor={`selectedCards.${BibliographicData?.FilingNumber}`}
              />}
              <div className="d-flex align-items-center mb-2">
                <Badge text={BibliographicData.DecisionCategory} className="text-capitalize me-2 mt-1 bg-secondary" />
                <span className="d-block fs-20 text-truncate">
                  {BibliographicData.DecisionTitle
                  && <Highlighter
                    highlightTag="span"
                    highlightClassName="font-medium"
                    textToHighlight={trimStringRelativeToSubtext(
                      BibliographicData.DecisionTitle,
                      query,
                    )}
                    searchWords={highlightWords}
                    autoEscape
                  />}
                </span>
              </div>
            </div>
            <p className="mb-2 text-black fs-base">
              {t('decisions.decisionValue', { value: BibliographicData.FilingNumber })}
              <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
              {t('decisions.date', { value: BibliographicData.DecisionDate })}
            </p>
            <p className="font-medium mb-2 d-xxl-flex align-items-center text-dark fs-sm">
              {BibliographicData.Keywords}
            </p>
            <p className="fs-sm text-gray">{BibliographicData.DecisionBrief}</p>
          </div>
        </div>
      )}
    />
  );
}

DecisionsResultCard.propTypes = {
  searchResult: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      DecisionCategory: PropTypes.string.isRequired,
      DecisionTitle: PropTypes.string.isRequired,
      FilingNumber: PropTypes.string.isRequired,
      DecisionDate: PropTypes.string.isRequired,
      Keywords: PropTypes.string.isRequired,
      DecisionBrief: PropTypes.string.isRequired,
    }),
  }).isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
  disableCheckbox: PropTypes.bool.isRequired,
};

DecisionsResultCard.defaultProps = {
  highlightWords: [],
};
export default DecisionsResultCard;
