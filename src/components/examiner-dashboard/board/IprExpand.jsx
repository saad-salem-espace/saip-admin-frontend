import PropTypes from 'prop-types';
import IprControlAction from 'components/ipr-details/IprControlAction';
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
}) {
  const { t } = useTranslation('dashboard');
  return (
    <div className={`${className} dashboard-ipr-container expanded position-absolute end-0 top-0 bottom-0 bg-white me-0 w-100`}>
      <div className="top-info-bar row d-lg-flex border-bottom p-2 pt-0">
        <div className="filing-date col-12 col-lg-6 d-lg-flex justify-content-between p-4 order-2 order-lg-1">
          <div className="d-lg-flex align-items-center text-gray-700">
            <p className="fs-12 mb-2 me-3">
              <MdOutlineCalendarMonth className="text-muted me-1 fs-sm" />
              {t('dashboard:queue')}
              {` ${assignment.queuePriorityDate.substring(0, dateFormatSubstring)}`}
            </p>
            <p className="fs-12 mb-2">
              <MdOutlineCalendarMonth className="text-muted me-1 fs-sm" />
              {t('dashboard:priority')}
              {` ${assignment.earliestPriorityDate.substring(0, dateFormatSubstring)}`}
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
        </div>
        <div className="col-12 col-lg-6 px-5 d-flex justify-content-end order-1 order-lg-2">
          <IprControlAction
            collapseIPR={collapseIPR}
            isIPRExpanded={isIPRExpanded}
            onClose={onClose}
          />
        </div>
      </div>
      <div className="d-lg-flex">
        <div className="col-lg-6 col-12 border-end">
          <IprDetails
            dashboard
            collapseIPR={collapseIPR}
            isIPRExpanded={false}
            documentId={documentId}
            onClose={onClose}
            activeWorkstream={activeWorkstream}
            showActions={false}
          />
        </div>
        <div className="col-lg-6 col-12">
          <IprSections
            showInfo={false}
          />
        </div>
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
};

IprExpand.defaultProps = {
  className: null,
  onClose: () => { },
};

export default IprExpand;
