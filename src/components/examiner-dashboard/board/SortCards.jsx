import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

function SortCards({ setSort }) {
  const { t } = useTranslation('search', 'dashboard');

  return (
    <div className="d-lg-flex align-items-center justify-content-end">
      <span className="d-inline-block ms-4 ms-lg-0">{t('search:sortBy')}</span>
      <Formik initialValues={{
        sort: 'Queue',
      }}
      >
        {({
          values,
        }) => (
          <Form onChange={setSort(values.sort)}>
            <RadioButtonGroup className="mb-2" moduleClassName="customRadio">
              <RadioButton
                name="sort"
                value="Queue"
              >
                {t('dashboard:queuePriority')}
              </RadioButton>
              <RadioButton
                name="sort"
                value="Earliest"
              >
                {t('dashboard:earliestPriority')}
              </RadioButton>
              <RadioButton
                name="sort"
                value="Filing"
              >
                {t('dashboard:filingDate')}
              </RadioButton>
            </RadioButtonGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
}

SortCards.propTypes = {
  setSort: PropTypes.func.isRequired,
};

export default SortCards;
