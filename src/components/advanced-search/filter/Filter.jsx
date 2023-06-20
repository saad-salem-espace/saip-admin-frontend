/* eslint-disable */
import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { FaListUl } from 'react-icons/fa';
import PropTypes from 'prop-types';
import FilterComponent from './FilterComponent';

function Filter({ filters, totalResults }) {
  const { t } = useTranslation();

  const findPathByFilterId = (id) => (filters.find((f) => f.strId === id));

  const prepareSearchByFilters = (formikValues) => {
    const searchByFilters = [];

    Object.keys(formikValues.selectedFilters).forEach((filterId) => {
      const fieldValues = [];
      const dateRegex = new RegExp(".*01-01T00:00:00$");

      if (filterId) {
        Object.keys(formikValues.selectedFilters[filterId]).forEach((singleFilter) => {
          if (singleFilter) {
            if (formikValues.selectedFilters[filterId][singleFilter]) {
              dateRegex.test(singleFilter) ? fieldValues.push(singleFilter + '.000Z') : fieldValues.push(singleFilter);
            }
          }
        });

        if (fieldValues.length) {
          searchByFilters.push(
            {
              [findPathByFilterId(filterId).path]: fieldValues,
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
          <div className="d-flex justify-content-between align-items-center mt-5">
            <h6 className="mb-0" />
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
};

Filter.defaultProps = {
  filters: [],
};

export default Filter;
