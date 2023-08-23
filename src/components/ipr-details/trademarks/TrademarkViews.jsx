import PropTypes from 'prop-types';
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
import TrademarkBibliographic from './bibliographic-data-section/BibliographicDataSection';
import GoodsAndServices from './goods-and-services/GoodsAndServices';
import GoodsAndServicesRow from './goods-and-services/GoodsAndServicesRow';
import FigurativeClassification from './figurative-classification/FigurativeClassification';
import FigurativeClassificationRow from './figurative-classification/FigurativeClassificationRow';
import Exhibitions from './exhibitions/Exhibitions';
import ExhibitionRow from './exhibitions/ExhibitionRow';
import Description from '../shared/description/Description';
import ImageWithZoom from '../shared/image-with-zoom/ImageWithZoom';
import OriginalDocument from '../shared/original-document/OriginalDocument';
import style from '../ipr-details.module.scss';

const TrademarkViews = ({
  isIPRExpanded, document, preparedGetAttachmentURL, documentId, searchResultParams, selectedView,
  handleClick, examinerView, dashboardExpandedView,
  handleCloseIprDetail, fromFocusArea,
}) => {
  const content = (s) => {
    switch (s) {
      case 'BibliographicData': return (
        <TrademarkBibliographic
          isIPRExpanded={isIPRExpanded}
          BibliographicData={document.BibliographicData}
          getAttachmentURL={preparedGetAttachmentURL}
          handleClick={handleClick}
          examinerView={examinerView}
          dashboardExpandedView={dashboardExpandedView}
          handleCloseIprDetail={handleCloseIprDetail}
        />
      );

      case 'LegalStatus': return (
        <LegalStatus>
          {document?.LegalStatus?.map((row) => (
            <LegalStatusRow row={row} />
          ))}
        </LegalStatus>
      );
      case 'ApplicantsDetails': return (
        <Applicants>
          {document.ApplicantsDetails.map((row) => (
            <ApplicantRow row={row} />
          ))}
        </Applicants>
      );
      case 'OwnersDetails': return (
        <Owners>
          {document.OwnersDetails.map((row) => (
            <OwnerRow row={row} />
          ))}
        </Owners>
      );
      case 'RepresentativesDetails': return (
        <Representatives>
          {document.RepresentativesDetails.map((row) => (
            <RepresentativeRow row={row} />
          ))}
        </Representatives>
      );
      case 'OfficeActions': return (
        <OfficeActions>
          {document.OfficeActions.map((row) => (
            <OfficeActionRow row={row} />
          ))}
        </OfficeActions>
      );
      case 'GoodsAndServices': return (
        <GoodsAndServices>
          {document.GoodsAndServices.map((row) => (
            <GoodsAndServicesRow row={row} />
          ))}
        </GoodsAndServices>
      );
      case 'FigurativeClassification': return (
        <FigurativeClassification>
          {document.FigurativeClassification.map((row) => (
            <FigurativeClassificationRow row={row} />
          ))}
        </FigurativeClassification>
      );
      case 'ExhibitionInformation': return (
        <Exhibitions>
          {document.ExhibitionInformation.map((row) => (
            <ExhibitionRow row={row} />
          ))}
        </Exhibitions>
      );
      case 'Priorities': return (
        <Priorities>
          {document.Priorities.map((row) => (
            <PriorityRow row={row} />
          ))}
        </Priorities>
      );
      case 'Description': return (
        <Description
          description={document.BibliographicData.Description}
          handleClick={handleClick}
          examinerView={examinerView}
        />
      );
      case 'Mark': return (
        <ImageWithZoom
          img={preparedGetAttachmentURL(document.BibliographicData.Mark)}
          className={style.imgWithZoom}
          fromFocusArea={fromFocusArea}
        />
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

TrademarkViews.propTypes = {
  isIPRExpanded: PropTypes.bool.isRequired,
  selectedView: PropTypes.string.isRequired,
  document: PropTypes.shape.isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchResultParams: PropTypes.shape.isRequired,
  preparedGetAttachmentURL: PropTypes.func.isRequired,
  showSearchQuery: PropTypes.bool.isRequired,
  hideSearchQueryMenu: PropTypes.func.isRequired,
  ShowSearchQueryMenu: PropTypes.func.isRequired,
  handleCloseIprDetail: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
  fromFocusArea: PropTypes.bool,
};

TrademarkViews.defaultProps = {
  examinerView: false,
  fromFocusArea: false,
};

export default TrademarkViews;
