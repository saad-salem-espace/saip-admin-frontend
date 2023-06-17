import PropTypes from 'prop-types';
import CopyrightsData from './copyrights-data/CopyrightsData';
import Description from '../shared/description/Description';

const CopyrightsViews = ({
  isIPRExpanded, document,
  selectedView, handleClick, examinerView,
}) => {
  const content = {
    CopyrightsData: (
      <CopyrightsData
        document={document}
        isIPRExpanded={isIPRExpanded}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
    Description: (
      <Description
        description={document.BibliographicData.Description}
        isIPRExpanded={isIPRExpanded}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
  };

  return content[selectedView];
};

CopyrightsViews.propTypes = {
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

CopyrightsViews.defaultProps = {
  examinerView: false,
};

export default CopyrightsViews;
