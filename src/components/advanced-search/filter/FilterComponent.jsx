import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import FilterOption from './FilterOption';

function FilterComponent({
  filter, values,
  searchIdentifiers,
  view,
}) {
  const navigate = useNavigate();
  const { setFieldValue } = useFormikContext();
  const [searchParams] = useSearchParams();

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
        filterEnabled: true,
        ...(searchParams.get('imageName') && { imageName: searchParams.get('imageName') }),
        ...(searchParams.get('docImage') && { docImage: searchParams.get('docImage') }),
        ...(searchParams.get('similarDocId') && { similarDocId: searchParams.get('similarDocId') }),
        page: 1,
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
    setFieldValue(`selectedFilters.${strId}`, {});
  };

  return (
    <FilterOption
      count={countPerFilter(filter)}
      onSubmit={onSubmit}
      clearFilter={clearFilter}
      filter={filter}
      searchIdentifiers={searchIdentifiers}
      view={view}
    />
  );
}

FilterComponent.propTypes = {
  filter: PropTypes.instanceOf(Object).isRequired,
  values: PropTypes.instanceOf(Array).isRequired,
  searchIdentifiers: PropTypes.instanceOf(Array).isRequired,
  view: PropTypes.string.isRequired,
};

export default FilterComponent;
