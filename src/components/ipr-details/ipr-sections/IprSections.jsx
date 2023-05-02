import Tabs from 'components/shared/tabs/Tabs';
import React, { useState } from 'react';

function IprSections() {
  const [activeTabId, setActiveTabId] = useState(1);
  const tabsItems = [
    {
      id: 1,
      title: (
        <div className="d-flex align-items-center"> Info </div>
      ),
      content: (
        <p>info content</p>
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

export default IprSections;
