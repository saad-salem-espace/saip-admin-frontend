import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { trimStringRelativeToSubtext } from 'utils/strings';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import Highlighter from 'react-highlight-words';
import style from './style.module.scss';

function SearchResultCard({
  searchResult, query, setActiveDocument, activeDocument, flattenedCriteria,
}) {
  const { t } = useTranslation('search');
  const { BibliographicData } = searchResult;

  return (
    <Button
      variant="transparent"
      onClick={() => { setActiveDocument(BibliographicData.FilingNumber); }}
      className="text-start f-20 px-1 py-0 font-regular text-primary-dark border-0"
      text={(
        <div className={`${activeDocument === BibliographicData.FilingNumber ? style.active : ''} ${style['result-card']} mb-7 position-relative `}>
          <div className="d-flex align-items-start mb-1">
            <Checkbox className="me-4" />
            <Highlighter
              highlightTag="span"
              highlightClassName="font-bold"
              textToHighlight={trimStringRelativeToSubtext(
                BibliographicData.ApplicationTitle,
                query,
              )}
              searchWords={flattenedCriteria}
              autoEscape
            />

          </div>
          <p className="mb-2 text-black">
            {BibliographicData.PublicationNumber}
          </p>
          <p className="font-medium mb-2 d-lg-flex align-items-center text-dark f-14">
            {t('priority', { value: searchResult.Priority })}
            <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
            {t('filed', { value: BibliographicData.FilingNumber })}
            {
          BibliographicData.PublicationDate && (
            <>
              <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
              {t('published', { value: BibliographicData.PublicationDate })}
            </>
          )
        }
          </p>
          <p className="text-gray sm-text">
            <Highlighter
              highlightTag="span"
              highlightClassName="font-bold"
              textToHighlight={trimStringRelativeToSubtext(
                BibliographicData.ApplicationAbstract.join(' '),
                query,
              )}
              searchWords={flattenedCriteria}
              autoEscape
            />
          </p>
        </div>
       )}
    />
  );
}

SearchResultCard.propTypes = {
  searchResult: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      ApplicationAbstract: PropTypes.arrayOf(PropTypes.string).isRequired,
      ApplicationTitle: PropTypes.string.isRequired,
      FilingNumber: PropTypes.string.isRequired,
      PublicationNumber: PropTypes.string.isRequired,
      PublicationDate: PropTypes.string.isRequired,
    }),
    Priority: PropTypes.string.isRequired,
  }).isRequired,
  query: PropTypes.string.isRequired,
  flattenedCriteria: PropTypes.arrayOf(PropTypes.string),
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
};

SearchResultCard.defaultProps = {
  flattenedCriteria: [],
};

export default SearchResultCard;
