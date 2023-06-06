import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import markAsReadApi from '../../../../apis/notifications/markAsReadApi';
import useAxios from '../../../../hooks/useAxios';

function Notice({
  newDocument,
  fillingNo,
  workstreamId,
  assignedDate,
  assigned,
  unAssigned,
  seen,
  notificationId,
  onHide,
  updateWorkStreamId,
}) {
  const { t } = useTranslation('layout');
  const [isSeen, setIsSeen] = useState(seen);
  const markAsReadApiConfig = markAsReadApi(notificationId, true);
  const navigate = useNavigate();
  const [, executeMarkAsSeen] = useAxios(markAsReadApiConfig, {
    manual: true,
  });
  const handleClick = () => {
    executeMarkAsSeen().then(() => {
      setIsSeen(true);
      updateWorkStreamId(workstreamId);
      navigate('/dashboard');
      onHide();
    });
  };

  useEffect(() => {
    setIsSeen(seen);
  }, [seen]);

  return (
    <Button
      id={notificationId}
      onClick={() => handleClick()}
      variant="link"
      className={`${
        isSeen ? 'seen' : ''
      } notice-container w-100 p-4 border-top text-decoration-none text-start font-regular rounded-0`}
    >
      {newDocument && (
        <p className="mb-0 fs-sm">
          {t('navbar.notifications.aNewDocumentWith')}
          {' '}
          <span className="font-medium">{fillingNo}</span>
          {assigned && t('navbar.notifications.isAssignedToYou')}
          {unAssigned && t('navbar.notifications.isNoLongerAssignedToYou')}
        </p>
      )}
      <span className="fs-xs app-text-gray d-inline-block mt-2">
        {assignedDate}
      </span>
    </Button>
  );
}

Notice.propTypes = {
  newDocument: PropTypes.bool.isRequired,
  fillingNo: PropTypes.string.isRequired,
  workstreamId: PropTypes.string.isRequired,
  assignedDate: PropTypes.string.isRequired,
  notificationId: PropTypes.number.isRequired,
  seen: PropTypes.bool,
  assigned: PropTypes.bool,
  unAssigned: PropTypes.bool,
  onHide: PropTypes.func,
  updateWorkStreamId: PropTypes.func.isRequired,
};

Notice.defaultProps = {
  assigned: false,
  unAssigned: false,
  seen: false,
  onHide: () => {},
};

export default Notice;
