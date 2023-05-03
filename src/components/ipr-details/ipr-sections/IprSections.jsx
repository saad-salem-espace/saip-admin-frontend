import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from 'components/shared/tabs/Tabs';
import React, { useState } from 'react';
import IprData from '../IprData';

function IprSections({
  options,
  onChangeSelect,
  selectedView,
  renderSelectedView,
  showInfo,
}) {
  const { t } = useTranslation('dashboard');
  const [activeTabId, setActiveTabId] = useState(1);
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
        <p>notes content</p>
      ),
    },
  ];
  const handleActiveTab = (id) => {
    setActiveTabId(id);
  };
  if (!showInfo) tabsItems.shift();
  return (
    <Tabs
      tabsItems={tabsItems}
      activeKey={activeTabId}
      handleActiveTab={handleActiveTab}
      className="v2 mt-3"
    />
  );
}

IprSections.propTypes = {
  options: PropTypes.instanceOf(Array),
  selectedView: PropTypes.instanceOf(Object),
  onChangeSelect: PropTypes.func,
  renderSelectedView: PropTypes.func,
  showInfo: PropTypes.bool,
};

IprSections.defaultProps = {
  options: [],
  showInfo: true,
  selectedView: null,
  onChangeSelect: () => { },
  renderSelectedView: () => {},
};

export default IprSections;
