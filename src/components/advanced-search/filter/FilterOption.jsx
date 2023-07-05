import PropTypes from 'prop-types';
import Button from 'components/shared/button/Button';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import { LuPlus, LuMinus } from 'react-icons/lu';
import Badge from 'components/shared/badge/Badge';
import { convertQueryStrToArr } from 'utils/searchQuery';
import { useSearchParams } from 'react-router-dom';
import getAggrFiltersApi from 'apis/filters/getAggrFiltersApi';
import ChartAnalytics from './ChartAnalytics';
import FilterActionBtn from './FilterActionBtn';
import SearchWithCheckBox from './search-with-checkbox/SearchWithCheckBox';

function FilterOption({
  count,
  onSubmit,
  clearFilter,
  filter,
  searchIdentifiers,
  view,
}) {
  const [isShown, setIsShown] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const { i18n } = useTranslation('search');
  const currentLang = i18n.language;
  const [searchParams] = useSearchParams();

  const getAggregationParams = {
    workstreamId: searchParams.get('workstreamId'),
    query: convertQueryStrToArr(searchParams.get('q'), searchIdentifiers),
    strId: filter?.strId,
    ...(searchParams.get('enableSynonyms') && { enableSynonyms: searchParams.get('enableSynonyms') }),
  };

  const getAggregationConfig = getAggrFiltersApi(getAggregationParams, true);
  const [aggregationData, executeAggregation] = useAxios(
    getAggregationConfig,
    { manual: true },
  );

  useEffect(() => {
    if (!analytics && isShown) executeAggregation();
  }, [isShown]);

  useEffect(() => {
    if (aggregationData.data) {
      if (aggregationData.data.code === 200 && !(aggregationData.loading)) {
        setAnalytics(aggregationData.data.data);
      }
    }
  }, [aggregationData]);

  const toggleShowHide = () => {
    setIsShown(!isShown);
  };

  function filterName(f) {
    return currentLang === 'ar' ? f.filterNameAr : f.filterNameEn;
  }

  const prepareOptions = (aggregations) => {
    const options = [];
    if (!aggregations || !aggregations.length || !aggregations[0]) {
      return [];
    }

    Object.keys(aggregations[0]).forEach((key) => {
      if (key) {
        options.push({
          label: filter.type === 'date' ? key.substring(0, 4) : key,
          value: key,
          count: aggregations[0][key],
        });
      }
    });

    return options;
  };

  return (
    <>
      <div className={`${isShown ? '' : 'border-bottom'} d-flex justify-content-between align-items-center pb-3 mb-3`}>
        <div className="d-flex align-items-center">
          <Button
            text={isShown ? (
              <LuMinus />
            ) : (<LuPlus />)}
            variant={isShown ? 'primary' : 'primary-dark'}
            onClick={toggleShowHide}
            className="appBtn me-3 py-1 px-2"
            size="sm"
          />
          <h6 className={`${isShown ? 'app-text-primary' : 'text-black'} mb-0 text-capitalize`}>{filterName(filter)}</h6>
        </div>
        {(!!count) && <Badge className="app-bg-primary-10 app-text-primary" text={count} />}
      </div>
      {isShown && (
        <div className="mb-7 mx-3">
          {analytics && (view === 'search' ? <SearchWithCheckBox
            name={filterName(filter)}
            options={prepareOptions(analytics)}
            filter={filter}
          /> : <ChartAnalytics
            analyticsData={analytics}
            title={filterName(filter)}
            filter={filter}
          />)}
          {view === 'search' && <FilterActionBtn
            applyAction={onSubmit}
            clearAction={() => clearFilter(filter?.strId)}
          />}
        </div>
      )}

    </>
  );
}

FilterOption.propTypes = {
  filter: PropTypes.instanceOf(Object).isRequired,
  count: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  searchIdentifiers: PropTypes.instanceOf(Array).isRequired,
  view: PropTypes.string.isRequired,
};

FilterOption.defaultProps = {
  count: null,
};

export default FilterOption;
