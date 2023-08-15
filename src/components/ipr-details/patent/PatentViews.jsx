import PropTypes from 'prop-types';
import Carousel from 'components/shared/carousel/Carousel';
import NoData from 'components/shared/empty-states/NoData';
import { useTranslation } from 'react-i18next';
import BibliographicDataSection from '../BibliographicDataSection';
import LegalStatus from '../shared/legal-status/LegalStatus';
import LegalStatusRow from '../shared/legal-status/LegalStatusRow';
import Applicants from '../shared/applicants/Applicants';
import ApplicantRow from '../shared/applicants/ApplicantRow';
import Owners from '../shared/owners/Owners';
import OwnerRow from '../shared/owners/OwnerRow';
import Representatives from '../shared/representatives/Representatives';
import RepresentativeRow from '../shared/representatives/RepresentativeRow';
import OfficeActions from '../shared/office-actions/OfficeActions';
import OfficeActionRow from '../shared/office-actions/OfficeActionRow';
import Priorities from '../shared/priorities/Priorities';
import PriorityRow from '../shared/priorities/PriorityRow';
import PatentDescription from './description/Description';
import Citations from './citations/Citations';
import CitationRow from './citations/CitationRow';
import Inventors from './inventors/Inventors';
import InventorRow from './inventors/InventorRow';
import PatentFamility from './patent-famility/PatentFamility';
import PatentFamilityRow from './patent-famility/PatentFamilityRow';
import Claims from './claims/Claims';
import OriginalDocument from '../shared/original-document/OriginalDocument';

const PatentViews = ({
  isIPRExpanded, document, preparedGetAttachmentURL, documentId, searchResultParams,
  selectedView, handleClick, examinerView,
  handleCloseIprDetail, fromFocusArea,
}) => {
  const { t } = useTranslation('search');
  const content = (s) => {
    switch (s) {
      case 'BibliographicData': return (
        <BibliographicDataSection
          document={document}
          isIPRExpanded={isIPRExpanded}
          handleClick={handleClick}
          examinerView={examinerView}
        >
          <h6 className="disable-highlight mt-6">{t('ipr.drawings')}</h6>
          {document?.Drawings?.length ? (
            <Carousel
              largeThumb={isIPRExpanded}
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
              handleCloseIprDetail={handleCloseIprDetail}
              fromFocusArea={fromFocusArea}
            />
          ) : (
            <NoData />
          )}
        </BibliographicDataSection>
      );

      case 'LegalStatus': return (
        <div>
          {document?.LegalStatus?.length ? (
            <LegalStatus>
              {document?.LegalStatus.map((row) => (
                <LegalStatusRow row={row} />
              ))}
            </LegalStatus>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'ApplicantsDetails': return (
        <div>
          {document?.ApplicantsDetails?.length ? (
            <Applicants>
              {document?.ApplicantsDetails.map((row) => (
                <ApplicantRow row={row} />
              ))}
            </Applicants>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'OwnersDetails': return (
        <div>
          {document?.OwnersDetails?.length ? (
            <Owners>
              {document?.OwnersDetails.map((row) => (
                <OwnerRow row={row} />
              ))}
            </Owners>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'Representative': return (
        <div>
          {document?.Representative?.length ? (
            <Representatives>
              {document?.Representative.map((row) => (
                <RepresentativeRow row={row} />
              ))}
            </Representatives>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'Citations': return (
        <div>
          {document?.Citations?.length ? (
            <Citations>
              {document?.Citations.map((row) => (
                <CitationRow row={row} />
              ))}
            </Citations>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'Inventors': return (
        <div>
          {document?.InventorsDetails?.length ? (
            <Inventors>
              {document?.InventorsDetails.map((row) => (
                <InventorRow row={row} />
              ))}
            </Inventors>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'OfficeActions': return (
        <div>
          {document?.OfficeActions?.length ? (
            <OfficeActions>
              {document?.OfficeActions.map((row) => (
                <OfficeActionRow row={row} />
              ))}
            </OfficeActions>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'PatentFamility': return (
        <div>
          {document?.PatentFamility?.length ? (
            <PatentFamility>
              {document?.PatentFamility.map((row) => (
                <PatentFamilityRow row={row} />
              ))}
            </PatentFamility>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'PrioritiesDetails': return (
        <div>
          {document?.PrioritiesDetails?.length ? (
            <Priorities>
              {document?.PrioritiesDetails.map((row) => (
                <PriorityRow row={row} />
              ))}
            </Priorities>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'Description': return (
        <PatentDescription
          description={document.Description}
          isIPRExpanded={isIPRExpanded}
          handleClick={handleClick}
          examinerView={examinerView}
        >
          <h6 className="disable-highlight">{t('ipr.drawings')}</h6>
          {document.Drawings?.length ? (
            <Carousel
              largeThumb={isIPRExpanded}
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
              handleCloseIprDetail={handleCloseIprDetail}
              fromFocusArea={fromFocusArea}
            />
          ) : (
            <NoData />
          )}
        </PatentDescription>
      );
      case 'Claims': return (
        <Claims
          claims={document?.Claims}
          isIPRExpanded={isIPRExpanded}
          handleClick={handleClick}
          examinerView={examinerView}
        >
          <h6 className="disable-highlight">{t('ipr.drawings')}</h6>
          {document?.Drawings?.length ? (
            <Carousel
              largeThumb={isIPRExpanded}
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
              handleCloseIprDetail={handleCloseIprDetail}
              fromFocusArea={fromFocusArea}
            />
          ) : (
            <NoData />
          )}
        </Claims>
      );
      case 'Drawings': return (
        <div>
          {document.Drawings.length ? (
            <Carousel
              largeThumb
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
              handleCloseIprDetail={handleCloseIprDetail}
              fromFocusArea={fromFocusArea}
            />
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'OriginalDocuments': return (
        <OriginalDocument
          originalDocuments={document.OriginalDocuments}
          workstreamId={searchResultParams.workstreamId}
          documentId={documentId}
        />
      );
      default: return '';
    }
  };

  return content(selectedView);
};

PatentViews.propTypes = {
  isIPRExpanded: PropTypes.bool.isRequired,
  selectedView: PropTypes.string.isRequired,
  document: PropTypes.shape.isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchResultParams: PropTypes.shape.isRequired,
  preparedGetAttachmentURL: PropTypes.func.isRequired,
  showSearchQuery: PropTypes.bool.isRequired,
  hideSearchQueryMenu: PropTypes.func.isRequired,
  ShowSearchQueryMenu: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
  handleCloseIprDetail: PropTypes.func.isRequired,
  fromFocusArea: PropTypes.bool,
};

PatentViews.defaultProps = {
  examinerView: false,
  fromFocusArea: false,
};

export default PatentViews;
