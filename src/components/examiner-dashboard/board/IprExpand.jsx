import PropTypes from 'prop-types';
import IprControlAction from 'components/ipr-details/IprControlAction';
import { Col } from 'react-bootstrap';
import Button from 'components/shared/button/Button';
import { useTranslation } from 'react-i18next';
import { BsCheckLg } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { dateFormatSubstring } from 'utils/dates';
import IprSections from 'components/ipr-details/ipr-sections/IprSections';
import IprDetails from 'components/ipr-details/IprDetails';

function IprExpand({
  collapseIPR,
  isIPRExpanded,
  className,
  onClose,
  assignment,
  activeWorkstream,
  documentId,
  isCardInprogress,
  selectedCardId,
  setNotesUpdated,
  focusMode,
  updateIprModal,
  fromFocusArea,
  hideFocus,
}) {
  const { t } = useTranslation('dashboard');

  return (
    <div className={`${className} ${focusMode ? '' : 'position-absolute'} dashboard-ipr-container expanded  end-0 top-0 bottom-0 me-0 h-100 w-100`}>
      <div className="top-info-bar row d-lg-flex border-bottom p-0 m-1">
        <Col lg={6} className="filing-date d-lg-flex justify-content-between p-4 order-2 order-lg-1">
          <div className="d-lg-flex align-items-center text-gray-700">
            <p className="fs-xs mb-2 mb-lg-0 me-3">
              <MdOutlineCalendarMonth className="text-muted me-1 fs-sm" />
              {t('dashboard:queue')}
              {` ${assignment?.queuePriorityDate?.substring(0, dateFormatSubstring)}`}
            </p>
            <p className="fs-xs mb-2  mb-lg-0">
              <MdOutlineCalendarMonth className="text-muted me-1 fs-sm" />
              {t('dashboard:priority')}
              {` ${assignment?.earliestPriorityDate?.substring(0, dateFormatSubstring)}`}
            </p>
          </div>
          <div>
            <Button
              variant="outline-primary"
              size="md"
              className="fs-sm mt-2 mt-lg-0"
              text={(
                <>
                  <BsCheckLg className="md-text me-2" />
                  {t('dashboard:markAsDone')}
                </>
              )}
            />
          </div>
        </Col>
        {
          !focusMode && (
            <Col lg={6} className="px-5 d-flex justify-content-end order-1 order-lg-2">
              <IprControlAction
                collapseIPR={collapseIPR}
                isIPRExpanded={isIPRExpanded}
                onClose={onClose}
              />
            </Col>
          )
        }
      </div>
      <div className="d-lg-flex">
        <Col lg={6} className="border-end position-relative">
          <IprDetails
            dashboard
            collapseIPR={collapseIPR}
            isIPRExpanded={false}
            documentId={documentId}
            onClose={onClose}
            activeWorkstream={activeWorkstream}
            showActions={false}
            isCardInprogress={isCardInprogress}
            selectedCardId={selectedCardId}
            className="mx-0"
            examinerView
            hideFocus={hideFocus}
            fromFocusArea={fromFocusArea}
            dashboardExpandedView={isIPRExpanded}
          />
        </Col>
        <Col lg={6}>
          <IprSections
            showInfo={false}
            className="expand-view"
            isCardInprogress={isCardInprogress}
            selectedCardId={selectedCardId}
            setNotesUpdated={setNotesUpdated}
            activeWorkstream={activeWorkstream}
            updateIprModal={updateIprModal}
            documentId={documentId}
            fromFocusArea={fromFocusArea}
          />
        </Col>
      </div>
    </div>
  );
}

IprExpand.propTypes = {
  collapseIPR: PropTypes.func.isRequired,
  isIPRExpanded: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  assignment: PropTypes.instanceOf(Object).isRequired,
  documentId: PropTypes.string.isRequired,
  activeWorkstream: PropTypes.number.isRequired,
  isCardInprogress: PropTypes.bool.isRequired,
  selectedCardId: PropTypes.number.isRequired,
  setNotesUpdated: PropTypes.func,
  focusMode: PropTypes.bool,
  updateIprModal: PropTypes.func,
  fromFocusArea: PropTypes.bool,
  hideFocus: PropTypes.func,
};

IprExpand.defaultProps = {
  className: null,
  onClose: () => { },
  setNotesUpdated: () => { },
  focusMode: false,
  updateIprModal: () => { },
  hideFocus: () => { },
  fromFocusArea: false,
};

export default IprExpand;
