import { useTranslation } from 'react-i18next';
import React, { useState, useContext, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ThemeContext } from 'components/theme/ThemeProvider';
import Tabs from '../shared/tabs/Tabs';
import Button from '../shared/button/Button';
import AdvancedSearchStyle from './AdvancedSearch.module.scss';
import SearchQuery from './search-query/SearchQuery';

function AdvancedSearch({
  toggleAdvancedSearchMenu,
  isAdvancedMenuOpen,
  workstreamId,
  firstIdentifierStr,
  defaultInitializers,
  submitRef,
  onChangeSearchQuery,
}) {
  const { t } = useTranslation('search');
  const [activeTabId, setActiveTabId] = useState(1);
  const lang = useContext(ThemeContext).language;

  const getSearchQuery = useCallback(() => (
    <SearchQuery
      workstreamId={workstreamId}
      firstIdentifierStr={firstIdentifierStr}
      defaultInitializers={defaultInitializers}
      onChangeSearchQuery={() => {
        onChangeSearchQuery();
      }}
      submitRef={submitRef}
      isAdvancedMenuOpen={isAdvancedMenuOpen}
    />
  ), [defaultInitializers, isAdvancedMenuOpen]);

  const tabsItems = [
    {
      id: 1,
      title: (
        <div className="d-flex align-items-center">
          {t('searchQuery')}
          <FontAwesomeIcon icon={faCircleQuestion} className="f-20 ms-2" />
        </div>
      ),
      content: getSearchQuery(),
    },
  ];

  const handleActiveTab = (id) => {
    setActiveTabId(id);
  };

  return (
    <div className={`px-0 h-100 position-relative ${AdvancedSearchStyle.menu}`}>
      <div>
        <Button
          variant="primary-dark"
          onClick={toggleAdvancedSearchMenu}
          className={`${isAdvancedMenuOpen ? ' ' : AdvancedSearchStyle.closed} ${AdvancedSearchStyle.collapseIcon} p-2 d-flex`}
          text={<FontAwesomeIcon icon={(!isAdvancedMenuOpen && lang === 'en') || (isAdvancedMenuOpen && lang === 'ar') ? faAnglesRight : faAnglesLeft} className="text-white f-16" />}
        />
        <div className={`${isAdvancedMenuOpen ? 'd-block' : 'd-none'}`}>
          <h5 className="pb-6 pt-9 ms-3">{t('advancedSearch')}</h5>
        </div>
      </div>
      <div className={`${isAdvancedMenuOpen ? 'd-block' : 'd-none'} fixed-panel-scrolled px-3`}>
        <Tabs
          tabsItems={tabsItems}
          activeKey={activeTabId}
          handleActiveTab={handleActiveTab}
          className="v1"
        />
      </div>
    </div>
  );
}

AdvancedSearch.propTypes = {
  toggleAdvancedSearchMenu: PropTypes.func.isRequired,
  isAdvancedMenuOpen: PropTypes.bool.isRequired,
  workstreamId: PropTypes.string.isRequired,
  firstIdentifierStr: PropTypes.string.isRequired,
  onChangeSearchQuery: PropTypes.func,
  defaultInitializers: PropTypes.arrayOf(PropTypes.shape({
    operator: PropTypes.string,
    identifier: PropTypes.instanceOf(Object),
    condition: PropTypes.instanceOf(Object),
    data: PropTypes.instanceOf(Object),
  })).isRequired,
  submitRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
  ]).isRequired,
};

AdvancedSearch.defaultProps = {
  onChangeSearchQuery: () => {},
};

export default AdvancedSearch;
