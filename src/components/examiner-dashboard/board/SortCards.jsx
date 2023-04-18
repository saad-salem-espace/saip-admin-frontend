import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

function SortCards() {
  const { t } = useTranslation('search', 'dashboard');

  return (
    <div className="d-lg-flex align-items-center justify-content-end">
      <span className="d-inline-block ms-4 ms-lg-0">{t('search:sortBy')}</span>
      <Formik initialValues={{
        sort: '',
      }}
      >
        {({
          values,
        }) => (
          <Form onChange={console.log(values.sort)}>
            <RadioButtonGroup className="mb-2" moduleClassName="customRadio">
              <RadioButton
                name="sort"
                value="queue-priority"
              >
                {t('dashboard:queuePriority')}
              </RadioButton>
              <RadioButton
                name="sort"
                value="earliest-priority"
              >
                {t('dashboard:earliestPriority')}
              </RadioButton>
              <RadioButton
                name="sort"
                value="filing-priority"
              >
                {t('dashboard:fillingPriority')}
              </RadioButton>
            </RadioButtonGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SortCards;
