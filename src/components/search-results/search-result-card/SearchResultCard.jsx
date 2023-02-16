import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../../shared/button/Button';
import Checkbox from '../../shared/form/checkboxes/checkbox/Checkbox';
import style from './style.module.scss';

function SearchResultCard({ searchResult }) {
  const { t } = useTranslation('search');
  return (
    <div className={`${style['result-card']} mb-7 position-relative px-1`}>
      <div className="d-flex align-items-center mb-1">
        <Checkbox />
        {/* please wrap the search keyword with <span className="font-bold"></span> */}
        <Button variant="link" className="text-start f-20 pe-0 py-0 text-primary-dark" text={searchResult.title} />
      </div>
      <p className="mb-2">{searchResult.publicationNumber}</p>
      <p className="font-medium mb-2 d-lg-flex align-items-center">
        {t('priority', { value: searchResult.priority })}
        <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
        {t('filed', { value: searchResult.filingNumber })}
        {
          searchResult.publishedAt && (
            <>
              <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
              {t('published', { value: searchResult.publishedAt })}
            </>
          )
        }
      </p>
      {/* please wrap the search keyword with <span className="font-bold"></span> */}
      <p className="text-gray sm-text">{searchResult.abstract}</p>
    </div>
  );
}

SearchResultCard.propTypes = {
  searchResult: PropTypes.shape({
    abstract: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publicationNumber: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    filingNumber: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchResultCard;
