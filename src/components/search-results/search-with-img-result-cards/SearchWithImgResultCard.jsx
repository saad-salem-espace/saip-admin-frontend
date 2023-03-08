import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { trimStringRelativeToSubtext } from 'utils/strings';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import Highlighter from 'react-highlight-words';
import Image from 'react-bootstrap/Image';
import Badge from 'components/shared/badge/Badge';
import style from '../search-result-cards/search-result-card/style.module.scss';
import c from '../../../assets/images/search-header-bg.svg';
import './style.scss';

function SearchWithImgResultCard({
  searchResult, query, setActiveDocument, activeDocument,
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
              searchWords={[query]}
              autoEscape
            />
          </div>
          <div className="d-flex">
            <div className="searchImgWrapper border rounded me-2">
              <Image src={c} className="rounded" />
            </div>
            <div>
              <Badge text="ended" varient="secondary" className="text-capitalize mb-2" />
              <p className="mb-2 text-black">
                {BibliographicData.PublicationNumber}
              </p>
              <p className="text-gray md-text mb-3">
                Hozon New Energy Automobile Co., Ltd. (China)
              </p>
              <p className="font-medium mb-2 d-lg-flex align-items-center text-dark sm-text">
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
            </div>
          </div>
        </div>
      )}
    />
  );
}

SearchWithImgResultCard.propTypes = {
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
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
};

export default SearchWithImgResultCard;