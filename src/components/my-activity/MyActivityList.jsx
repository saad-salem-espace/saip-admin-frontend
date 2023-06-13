import '../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { LONG_DATE_12H_FORMAT, DAY_TIME_12H } from '../../constants';
import ActivityRow from './ActivityRow';

const MyActivityList = ({
  data,
}) => {
  let groupedData = {};

  groupedData = data.data.reduce((acc, item) => {
    const date = Moment(item.timestamp).format(LONG_DATE_12H_FORMAT);
    if (!acc[date]) {
      acc[date] = [{
        payload: item.payload,
        model: item.model,
        action: item.action,
        date: Moment(item.timestamp).format(DAY_TIME_12H),
      }];
    } else {
      acc[date].push({
        payload: item.payload,
        model: item.model,
        action: item.action,
        date: Moment(item.timestamp).format(DAY_TIME_12H),
      });
    }
    return acc;
  }, {});
  return (
    <div>
      {
        Object.keys(groupedData).map((keyName) => (
          <div className="mb-6">
            <h6 className="app-text-primary-dark mb-6">
              {keyName}
            </h6>
            <div className="mb-8">
              {
                groupedData[keyName].map((activity) => (
                  <ActivityRow activity={activity} />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};
MyActivityList.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default MyActivityList;
