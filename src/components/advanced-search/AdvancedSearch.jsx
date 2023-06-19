import { useTranslation } from 'react-i18next';
import React, { useState, useContext, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';
import { ThemeContext } from 'components/theme/ThemeProvider';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';
import { Bar } from 'react-chartjs-2';
import { Form, Formik } from 'formik';
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
  analytics,
  totalResults,
  filters,
}) {
  const { t } = useTranslation('search');
  const [activeTabId, setActiveTabId] = useState(1);
  const lang = useContext(ThemeContext).language;
  console.log(filters);

  const getSearchQuery = useCallback(() => (
    <SearchQuery
      workstreamId={workstreamId}
      firstIdentifierStr={firstIdentifierStr}
      defaultInitializers={defaultInitializers}
      onChangeSearchQuery={onChangeSearchQuery}
      submitRef={submitRef}
      isAdvancedMenuOpen={isAdvancedMenuOpen}
    />
  ), [defaultInitializers, isAdvancedMenuOpen]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'IPC',
        font: {
          size: 20,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
  };

  const labels = [];
  const valuesData = [];
  const colors = [];

  const prepareData = (aggregations) => {
    if (!aggregations || !aggregations.length || !aggregations[0]) {
      return;
    }

    Object.keys(aggregations[0]).forEach((key) => {
      if (key) {
        labels.push(key);
        valuesData.push(aggregations[0][key]);
        (Math.round((aggregations[0][key] / totalResults) * 100) > 90) ? colors.push('green') : colors.push('LimeGreen');
      }
    });
  };
  prepareData(analytics);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: valuesData,
        backgroundColor: colors,
        borderColor: colors,
        barPercentage: 0.9,
        categoryPercentage: 0.6,
      },
    ],
  };

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
    {
      id: 2,
      title: (
        <div className="d-flex align-items-center">
          Test
          <FontAwesomeIcon icon={faCircleQuestion} className="f-20 ms-2" />
        </div>
      ),
      content: (<Bar options={options} data={data} />),
    },
    {
      id: 3,
      title: (
        <div className="d-flex align-items-center">
          Array
          <FontAwesomeIcon icon={faCircleQuestion} className="f-20 ms-2" />
        </div>
      ),
      content: (
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              <Formik
                initialValues={{ selectedFilters: { } }}
              >
                {({
                  values,
                }) => (
                  <Form>
                    {console.log(values)}
                    {
                labels.map((label) => (
                  <>
                    <Checkbox
                      className="me-4"
                      name={`selectedFilters.${label}`}
                      fieldFor={`selectedFilters.${label}`}
                    />
                    <span>{label}</span>
                  </>
                ))
              }
                  </Form>
                )}
              </Formik>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>),
    }];

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
  analytics: PropTypes.instanceOf(Array),
  totalResults: PropTypes.number.isRequired,
  filters: PropTypes.instanceOf(Array),
};

AdvancedSearch.defaultProps = {
  onChangeSearchQuery: () => {},
  analytics: [],
  filters: [],
};

export default AdvancedSearch;
