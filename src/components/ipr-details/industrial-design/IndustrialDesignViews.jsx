import PropTypes from 'prop-types';
import Carousel from 'components/shared/carousel/Carousel';
import NoData from 'components/shared/empty-states/NoData';
import { useTranslation } from 'react-i18next';
import LegalStatus from '../shared/legal-status/LegalStatus';
import LegalStatusRow from '../shared/legal-status/LegalStatusRow';
import Applicants from '../shared/applicants/Applicants';
import ApplicantRow from '../shared/applicants/ApplicantRow';
import Representatives from '../shared/representatives/Representatives';
import RepresentativeRow from '../shared/representatives/RepresentativeRow';
import Priorities from '../shared/priorities/Priorities';
import PriorityRow from '../shared/priorities/PriorityRow';
import BibliographicDataSection from './bibliographic-data/BibliographicDataSection';
import Description from '../shared/description/Description';
import OriginalDocument from '../shared/original-document/OriginalDocument';
import DesignerDetails from './designer-details/DesignerDetails';
import DesignerDetailsRow from './designer-details/DesignerDetailsRow';
import LocarnoClassification from './locarno-classification/LocarnoClassification';
import LocarnoClassificationRow from './locarno-classification/LocarnoClassificationRow';

const IndustrialDesignViews = ({
  isIPRExpanded, document, preparedGetAttachmentURL, documentId, searchResultParams, selectedView,
  handleClick,

}) => {
  const { t } = useTranslation('search');

  const content = (s) => {
    switch (s) {
      case 'BibliographicData': return (
        <BibliographicDataSection
          isIPRExpanded={isIPRExpanded}
          BibliographicData={document.BibliographicData}
          getAttachmentURL={preparedGetAttachmentURL}
          handleClick={handleClick}
        >
          <h6>{t('ipr.drawings')}</h6>
          {document?.Drawings?.length ? (
            <Carousel
              largeThumb={isIPRExpanded}
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            />
          ) : (
            <NoData />
          )}
        </BibliographicDataSection>
      );
      case 'Drawings': return (
        <div>
          {document.Drawings.length ? (
            <Carousel
              largeThumb
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            />
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'Description': return (
        <Description
          description={document.BibliographicData.DesignAbstract}
          isIPRExpanded={isIPRExpanded}
          handleClick={handleClick}
        >
          <h6 className={`${!isIPRExpanded ? 'mt-4' : ''}`}>{t('ipr.drawings')}</h6>
          {document.Drawings?.length ? (
            <Carousel
              largeThumb={isIPRExpanded}
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            />
          ) : (
            <NoData />
          )}
        </Description>
      );
      case 'LegalStatus': return (
        <div>
          {document.LegalStatus.length ? (
            <LegalStatus>
              {document?.LegalStatus?.map((row) => (
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
          {document.ApplicantsDetails.length ? (
            <Applicants>
              {document.ApplicantsDetails.map((row) => (
                <ApplicantRow row={row} />
              ))}
            </Applicants>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'DesignerDetails': return (
        <div>
          {document.DesignerDetails.length ? (
            <DesignerDetails>
              {document.DesignerDetails.map((row) => (
                <DesignerDetailsRow row={row} />
              ))}
            </DesignerDetails>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'RepresentativesDetails': return (
        <div>
          {document.RepresentativesDetails.length ? (
            <Representatives>
              {document.RepresentativesDetails.map((row) => (
                <RepresentativeRow row={row} />
              ))}
            </Representatives>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'LocarnoClassification': return (
        <div>
          {document.LocarnoClassification.length ? (
            <LocarnoClassification>
              {document.LocarnoClassification.map((row) => (
                <LocarnoClassificationRow row={row} />
              ))}
            </LocarnoClassification>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'Priorities': return (
        <div>
          {document.Priorities.length ? (
            <Priorities>
              {document.Priorities.map((row) => (
                <PriorityRow row={row} />
              ))}
            </Priorities>
          ) : (
            <NoData />
          )}
        </div>
      );
      case 'OriginalDocuments': return (
        <div>
          {document.OriginalDocuments.length ? (
            <OriginalDocument
              originalDocuments={document.OriginalDocuments}
              workstreamId={searchResultParams.workstreamId}
              documentId={documentId}
            />
          ) : (
            <NoData />
          )}
        </div>
      );
      default: return '';
    }
  };

  return content(selectedView);
};

IndustrialDesignViews.propTypes = {
  isIPRExpanded: PropTypes.bool.isRequired,
  selectedView: PropTypes.string.isRequired,
  document: PropTypes.shape.isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchResultParams: PropTypes.shape.isRequired,
  preparedGetAttachmentURL: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default IndustrialDesignViews;
