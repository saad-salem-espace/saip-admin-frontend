import PropTypes from 'prop-types';
import IprControlAction from 'components/ipr-details/IprControlAction';
import Button from 'components/shared/button/Button';
import { useTranslation } from 'react-i18next';
import { BsCheckLg } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { dateFormatSubstring } from 'utils/dates';
// import IprData from 'components/ipr-details/IprData';
// import IprSections from 'components/ipr-details/ipr-sections/IprSections';

function IprExpand({
  collapseIPR,
  isIPRExpanded,
  className,
  onClose,
  assignment,
}) {
  const { t } = useTranslation('dashboard');
  console.log(assignment);
  return (
    <div className={`${className} dashboard-ipr-container expanded position-absolute end-0 bg-white me-0 vh-100`}>
      <div className="top-info-bar d-flex border-bottom p-2">
        <div className="filing-date col-6 d-flex justify-content-between p-4">
          <div className="d-flex align-items-center text-gray-700">
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
              className="fs-sm"
              text={(
                <>
                  <BsCheckLg className="md-text me-2" />
                  {t('dashboard:markAsDone')}
                </>
              )}
            />
          </div>
        </div>
        <div className="col-6 px-5 d-flex justify-content-end">
          <IprControlAction
            collapseIPR={collapseIPR}
            isIPRExpanded={isIPRExpanded}
            onClose={onClose}
          />
        </div>
      </div>
      <div className="d-flex">
        <div className="col-6 border-end">
          {/*
          TODO:IP-627
          <IprData
            options={options}
            onChangeSelect={onChangeSelect}
            selectedView={selectedView}
            renderSelectedView={renderSelectedView}
          /> */}
        </div>
        <div className="col-6">
          {/*
          TODO:IP-627
          <IprSections
            options={
              searchResultParams.workstreamId === '2'
              ? trademarkViewsOptions : patentViewsOptions
            }
            onChangeSelect={onChangeSelect}
            selectedView={selectedView}
            renderSelectedView={renderSelectedView}
          /> */}
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
};

IprExpand.defaultProps = {
  className: null,
  onClose: () => { },
};

export default IprExpand;
