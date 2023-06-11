import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import saveBookmarkApi from 'apis/bookmarks/saveBookmarkApi';
import useAxios from 'hooks/useAxios';
import useAuth from 'hooks/useAuth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import toastify from 'utils/toastify';
import { tableNames } from 'dbConfig';
import { executeAfterLimitValidation, LIMITS } from 'utils/manageLimits';
import useIndexedDbWrapper from 'hooks/useIndexedDbWrapper';
import ModalAlert from 'components/shared/modal-alert/ModalAlert';

import '../../assets/styles/common/partially-common.scss';

function Bookmarks({
  workstreamId, documentId, isBookmark, setIsBookmark,
}) {
  const { t } = useTranslation('search');
  const [showButtons, setShowButtons] = useState(false);
  const [reachedLimit, setReachedLimit] = useState(false);
  const auth = useAuth();

  const saveBookmarkFocusParams = {
    workstreamId,
    filingNumber: documentId,
    assignmentId: JSON.parse(localStorage.getItem('FocusDoc'))?.doc.id,
  };

  const saveBookmarkMyBookmarksParams = {
    workstreamId,
    filingNumber: documentId,
    assignmentId: 0,
  };

  const saveBookmarkFocusConfig = saveBookmarkApi(saveBookmarkFocusParams, true);
  const saveBookmarkConfig = saveBookmarkApi(saveBookmarkMyBookmarksParams, true);
  const [saveBookmarkData, executeBookmark] = useAxios(
    saveBookmarkConfig,
    { manual: true },
  );
  const [saveBookmarkFocusData, executeBookmarkFocus] = useAxios(
    saveBookmarkFocusConfig,
    { manual: true },
  );

  const { addInstanceToDb, countAllByIndexName } = useIndexedDbWrapper(tableNames.bookmarks);

  const onSavedBookmarkError = () => {
    toastify(
      'error',
      <div>
        <p className="toastifyTitle">{t('couldnotSaveBookmark')}</p>
        <p className="toastText">{t('failerMsg')}</p>
      </div>,
    );
  };

  const onSaveBookmarkSuccess = () => {
    setIsBookmark(true);
    toastify(
      'success',
      <div>
        <p className="toastifyTitle">{t('bookmarked')}</p>
        <p className="toastText">
          <Trans i18nKey="bookmarks" ns="search">
            <Link className="app-text-primary" to="/bookmarks" />
          </Trans>
        </p>
      </div>,
    );
  };

  const onSaveBookmarkFocusSuccess = () => {
    toastify(
      'success',
      <div>
        <p className="toastifyTitle">{t('bookmarked')}</p>
        <p className="toastText">
          <Trans
            i18nKey="savedQueryMsgForDoc"
            ns="search"
          />
        </p>
      </div>,
    );
  };

  useEffect(() => {
    if (saveBookmarkData.data) {
      if (saveBookmarkData.data.status === 200) {
        onSaveBookmarkSuccess();
      } else {
        onSavedBookmarkError();
      }
    }
  }, [saveBookmarkData]);

  useEffect(() => {
    if (saveBookmarkFocusData.data) {
      if (saveBookmarkFocusData.data.status === 200) {
        onSaveBookmarkFocusSuccess();
      } else {
        onSavedBookmarkError();
      }
    }
  }, [saveBookmarkFocusData]);

  const saveBookmarkToFocus = () => {
    if (auth.isAuthenticated) {
      executeBookmarkFocus();
    }
  };

  const onServerError = () => {
    toastify(
      'error',
      <div>
        <p className="toastifyTitle">{t('error:serverErrors.server_error')}</p>
      </div>,
    );
  };

  const saveBookmarkLocally = async () => {
    const count = await countAllByIndexName(
      { indexName: 'workstreamId', indexValue: workstreamId },
    );
    executeAfterLimitValidation(
      {
        data: { workstreamId, code: LIMITS.BOOKMARKS_LIMIT, count },
        onSuccess: () => {
          addInstanceToDb({
            data: saveBookmarkMyBookmarksParams,
            onSuccess: onSaveBookmarkSuccess,
            onError: onSavedBookmarkError,
          });
        },
        onRichLimit: () => { setReachedLimit(true); },
        onFailure: () => { onServerError(); },
      },
    );
  };

  const saveBookmark = () => {
    if (isBookmark) {
      toastify(
        'error',
        <div>
          <p className="toastifyTitle">{t('alreadyBookmarked')}</p>
          <p className="toastText">
            <Trans i18nKey="bookmarks" ns="search">
              <Link className="app-text-primary" to="/bookmarks" />
            </Trans>
          </p>
        </div>,
      );

      return;
    }
    if (auth.isAuthenticated) {
      executeBookmark();
    } else {
      saveBookmarkLocally();
    }
  };

  const toggleButton = () => {
    setShowButtons((s) => !s);
  };

  return (
    <>
      <div className="bookmark-container position-relative">
        <AppTooltip
          placement="top"
          tooltipId={t('addBookmarks')}
          tooltipContent={t('addBookmarks')}
          tooltipTrigger={<Button
            variant="naked"
            className="appBtn me-2 nude-btn-has-menu"
            onClick={localStorage.getItem('FocusDoc') ? toggleButton : saveBookmark}
          >
            {isBookmark ? <FaBookmark className="fs-22 app-text-primary-dark" /> : <FaRegBookmark className="fs-22" />}
            {showButtons && (
            <div className="bookmark-dropdown position-absolute nude-menu-options">
              <Button
                onClick={saveBookmark}
                disabled={isBookmark}
              >
                <FaRegBookmark className="me-2 fs-base adjust-align" />
                {t('addBookmarks')}
              </Button>
              <Button
                onClick={saveBookmarkToFocus}
              >
                <span className="icon-focus fs-base me-2" />
                {t('search:addtoFocusArea')}
              </Button>
            </div>
            )}
            {/* eslint-disable-next-line react/jsx-closing-tag-location */}
          </Button>}
        />
      </div>
      <ModalAlert
        handleConfirm={() => {
          // TODO to be written once receive URL
        }}
        title={t('common:limitReached.register_now')}
        hideAlert={() => { setReachedLimit(false); }}
        msg={t('common:limitReached.register_now_msg')}
        confirmBtnText={t('common:register')}
        showModal={reachedLimit}
        classIcon="text-warning"
      />
    </>
  );
}

Bookmarks.propTypes = {
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  workstreamId: PropTypes.string.isRequired,
  isBookmark: PropTypes.bool.isRequired,
  setIsBookmark: PropTypes.func.isRequired,
};

export default Bookmarks;
