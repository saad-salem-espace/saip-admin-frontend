import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import FilterComponent from './FilterComponent';

function Filter({
  filters, totalResults, searchIdentifiers, view,
}) {
  const findByFilterId = (id) => (filters.find((f) => f.strId === id));

  const prepareSearchByFilters = (formikValues) => {
    const searchByFilters = [];

    Object.keys(formikValues.selectedFilters).forEach((filterId) => {
      const fieldValues = [];

      if (filterId) {
        Object.keys(formikValues.selectedFilters[filterId]).forEach((singleFilter) => {
          if (singleFilter) {
            if (formikValues.selectedFilters[filterId][singleFilter]) {
              fieldValues.push(findByFilterId(filterId).type === 'date' ? singleFilter.substring(0, 4) : singleFilter);
            }
          }
        });

        if (fieldValues.length) {
          searchByFilters.push(
            {
              [findByFilterId(filterId).path]: fieldValues,
            },
          );
        }
      }
    });
    return searchByFilters;
  };

  return (
    <Formik initialValues={{
      selectedFilters: {},
    }}
    >
      {({
        values,
      }) => (
        <Form>
          <div className="mt-4 mx-3">
            {
              filters.map((filter) => (
                <FilterComponent
                  filter={filter}
                  values={prepareSearchByFilters(values)}
                  totalResults={totalResults}
                  searchIdentifiers={searchIdentifiers}
                  view={view}
                />
              ))
            }
          </div>
        </Form>
      )}
    </Formik>
  );
}

Filter.propTypes = {
  filters: PropTypes.instanceOf(Array),
  totalResults: PropTypes.number.isRequired,
  searchIdentifiers: PropTypes.instanceOf(Array).isRequired,
  view: PropTypes.string.isRequired,
};

Filter.defaultProps = {
  filters: [],
};

export default Filter;
