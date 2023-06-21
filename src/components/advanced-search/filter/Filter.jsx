import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import { Formik, Form } from 'formik';
import { FaListUl } from 'react-icons/fa';
import PropTypes from 'prop-types';
import FilterComponent from './FilterComponent';

function Filter({ filters, totalResults, searchIdentifiers }) {
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
      view: 'search',
      selectedFilters: {},
    }}
    >
      {({
        values,
      }) => (
        <Form>
          <div className="d-flex justify-content-end align-items-center mt-5">
            <div className="">
              <RadioButtonGroup moduleClassName="customRadio" className="ms-md-4 ms-0 filter-toggle d-flex align-items-center">
                <RadioButton
                  name="view"
                  value="search"
                  checked={values.view === 'search'}
                >
                  <FaListUl />
                </RadioButton>
                <RadioButton
                  name="view"
                  value="chart"
                  checked={values.view === 'chart'}
                >
                  <div className="chart-view-icon" />
                </RadioButton>
              </RadioButtonGroup>
            </div>
          </div>
          <div className="mt-4">
            {
              filters.map((filter) => (
                <FilterComponent
                  changeViewFilter={values.view}
                  filter={filter}
                  values={prepareSearchByFilters(values)}
                  totalResults={totalResults}
                  searchIdentifiers={searchIdentifiers}
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
};

Filter.defaultProps = {
  filters: [],
};

export default Filter;
