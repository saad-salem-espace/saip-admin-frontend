import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import React, {
  useContext,
} from 'react';
import SelectedWorkStreamIdContext from 'contexts/SelectedWorkStreamIdContext';
import Moment from 'moment';
import { BsPlay } from 'react-icons/bs';
import routes from 'components/routes/routes.json';
import { useAuth } from 'react-oidc-context';
import { LONG_DATE_12H_FORMAT } from '../../constants';

const SearchHistoryTables = ({
  data,
}) => {
  const { t } = useTranslation('queries');
  const { workStreamId } = useContext(SelectedWorkStreamIdContext);
  const auth = useAuth();

  const isAuth = auth && auth.user;
  let groupedData = {};
  if (isAuth) {
    groupedData = data.data.reduce((acc, item) => {
      const date = Moment(item.timestamp).format(LONG_DATE_12H_FORMAT);
      if (!acc[date]) {
        acc[date] = [item.payload.query];
      } else {
        acc[date].push(item.payload.query);
      }
      return acc;
    }, {});
  } else {
    groupedData = data.reduce((acc, item) => {
      const date = Moment(item.createdAt).format(LONG_DATE_12H_FORMAT);
      if (!acc[date]) {
        acc[date] = [item.queryString];
      } else {
        acc[date].push(item.queryString);
      }
      return acc;
    }, {});
  }

  return (
    <div>
      {
        Object.keys(groupedData).map((keyName) => (
          <div>
            <h6 className="app-text-primary-dark mb-6">
              {keyName}
            </h6>
            <div className="table-responsive shadow mb-8">
              <Table className="appTable">
                <thead>
                  <tr className="text-uppercase">
                    <th className="query">{t('query')}</th>
                    <th className="date">{t('date')}</th>
                    <th className="run-query">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    groupedData[keyName].map((query) => (
                      <tr className="text-capitalize">
                        <td className="text-nowrap query">{query}</td>
                        <td className="text-nowrap date">{keyName}</td>
                        <td>
                          <Link
                            className="p-2 rounded run-query"
                            to={`${routes.search}?workstreamId=${workStreamId}&sort=mostRelevant&q=${query}&page=1'`}
                          >
                            <BsPlay className="play-icon fs-base" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
          </div>
        ))
      }
    </div>
  );
};
SearchHistoryTables.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default SearchHistoryTables;
