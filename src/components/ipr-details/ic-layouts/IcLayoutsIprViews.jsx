import PropTypes from 'prop-types';
import Carousel from 'components/shared/carousel/Carousel';
import NoData from 'components/shared/empty-states/NoData';
import { useTranslation } from 'react-i18next';
import BibliographicDataSection from './bibliographic-data-section/BibliographicDataSection';
import LegalStatus from '../shared/legal-status/LegalStatus';
import LegalStatusRow from '../shared/legal-status/LegalStatusRow';
import Applicants from '../shared/applicants/Applicants';
import ApplicantRow from '../shared/applicants/ApplicantRow';
import Representatives from '../shared/representatives/Representatives';
import RepresentativeRow from '../shared/representatives/RepresentativeRow';
import Priorities from '../shared/priorities/Priorities';
import PriorityRow from '../shared/priorities/PriorityRow';
import OriginalDocument from '../shared/original-document/OriginalDocument';
import DesignerDetails from '../shared/designer-details/DesignerDetails';
import DesignerDetailsRow from '../shared/designer-details/DesignerDetailsRow';
import Description from '../patent/description/Description';

const IcLayoutsIprViews = ({
  isIPRExpanded, document, preparedGetAttachmentURL, documentId, searchResultParams,
  selectedView, handleClick, examinerView, fromFocusArea, handleCloseIprDetail,
}) => {
  const { t } = useTranslation('search');
  const content = {
    BibliographicData: (
      <BibliographicDataSection
        BibliographicData={document.BibliographicData}
        isIPRExpanded={isIPRExpanded}
        handleClick={handleClick}
        examinerView={examinerView}
      >
        <h6 className={`disable-highlight ${!isIPRExpanded && 'mt-4'}`}>{t('ipr.drawings')}</h6>
        {document?.Drawings?.length ? (
          <Carousel
            largeThumb={isIPRExpanded}
            className="drawings"
            images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            fromFocusArea={fromFocusArea}
            handleCloseIprDetail={handleCloseIprDetail}
          />
        ) : (
          <NoData />
        )}
      </BibliographicDataSection>
    ),
    Priorities: (
      <div>
        {document?.Priorities?.length ? (
          <Priorities>
            {document?.Priorities.map((row) => (
              <PriorityRow row={row} />
            ))}
          </Priorities>
        ) : (
          <NoData />
        )}
      </div>
    ),
    LegalStatus: (
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
    ),
    ApplicantsDetails: (
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
    ),
    DesignersDetails: (
      <div>
        {document.DesignersDetails.length ? (
          <DesignerDetails>
            {document.DesignersDetails.map((row) => (
              <DesignerDetailsRow row={row} />
            ))}
          </DesignerDetails>
        ) : (
          <NoData />
        )}
      </div>
    ),
    RepresentativesDetails: (
      <div>
        {document?.RepresentativesDetails?.length ? (
          <Representatives>
            {document?.RepresentativesDetails.map((row) => (
              <RepresentativeRow row={row} />
            ))}
          </Representatives>
        ) : (
          <NoData />
        )}
      </div>
    ),

    Drawings: (
      <div>
        {document.Drawings.length ? (
          <Carousel
            largeThumb
            className="drawings"
            images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            fromFocusArea={fromFocusArea}
            handleCloseIprDetail={handleCloseIprDetail}
          />
        ) : (
          <NoData />
        )}
      </div>
    ),
    OriginalDocuments: (
      <OriginalDocument
        originalDocuments={document.OriginalDocuments}
        workstreamId={searchResultParams.workstreamId}
        documentId={documentId}
      />
    ),
    Description: (
      <Description
        description={document.BibliographicData.Description}
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
            fromFocusArea={fromFocusArea}
            handleCloseIprDetail={handleCloseIprDetail}
          />
        ) : (
          <NoData />
        )}
      </Description>
    ),
  };
  return content[selectedView];
};

IcLayoutsIprViews.propTypes = {
  isIPRExpanded: PropTypes.bool.isRequired,
  selectedView: PropTypes.string.isRequired,
  document: PropTypes.shape.isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchResultParams: PropTypes.shape.isRequired,
  preparedGetAttachmentURL: PropTypes.func.isRequired,
  showSearchQuery: PropTypes.bool.isRequired,
  hideSearchQueryMenu: PropTypes.func.isRequired,
  handleCloseIprDetail: PropTypes.func.isRequired,
  ShowSearchQueryMenu: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
  fromFocusArea: PropTypes.bool,
};

IcLayoutsIprViews.defaultProps = {
  examinerView: false,
  fromFocusArea: false,
};

export default IcLayoutsIprViews;
