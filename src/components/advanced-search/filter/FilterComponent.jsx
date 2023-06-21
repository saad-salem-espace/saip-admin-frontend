import { useState, useEffect } from 'react';
import getAggrFiltersApi from 'apis/filters/getAggrFiltersApi';
import useAxios from 'hooks/useAxios';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { convertQueryStrToArr } from 'utils/searchQuery';
import FilterOption from './FilterOption';
import ChartAnalytics from './ChartAnalytics';
import SearchWithCheckBox from './search-with-checkbox/SearchWithCheckBox';

function FilterComponent({
  changeViewFilter, filter, values,
  totalResults, searchIdentifiers,
}) {
  const navigate = useNavigate();
  const { setFieldValue } = useFormikContext();
  const { i18n } = useTranslation('search');
  const currentLang = i18n.language;
  const [searchParams] = useSearchParams();
  const [analytics, setAnalytics] = useState(null);
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
    if (aggregationData.data) {
      if (aggregationData.data.code === 200 && !(aggregationData.loading)) {
        setAnalytics(aggregationData.data.data);
      }
    }
  }, [aggregationData]);

  useEffect(() => {
    executeAggregation();
  }, []);

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

  function filterName(f) {
    return currentLang === 'ar' ? f.filterNameAr : f.filterNameEn;
  }

  const countPerFilter = (f) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const value of values) {
      if (value[f.path]) return value[f.path].length;
    }
    return 0;
  };

  const onSubmit = () => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        workstreamId: searchParams.get('workstreamId'),
        sort: 'mostRelevant',
        q: (searchParams.get('q')),
        ...(searchParams.get('enableSynonyms') && { enableSynonyms: searchParams.get('enableSynonyms') }),
      })}`,
    }, {
      state: {
        filters: values,
      },
    });
  };
  
  const clearFilter = (strId) => {
    setFieldValue(`selectedFilters.${strId}`,{});
  }

  return (
    <FilterOption
      name={filterName(filter)}
      options={prepareOptions(analytics)}
      count={countPerFilter(filter)}
      showButtons={changeViewFilter === 'search'}
      onSubmit={onSubmit}
      clearFilter={clearFilter}
      filterId={filter.strId}
    >
      { changeViewFilter === 'search' ? (
        <SearchWithCheckBox
          name={filterName(filter)}
          options={prepareOptions(analytics)}
          filter={filter}
        />
      ) : (<ChartAnalytics
        totalResults={totalResults}
        analyticsData={analytics}
        title={filterName(filter)}
        filter={filter}
      />)}
    </FilterOption>
  );
}

FilterComponent.propTypes = {
  filter: PropTypes.instanceOf(Object).isRequired,
  changeViewFilter: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Array).isRequired,
  totalResults: PropTypes.number.isRequired,
  searchIdentifiers: PropTypes.instanceOf(Array).isRequired,
};

export default FilterComponent;
