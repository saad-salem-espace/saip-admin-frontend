import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { FaListUl } from 'react-icons/fa';
import { useState } from 'react';
import FilterOption from './FilterOption';
import SearchWithCheckBox from './search-with-checkbox/SearchWithCheckBox';

function Filter() {
  const [changeViewFilter, setChangeViewFilter] = useState('search');
  const changeView = () => {
    setChangeViewFilter(changeViewFilter === 'search' ? 'chart' : 'search');
  };

  const { t } = useTranslation();
  const options = [
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
    { label: 'India', value: 'IN' },
  ];
  const options2 = [
    { label: 'Islam', value: 'IS' },
    { label: 'Sameh', value: 'SA' },
    { label: 'Tamer', value: 'TA' },
  ];
  return (
    <Formik initialValues={{
      view: 'search',
    }}
    >
      <Form onChange={changeView}>
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h6 className="mb-0">{t('search:filters.countries')}</h6>
          <div className="">
            <RadioButtonGroup moduleClassName="customRadio" className="ms-md-4 ms-0 filter-toggle d-flex align-items-center">
              <RadioButton
                name="view"
                value="search"
                checked={changeViewFilter === 'search'}
                onClick={changeView}
              >
                <FaListUl />
              </RadioButton>
              <RadioButton
                name="view"
                value="chart"
                checked={changeViewFilter === 'chart'}
                onClick={changeView}
              >
                <div className="chart-view-icon" />
              </RadioButton>
            </RadioButtonGroup>
          </div>
        </div>
        <div className="mt-4">
          <FilterOption
            name="Publication Country"
            options={options}
            count="56999"
          >
            { changeViewFilter === 'search' ? (
              <SearchWithCheckBox
                name="countries"
                options={options}
                count
              />
            ) : (<p>chart for publication country </p>)}
          </FilterOption>
          <FilterOption
            name="Applicant details"
            options={options2}
            count="3"
          >
            { changeViewFilter === 'search' ? (
              <SearchWithCheckBox
                name="applicant"
                options={options2}
                count
              />
            ) : (<p>chart for applicant</p>)}
          </FilterOption>
        </div>
      </Form>
    </Formik>
  );
}

export default Filter;
