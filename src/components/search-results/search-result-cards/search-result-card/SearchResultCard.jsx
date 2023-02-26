import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { trimStringRelativeToSubtext } from 'utils/strings';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import Highlighter from 'react-highlight-words';
import style from './style.module.scss';

function SearchResultCard({ searchResult, query }) {
  const { t } = useTranslation('search');
  const { BibliographicData } = searchResult;

  return (
    <div className={`${style['result-card']} mb-7 position-relative px-1`}>
      <div className="d-flex align-items-start mb-1">
        <Checkbox className="mt-1" />
        <Button
          variant="link"
          className="text-start f-20 pe-0 py-0 text-primary-dark"
          text={(
            <Highlighter
              highlightTag="span"
              highlightClassName="font-bold"
              textToHighlight={trimStringRelativeToSubtext(
                BibliographicData.ApplicationTitle,
                query,
              )}
              searchWords={[query]}
              autoEscape
            />
          )}
        />
      </div>
      <p className="mb-2">
        {BibliographicData.PublicationNumber}
      </p>
      <p className="font-medium mb-2 d-lg-flex align-items-center">
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
          searchWords={[query]}
          autoEscape
        />
      </p>
    </div>
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
};

export default SearchResultCard;
