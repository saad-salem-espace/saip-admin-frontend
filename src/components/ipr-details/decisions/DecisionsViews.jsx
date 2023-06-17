import PropTypes from 'prop-types';
import OriginalDocument from '../shared/original-document/OriginalDocument';
import JudgementDecision from './judgement-decision/JudgementDecision';
import Description from '../shared/description/Description';

const DecisionsViews = ({
  isIPRExpanded, document, documentId, searchResultParams,
  selectedView, handleClick, examinerView,
}) => {
  const content = {
    JudgementDecision: (
      <JudgementDecision
        document={document}
        isIPRExpanded={isIPRExpanded}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
    References: (
      <Description
        description={document.References}
        isIPRExpanded={isIPRExpanded}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
    Facts: (
      <Description
        description={document.Facts}
        isIPRExpanded={isIPRExpanded}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
    Reasons: (
      <Description
        description={document.Reasons}
        isIPRExpanded={isIPRExpanded}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
    OriginalDocuments: (
      <OriginalDocument
        originalDocuments={document.OriginalDocuments}
        workstreamId={searchResultParams.workstreamId}
        documentId={documentId}
      />
    ),
  };

  return content[selectedView];
};

DecisionsViews.propTypes = {
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
};

DecisionsViews.defaultProps = {
  examinerView: false,
};

export default DecisionsViews;
