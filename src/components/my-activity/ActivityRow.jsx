import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';

const ActivityRow = (data) => {
  const { activity } = data;

  let activityDescription = '';
  if (activity.model === 'Bookmarks') {
    if (activity.action === 'save') {
      activityDescription = (
        <Trans
          i18nKey="saveToBookmarks"
          ns="activity"
          values={{
            filingNumber: activity.payload.filingNumber,
          }}
        >
          <span className="font-medium" />
        </Trans>);
    }
    if (activity.action === 'delete') {
      activityDescription = (
        <Trans
          i18nKey="deleteToBookmarks"
          ns="activity"
          values={{
            filingNumber: activity.payload.filingNumber,
          }}
        >
          <span className="font-medium" />
        </Trans>);
    }
  }
  if (activity.model === 'Query') {
    if (activity.action === 'save') {
      activityDescription = (
        <Trans
          i18nKey="saveQuery"
          ns="activity"
          values={{
            query: activity.payload.queryString,
          }}
        >
          <span className="font-medium" />
        </Trans>);
    }
    if (activity.action === 'delete') {
      activityDescription = (
        <Trans
          i18nKey="deleteQuery"
          ns="activity"
          values={{
            query: activity.payload.queryString,
          }}
        >
          <span className="font-medium" />
        </Trans>);
    }
    if (activity.action === 'run') {
      activityDescription = (
        <Trans
          i18nKey={activity.payload.imageName ? 'searchWithImg' : 'runQuery'}
          ns="activity"
          values={{
            query: activity.payload.imageName ? activity.payload.imageName : activity.payload.query,
          }}
        >
          <span className="font-medium" />
        </Trans>);
    }
  }

  if (activity.model === 'Notes') {
    if (activity.action === 'save') {
      activityDescription = (
        <Trans
          i18nKey="saveNote"
          ns="activity"
          values={{
            filingNumber: activity.payload?.filingNumber,
          }}
        >
          <span className="font-medium" />
        </Trans>);
    }
    if (activity.action === 'delete') {
      activityDescription = (
        <Trans
          i18nKey="deleteNote"
          ns="activity"
          values={{
            filingNumber: activity.payload?.filingNumber,
          }}
        >
          <span className="font-medium" />
        </Trans>);
    }
  }
  return (
    <div className="p-4 border-bottom">
      <p className="text-gray-700 font-regular mb-2">{activityDescription}</p>
      <p className="text-gray fs-xs mb-0">
        {activity.date}
      </p>
    </div>
  );
};

ActivityRow.propTypes = {
  data: PropTypes.shape({
    activity: PropTypes.shape({
      activity: PropTypes.instanceOf(Object),
    }).isRequired,
  }).isRequired,
};

export default ActivityRow;
