import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

function SortOrder({ changeSortBy }) {
  const { t } = useTranslation('search', 'history');

  return (
    <div className="d-md-flex align-items-center">
      <span className="d-inline-block text-gray fs-sm">{t('search:sortBy')}</span>
      <Formik initialValues={{
        sort: 'mostRecent',
      }}
      >
        {() => (
          <Form onChange={changeSortBy}>
            <RadioButtonGroup moduleClassName="customRadio" className="ms-md-4 ms-0">
              <RadioButton
                name="sort"
                value="mostRecent"
              >
                {t('history:mostRecent')}
              </RadioButton>
              <RadioButton
                name="sort"
                value="leastRecent"
              >
                {t('history:leastRecent')}
              </RadioButton>
            </RadioButtonGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
}

SortOrder.propTypes = {
  changeSortBy: PropTypes.func.isRequired,
};

export default SortOrder;
