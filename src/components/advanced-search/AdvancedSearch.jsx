import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Tabs from '../shared/tabs/Tabs';
import Button from '../shared/button/Button';
import AdvancedSearchStyle from './AdvancedSearch.module.scss';
import SearchQuery from './search-query/SearchQuery';

function AdvancedSearch({ toggleAdvancedSearchMenu, isAdvancedMenuOpen }) {
  const { t } = useTranslation('search');
  const [activeTabId, setActiveTabId] = useState(1);

  const tabsItems = [
    {
      id: 1,
      title: <div className="d-flex align-items-center">
        {t('searchQuery')}
        <FontAwesomeIcon icon={faCircleQuestion} className="f-20 ms-2" />
        {/* eslint-disable-next-line react/jsx-closing-tag-location */}
      </div>,
      content: <SearchQuery />,
    },
  ];

  const handleActiveTab = (id) => {
    setActiveTabId(id);
  };

  return (
    <div className={`px-6 h-100 position-relative ${AdvancedSearchStyle.menu}`}>
      <Button
        variant="primary-dark"
        onClick={toggleAdvancedSearchMenu}
        className={`${isAdvancedMenuOpen ? ' ' : AdvancedSearchStyle.closed} ${AdvancedSearchStyle.collapseIcon} p-2 d-flex`}
        text={<FontAwesomeIcon icon={isAdvancedMenuOpen ? faAnglesLeft : faAnglesRight} className="f-24 text-white" />}
      />
      <div className={`${isAdvancedMenuOpen ? 'd-block' : 'd-none'}`}>
        <h6 className="pb-6 pt-9">{t('advancedSearch')}</h6>
        <Tabs
          tabsItems={tabsItems}
          activeKey={activeTabId}
          handleActiveTab={handleActiveTab}
        />
      </div>
    </div>
  );
}

AdvancedSearch.propTypes = {
  toggleAdvancedSearchMenu: PropTypes.func.isRequired,
  isAdvancedMenuOpen: PropTypes.bool.isRequired,
};

export default AdvancedSearch;
