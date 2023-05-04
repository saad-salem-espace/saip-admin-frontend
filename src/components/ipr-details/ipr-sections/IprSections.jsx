import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from 'components/shared/tabs/Tabs';
import React, { useState, useEffect } from 'react';
import ModalAlert from 'components/shared/modal-alert/ModalAlert';
import Notes from 'components/examiner-dashboard/board/notes/Notes';
import IprData from '../IprData';

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
}) {
  const { t } = useTranslation('dashboard');
  const [activeTabId, setActiveTabId] = useState(activeTab);
  const [showAlert, setShowAlert] = useState(false);
  const [hasUnsavedNotes, setHasUnsavedNotes] = useState(false);
  const [fireSubmit, setFireSubmit] = useState(false);

  const disableChangeTab = (hasData) => {
    setHasUnsavedNotes(!!hasData);
  };
  const tabsItems = [
    {
      id: 1,
      title: (
        <div className="d-flex align-items-center">
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
        <div className="d-flex align-items-center">
          {t('dashboard:notes')}
        </div>
      ),
      content: (
        <div className="notes-tab">
          <Notes
            documentId={documentId}
            disableEditor={!isCardInprogress}
            disableChangeTab={disableChangeTab}
            fireSubmit={fireSubmit}
            id={selectedCardId}
          />
        </div>
      ),
    },
  ];

  const handleConfirm = () => {
    setFireSubmit(true);
  };

  const ShowAlert = () => {
    setShowAlert(true);
  };
  const handleActiveTab = (id) => {
    if (hasUnsavedNotes) {
      ShowAlert();
    }
    setActiveTabId(id);
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
        <ModalAlert
          title={t('unsavedContent')}
          msg={
            <Trans
              i18nKey="unsavedContentMsg"
              ns="notes"
              components={<span className="d-block" />}
            />
          }
          btnText={t('add')}
          className="warning"
          handleConfirm={handleConfirm}
        />
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
};

IprSections.defaultProps = {
  options: [],
  showInfo: true,
  selectedView: null,
  onChangeSelect: () => { },
  renderSelectedView: () => {},
  activeTab: 1,
  className: '',
};

export default IprSections;
