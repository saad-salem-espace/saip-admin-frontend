import saveQueryApi from 'apis/save-query/saveQueryApi';
import useAxios from 'hooks/useAxios';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toastify from 'utils/toastify';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useAuth } from 'react-oidc-context';
import useIndexedDbWrapper from 'hooks/useIndexedDbWrapper';
import { tableNames } from 'dbConfig';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import { executeAfterLimitValidation } from 'utils/manageLimits';
import ModalAlert from '../shared/modal-alert/ModalAlert';

const SaveQuery = ({
  saveQueryParams, isSaved, setIsSaved, isReady, nonAuthSaveLocally, customTableName, limitCode,
}) => {
  const { t } = useTranslation('search');
  const { isAuthenticated } = useAuth();
  const { addInstanceToDb, countAllByIndexName } = useIndexedDbWrapper(
    customTableName ?? tableNames.savedQuery,
  );
  const [reachedLimit, setReachedLimit] = useState(false);
  const saveQueryConfig = saveQueryApi(saveQueryParams, true);

  const [saveQueryData, executeSaveQuery] = useAxios(saveQueryConfig, { manual: true });

  const onSavedQuerySuccess = () => {
    setIsSaved(true);
    toastify(
      'success',
      <div>
        <p className="toastifyTitle">{t('querySaved')}</p>
        <p className="toastText">
          <Trans i18nKey="savedQueryMsg" ns="search">
            <Link className="text-primary" to="/savedQueries" />
          </Trans>
        </p>
      </div>,
    );
  };
  const onSavedQueryError = () => {
    toastify(
      'error',
      <div>
        <p className="toastifyTitle">{t('couldnotSave')}</p>
        <p className="toastText">{t('failerMsg')}</p>
      </div>,
    );
  };

  const onServerError = () => {
    toastify(
      'error',
      <div>
        <p className="toastifyTitle">{t('error:serverErrors.server_error')}</p>
      </div>,
    );
  };

  useEffect(() => {
    if (saveQueryData.data) {
      if (saveQueryData.data.status === 200) {
        onSavedQuerySuccess();
      } else {
        onSavedQueryError();
      }
    }
  }, [saveQueryData]);

  const saveQuery = async () => {
    // TODO handle remove
    if (isSaved) return;
    if (!isAuthenticated && nonAuthSaveLocally) {
      const workstreamId = saveQueryParams[saveQueryParams.workstreamKey];
      const count = await countAllByIndexName(
        { indexName: saveQueryParams.workstreamKey, indexValue: workstreamId },
      );
      executeAfterLimitValidation(
        {
          data: { workstreamId, code: limitCode, count },
          onSuccess: () => {
            addInstanceToDb({
              data: saveQueryParams,
              onSuccess: onSavedQuerySuccess,
              onError: onSavedQueryError,
            });
          },
          onRichLimit: () => { setReachedLimit(true); },
          onFailure: () => { onServerError(); },
        },
      );
    } else {
      executeSaveQuery();
    }
  };

  return (
    <>
      <AppTooltip
        tooltipTrigger={(
          <Button variant="transparent" className="p-0 me-4 border-0" onClick={saveQuery} data-testid="fav-button" disabled={!isReady}>
            {isSaved && isReady
              ? <span className="icon-filled-star f-24" data-testid="filled-star" />
              : <span className="icon-star f-24" data-testid="empty-star" />}
          </Button>
      )}
        tooltipContent={t('saveSearchQuery')}
      />
      <ModalAlert
        handleConfirm={() => {
          // TODO to be written once receive URL
        }}
        title={t('common:limitReached.register_now')}
        hideAlert={() => { setReachedLimit(false); }}
        msg={t('common:limitReached.register_now_msg')}
        confirmBtnText={t('common:register')}
        showModal={reachedLimit}
      />
    </>
  );
};

SaveQuery.propTypes = {
  saveQueryParams: PropTypes.instanceOf(Object).isRequired,
  isSaved: PropTypes.bool.isRequired,
  setIsSaved: PropTypes.func.isRequired,
  isReady: PropTypes.bool,
  nonAuthSaveLocally: PropTypes.bool,
  customTableName: PropTypes.string,
  limitCode: PropTypes.string.isRequired,
};

SaveQuery.defaultProps = {
  isReady: true,
  nonAuthSaveLocally: true,
  customTableName: null,
};

export default SaveQuery;
