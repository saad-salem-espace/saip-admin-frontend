import PropTypes from 'prop-types';
import Moment from 'moment';
import { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import { BsPlay, BsTrash } from 'react-icons/bs';
import routes from 'components/routes/routes.json';
import './style.scss';
import AppPopover from 'components/shared/app-popover/AppPopover';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import deleteQueryApi from 'apis/save-query/deleteQueryApi';
import useAxios from 'hooks/useAxios';
import toastify from 'utils/toastify';
import { useAuth } from 'react-oidc-context';
import useIndexedDbWrapper from 'hooks/useIndexedDbWrapper';
import { tableNames } from 'dbConfig';
import { LONG_DATETIME_12H_FORMAT } from '../../constants';

const SavedQueryRow = ({
  query, selectedWorkStream, setRefreshQueriesList,
}) => {
  const queryDate = Moment(query.createdAt).format(LONG_DATETIME_12H_FORMAT);
  const queryStringUrl = query.queryString.replace(/\s/g, '+');
  const [selectedLink, setSelectedLink] = useState(false);
  const { t } = useTranslation('queries');
  const { deleteInstance } = useIndexedDbWrapper(tableNames.savedQuery);
  const { isAuthenticated } = useAuth();

  const deleteQueryParams = {
    queryId: query.id,
  };
  const deleteQueryConfig = deleteQueryApi(deleteQueryParams, true);

  const [deleteQueryData, executeDeleteQuery] = useAxios(
    deleteQueryConfig,
    { manual: true },
  );
  useEffect(() => {
    if (deleteQueryData.data) {
      if (deleteQueryData.data.status === 200 && !(deleteQueryData.loading)) {
        toastify(
          'success',
          <div>
            <p className="toastifyTitle">{t('queryDeleted')}</p>
          </div>,
        );
        setRefreshQueriesList((prev) => prev + 1);
      } else if (!(deleteQueryData.loading)) {
        toastify(
          'error',
          <div>
            <p className="toastifyTitle">
              {t('deleteFailedTitle')}
            </p>
            <p className="toastText">
              {t('deleteFailedText')}
            </p>
          </div>,
        );
      }
    }
  }, [deleteQueryData]);

  const handleDelete = () => {
    executeDeleteQuery();
  };

  const handleDeleteQuery = () => {
    deleteInstance({ indexName: 'id', indexValue: query.id, onSuccess: () => setRefreshQueriesList((prev) => prev + 1) });
  };

  return (
    <tr className="text-capitalize">
      <td className="text-nowrap">{query.queryString}</td>
      <td className="text-nowrap">{queryDate}</td>
      <td>{query.resultCount}</td>
      <td className="d-flex">
        <Link
          className={`p-2 rounded run-query ${selectedLink === query.queryString ? 'active-query' : ''}`}
          to={`${routes.search}?workstreamId=${selectedWorkStream}&sort=mostRelevant&q=${queryStringUrl}&page=1'`}
          onClick={() => setSelectedLink(query.queryString)}
        >
          <BsPlay className="play-icon fs-base" />
        </Link>
        <AppPopover
          Title={t('deleteQuery')}
          id="deleteQuery"
          btnText={t('delete')}
          variant="bg-primary-10"
          placement="bottom"
          btnVariant="danger"
          handleCallback={isAuthenticated ? handleDelete : handleDeleteQuery}
          popoverTrigger={
            <Button variant="link" className="">
              <BsTrash className="text-danger fs-base" />
            </Button>
          }
        >
          <p>{t('confirmDeleteQuery')}</p>
        </AppPopover>
      </td>
    </tr>
  );
};

SavedQueryRow.propTypes = {
  query: PropTypes.shape({
    queryString: PropTypes.string.isRequired,
    resultCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  selectedWorkStream: PropTypes.number.isRequired,
  setRefreshQueriesList: PropTypes.func.isRequired,
};

export default SavedQueryRow;
