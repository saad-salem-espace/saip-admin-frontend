import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';
import {
  Link,
  createSearchParams,
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
import { convertQueryArrToStr } from '../../utils/searchQuery';

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
      const query = convertQueryArrToStr(item.payload.qjson);
      const imageName = item.payload?.docImage ? item.payload?.imageName.split('/')[3] : item.payload?.imageName;
      const docImage = item.payload?.docImage ? item.payload?.imageName.split('/')[0] : false;
      const historyRow = { query, imageName, docImage };
      if (!acc[date]) {
        acc[date] = [historyRow];
      } else {
        acc[date].push(historyRow);
      }
      return acc;
    }, {});
  } else {
    groupedData = data.reduce((acc, item) => {
      const date = Moment(item.createdAt).format(LONG_DATE_12H_FORMAT);
      const query = item?.queryString;
      const imageName = item?.imageName;
      const docImage = item?.docImage;
      const historyRow = { query, imageName, docImage };
      if (!acc[date]) {
        acc[date] = [historyRow];
      } else {
        acc[date].push(historyRow);
      }
      return acc;
    }, {});
  }

  const writeHistory = (row) => {
    if (row?.query && row?.imageName) return (`${row.query} OR ${row.imageName}`);
    if (row?.query) return row.query;
    return row.imageName;
  };

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
                    groupedData[keyName].map((historyRow) => (
                      <tr className="text-capitalize">
                        <td className="text-nowrap query">{writeHistory(historyRow)}</td>
                        <td className="text-nowrap date">{keyName}</td>
                        <td>
                          <Link
                            className="p-2 rounded run-query"
                            to={{
                              pathname: routes.search,
                              search: `?${createSearchParams({
                                workstreamId: workStreamId,
                                sort: 'mostRelevant',
                                ...(historyRow?.query && { q: historyRow.query }),
                                ...(historyRow?.imageName && { imageName: historyRow.imageName }),
                                ...(historyRow?.docImage && { docImage: historyRow.docImage }),
                              })}`,
                            }}
                          >
                            <BsPlay className="play-icon" />
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
