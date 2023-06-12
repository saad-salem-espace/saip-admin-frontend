import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';

const ActivityRow = (data) => {
  const { activity } = data;
  let activityDescription = '';

  if (activity.model === 'Query' && activity.action === 'run' && activity.payload?.imageName) {
    activityDescription = (
      <Trans
        i18nKey="searchWithImg"
        ns="activity"
        values={{
          value: activity.payload?.imageName,
        }}
      >
        <span className="font-medium" />
      </Trans>);
  }

  return (
    <div className="p-4 border-bottom">
      <p className="text-gray-700 font-regular mb-2">
        {
          activity.payload?.imageName ? (
            activityDescription
          ) : (
            <Trans
              i18nKey={`${activity.model}.${activity.action}`}
              ns="activity"
              values={{
                value: activity.model === 'Query' ? activity.payload?.query : activity.payload?.filingNumber,
              }}
            >
              <span className="font-medium" />
            </Trans>
          )
        }
      </p>
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
