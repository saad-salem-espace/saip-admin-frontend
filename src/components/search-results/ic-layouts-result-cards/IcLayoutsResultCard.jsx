import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/shared/button/Button';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import Highlighter from 'react-highlight-words';
import { trimStringRelativeToSubtext } from 'utils/strings';
import Image from 'react-bootstrap/Image';
import { getAttachmentURL } from 'utils/attachments';
import { useSearchParams } from 'react-router-dom';
import style from '../search-result-cards/search-result-card/style.module.scss';

function IcLayoutsResultCard({
  searchResult,
  setActiveDocument, activeDocument, highlightWords, query, disableCheckbox, selectedView,
}) {
  const { BibliographicData } = searchResult;
  const { t } = useTranslation('search');
  const firstDrawing = searchResult?.Drawings?.[0];
  const [searchParams] = useSearchParams();
  const preparedGetAttachmentURL = (fileName, fileType = 'image') => getAttachmentURL({
    workstreamId: searchParams.get('workstreamId'),
    id: BibliographicData?.FilingNumber,
    fileName,
    fileType,
  });
  return (
    <Button
      variant="transparent"
      onClick={() => { setActiveDocument(BibliographicData?.FilingNumber); }}
      className="w-100 text-start f-20 px-1 py-0 font-regular app-text-primary-dark border-0"
      text={(
        <div className={`${activeDocument === BibliographicData?.FilingNumber ? style.active : ''} ${style['result-card']} mb-7 position-relative `}>
          <div className="d-flex align-items-start mb-1">
            {!disableCheckbox && <Checkbox
              className="me-4"
              name={`selectedCards.${BibliographicData?.FilingNumber}`}
              fieldFor={`selectedCards.${BibliographicData?.FilingNumber}`}
            />}
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
            {
              BibliographicData?.FilingNumber && (
                <Highlighter
                  highlightTag="span"
                  highlightClassName="font-medium"
                  textToHighlight={trimStringRelativeToSubtext(
                    BibliographicData?.FilingNumber,
                    query,
                  )}
                  searchWords={highlightWords}
                  autoEscape
                />
              )
            }
          </p>
          <p className="font-medium mb-2 d-lg-flex align-items-center text-dark f-14">
            {searchResult?.Priorities && (t('priority', { value: searchResult?.Priorities[0]?.PriorityDate }))}
            <FontAwesomeIcon icon={faCircle} className="mx-1 f-5" />
            {t('filed', { value: BibliographicData?.FilingDate })}
            {
              BibliographicData?.PublicationDate && (
                <>
                  <FontAwesomeIcon icon={faCircle} className="mx-1 f-5" />
                  {t('published', { value: BibliographicData?.PublicationDate })}
                </>
              )
            }
          </p>
          <div className="d-flex">
            {
              (firstDrawing && (selectedView.value !== 'compact')) && (
                <div className={`${style['patent-img']} me-2`}>
                  <Image src={preparedGetAttachmentURL(firstDrawing.FileName)} />
                </div>
              )
            }
            <p className="text-gray sm-text">
              {
                BibliographicData?.Applicants && (
                  <Highlighter
                    highlightTag="span"
                    highlightClassName="font-medium"
                    textToHighlight={trimStringRelativeToSubtext(
                      BibliographicData?.Applicants.join(' , '),
                      query,
                    )}
                    searchWords={highlightWords}
                    autoEscape
                  />
                )
              }
            </p>
          </div>
        </div>
      )}
    />
  );
}

IcLayoutsResultCard.propTypes = {
  searchResult: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      PriorityDate: PropTypes.string.isRequired,
      ApplicationTitle: PropTypes.string.isRequired,
      FilingNumber: PropTypes.string.isRequired,
      FilingDate: PropTypes.string.isRequired,
      PublicationDate: PropTypes.string.isRequired,
      Applicants: PropTypes.arrayOf(PropTypes.string),
    }),
    Drawings: PropTypes.arrayOf(PropTypes.shape({
      FileName: PropTypes.string.isRequired,
    })).isRequired,
    Priorities: PropTypes.arrayOf(PropTypes.shape({
      PriorityDate: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeDocument: PropTypes.number.isRequired,
  query: PropTypes.string,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
  disableCheckbox: PropTypes.bool.isRequired,
  selectedView: PropTypes.instanceOf(Object).isRequired,
};

IcLayoutsResultCard.defaultProps = {
  highlightWords: [],
  query: '',
};
export default IcLayoutsResultCard;
