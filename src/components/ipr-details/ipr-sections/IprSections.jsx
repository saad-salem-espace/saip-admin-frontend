import PropTypes from 'prop-types';
import Tabs from 'components/shared/tabs/Tabs';
import React, { useState } from 'react';
import IprData from '../IprData';

function IprSections({
  options,
  onChangeSelect,
  selectedView,
  renderSelectedView,
}) {
  const [activeTabId, setActiveTabId] = useState(1);
  const tabsItems = [
    {
      id: 1,
      title: (
        <div className="d-flex align-items-center"> Info </div>
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
        <div className="d-flex align-items-center"> Notes </div>
      ),
      content: (
        <p>notes content</p>
      ),
    },
  ];
  const handleActiveTab = (id) => {
    setActiveTabId(id);
  };
  return (
    <Tabs
      tabsItems={tabsItems}
      activeKey={activeTabId}
      handleActiveTab={handleActiveTab}
      className="v2 mt-3"
      tabClass="p-3"
    />
  );
}

IprSections.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
  selectedView: PropTypes.instanceOf(Object).isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  renderSelectedView: PropTypes.func.isRequired,
};

export default IprSections;
