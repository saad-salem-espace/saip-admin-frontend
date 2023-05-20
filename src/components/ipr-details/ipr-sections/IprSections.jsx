import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from 'components/shared/tabs/Tabs';
import React, { useState, useEffect } from 'react';
import NoData from 'components/shared/empty-states/NoData';
import ModalAlert from 'components/shared/modal-alert/ModalAlert';
import Notes from 'components/examiner-dashboard/board/notes/Notes';
import SavedQueriesTable from 'components/saved-queries/SavedQueriesTable';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import getSavedQueryApi from 'apis/save-query/getSavedQueryApi';
import IprData from '../IprData';
import './style.scss';

function IprSections({
  options,
  onChangeSelect,
  selectedView,
  renderSelectedView,
  documentId,
  isCardInprogress,
  activeTab,
  selectedCardId,
  className,
  showInfo,
  setNotesUpdated,
  activeWorkstream,
}) {
  const { t } = useTranslation(['dashboard', 'notes']);
  const [activeTabId, setActiveTabId] = useState(activeTab);
  const [showAlert, setShowAlert] = useState(false);
  const [hasUnsavedNotes, setHasUnsavedNotes] = useState(false);
  const [fireSubmit, setFireSubmit] = useState(false);
  const [selectedTab, setSelectedTab] = useState(activeTabId);
  const [totalElements, setTotalElements] = useState(0);

  const disableChangeTab = (hasData) => {
    setHasUnsavedNotes(!!hasData);
  };

  const ShowAlert = () => {
    setShowAlert(true);
  };
  const hideAlert = (s) => {
    setShowAlert(false);
    if (s !== 'saveBtn') {
      setSelectedTab(activeTabId);
    }
  };
  const handleActiveTab = (id) => {
    setSelectedTab(id);
    if (hasUnsavedNotes && activeTabId === 2) {
      ShowAlert();
    } else {
      setActiveTabId(id);
    }
  };

  const changeActiveTab = () => {
    setActiveTabId(selectedTab);
    setHasUnsavedNotes(false);
  };

  const axiosConfig = getSavedQueryApi(activeWorkstream, JSON.parse(localStorage.getItem('FocusDoc'))?.saipId, '1', true);

  const savedQueries = (
    SavedQueriesTable
  );
  const tabsItems = [
    {
      id: 1,
      title: (
        <div className="d-flex align-items-center" translate="no">
          {t('dashboard:info')}
        </div>
      ),
      content: (
        <IprData
          options={options}
          onChangeSelect={onChangeSelect}
          selectedView={selectedView}
          renderSelectedView={renderSelectedView}
        />
      ),
    },
    {
      id: 2,
      title: (
        <div className="d-flex align-items-center" translate="no">
          {t('dashboard:notes')}
        </div>
      ),
      content: (
        <div className="notes-tab" translate="no">
          <Notes
            documentId={documentId}
            disableEditor={!isCardInprogress}
            disableChangeTab={disableChangeTab}
            fireSubmit={fireSubmit}
            id={selectedCardId}
            setFireSubmit={setFireSubmit}
            changeActiveTab={changeActiveTab}
            setNotesUpdated={setNotesUpdated}
          />
        </div>
      ),
    },
    {
      id: 3,
      title: (
        <div className="d-flex align-items-center" translate="no">
          {t('dashboard:savedQueries')}
          { activeTabId === 3 && (<span className="ms-1 p-1 queries-count">{totalElements}</span>)}
        </div>
      ),
      content: (
        <div className="m-4">
          <AppPagination
            className="mt-8"
            axiosConfig={axiosConfig}
            defaultPage="1"
            RenderedComponent={savedQueries}
            emptyState={<NoData />}
            urlPagination={false}
            setTotalElements={(totalCount) => setTotalElements(totalCount)}
            renderedProps={{
              selectedWorkStream: 1,
            }}
          />
        </div>
      ),
    },
  ];
  const handleConfirm = () => {
    setFireSubmit(true);
    handleActiveTab(selectedTab);
  };

  if (!showInfo) {
    tabsItems.shift();
  }
  useEffect(() => {
    if (!showInfo) {
      setActiveTabId(2);
    }
  }, [showInfo]);

  return (
    <div className={`${className}`}>
      {
      showAlert && (
        <div>
          <ModalAlert
            title={t('notes:unsavedContent')}
            msg={
              <Trans
                i18nKey="unsavedContentMsg"
                ns="notes"
                components={<span className="d-block" />}
              />
          }
            btnText={t('add')}
            className="warning notes-modal"
            handleConfirm={handleConfirm}
            hideAlert={hideAlert}
          />
        </div>
      )
    }
      <Tabs
        tabsItems={tabsItems}
        activeKey={activeTabId}
        handleActiveTab={handleActiveTab}
        className="v2 mt-3"
      />
    </div>
  );
}

IprSections.propTypes = {
  options: PropTypes.instanceOf(Array),
  selectedView: PropTypes.instanceOf(Object),
  onChangeSelect: PropTypes.func,
  renderSelectedView: PropTypes.func,
  showInfo: PropTypes.bool,
  activeTab: PropTypes.number,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isCardInprogress: PropTypes.bool.isRequired,
  selectedCardId: PropTypes.number.isRequired,
  className: PropTypes.string,
  setNotesUpdated: PropTypes.func,
  activeWorkstream: PropTypes.number,
};

IprSections.defaultProps = {
  options: [],
  showInfo: true,
  selectedView: null,
  onChangeSelect: () => { },
  renderSelectedView: () => {},
  activeTab: 1,
  className: '',
  setNotesUpdated: () => { },
  activeWorkstream: null,
};

export default IprSections;
