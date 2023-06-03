import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { trimStringRelativeToSubtext } from 'utils/strings';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import Highlighter from 'react-highlight-words';
import Image from 'react-bootstrap/Image';
import { getAttachmentURL } from 'utils/attachments';
import { useSearchParams } from 'react-router-dom';
import style from './style.module.scss';

function SearchResultCard({
  searchResult, query, setActiveDocument, activeDocument, highlightWords, selectedView,
}) {
  const { t } = useTranslation('search');
  const { BibliographicData } = searchResult;
  const firstDrawing = searchResult?.Drawings?.[0];
  const [searchParams] = useSearchParams();

  const preparedGetAttachmentURL = (fileName, fileType = 'image') => getAttachmentURL({
    workstreamId: searchParams.get('workstreamId') || '1',
    id: BibliographicData?.FilingNumber,
    fileName,
    fileType,
  });
  return (
    <Button
      variant="transparent"
      onClick={() => { setActiveDocument(BibliographicData?.FilingNumber); }}
      className="w-100 text-start f-20 px-1 py-0 font-regular text-primary-dark border-0"
      text={(
        <div className={`${activeDocument === BibliographicData?.FilingNumber ? style.active : ''} ${style['result-card']} mb-7 position-relative `}>
          <div className="d-flex align-items-start mb-1">
            <Checkbox className="me-4" />
            {
              BibliographicData?.ApplicationTitle
              && <Highlighter
                highlightTag="span"
                highlightClassName="font-medium"
                textToHighlight={trimStringRelativeToSubtext(
                  BibliographicData?.ApplicationTitle,
                  query,
                )}
                searchWords={highlightWords}
                autoEscape
              />
            }
          </div>
          <p className="mb-2 text-black md-text">
            {BibliographicData?.PublicationNumber}
          </p>
          <p className="font-medium mb-2 d-lg-flex align-items-center text-dark f-14">
            {t('priority', { value: searchResult?.Priority })}
            <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
            {t('filed', { value: BibliographicData?.FilingNumber })}
            {
              BibliographicData?.PublicationDate && (
                <>
                  <FontAwesomeIcon icon={faCircle} className="mx-1 f-8" />
                  {t('published', { value: BibliographicData?.PublicationDate })}
                </>
              )
            }
          </p>
          <div className="d-flex">
            {
            (firstDrawing && (selectedView.value === 'detailed')) && (
            <div className={`${style['patent-img']} me-2`}>
              <Image src={preparedGetAttachmentURL(firstDrawing.FileName)} />
            </div>
            )
            }
            {
              selectedView.value !== 'compact' && (
                <p className="text-gray sm-text">
                  {
                    BibliographicData?.ApplicationAbstract
                    && <Highlighter
                      highlightTag="span"
                      highlightClassName="font-medium"
                      textToHighlight={trimStringRelativeToSubtext(
                        BibliographicData?.ApplicationAbstract.join(' '),
                        query,
                      )}
                      searchWords={highlightWords}
                      autoEscape
                    />
                  }
                </p>)
            }
          </div>
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
    Priority: PropTypes.string,
    Drawings: PropTypes.arrayOf(PropTypes.shape({
      FileName: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  query: PropTypes.string,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  selectedView: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

SearchResultCard.defaultProps = {
  highlightWords: [],
  query: '',
};

export default SearchResultCard;
