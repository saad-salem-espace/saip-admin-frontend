import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

function SortHistory({ changeSortBy }) {
  const { t } = useTranslation('search', 'history');

  return (
    <div className="d-lg-flex align-items-center justify-content-end">
      <span className="d-inline-block ms-4 ms-lg-0">{t('search:sortBy')}</span>
      <Formik initialValues={{
        sort: 'mostRecent',
      }}
      >
        {({
          values,
        }) => (
          <Form onChange={changeSortBy(values.sort)}>
            <RadioButtonGroup className="mb-2" moduleClassName="customRadio">
              <RadioButton
                name="sort"
                value="mostRecent"
              >
                {t('mostRecent')}
              </RadioButton>
              <RadioButton
                name="sort"
                value="leastRecent"
              >
                {t('leastRecent')}
              </RadioButton>
            </RadioButtonGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
}

SortHistory.propTypes = {
  changeSortBy: PropTypes.func.isRequired,
};

export default SortHistory;
