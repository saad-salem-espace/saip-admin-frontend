import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { trimStringRelativeToSubtext } from 'utils/strings';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import style from './style.module.scss';

function SearchResultCard({ searchResult }) {
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const { BibliographicData } = searchResult;

  return (
    <div className={`${style['result-card']} mb-7 position-relative px-1`}>
      <div className="d-flex align-items-start mb-1">
        <Checkbox className="mt-1" />
        {/* please wrap the search keyword with <span className="font-bold"></span> */}
        <Button variant="link" className="text-start f-20 pe-0 py-0 text-primary-dark" text={BibliographicData.ApplicationTitle} />
      </div>
      <p className="mb-2">{BibliographicData.PublicationNumber}</p>
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
      {/* please wrap the search keyword with <span className="font-bold"></span> */}
      <p className="text-gray sm-text">
        {trimStringRelativeToSubtext(
          BibliographicData.ApplicationAbstract.join(' '),
          searchParams.get('query'),
        )}
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
};

export default SearchResultCard;
