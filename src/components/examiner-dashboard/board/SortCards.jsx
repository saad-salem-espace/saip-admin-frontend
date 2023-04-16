import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

function SortCards() {
  const { t } = useTranslation('search', 'dashboard');

  return (
    <div className="d-lg-flex align-items-center justify-content-end">
      <span className="d-inline-block ms-4 ms-lg-0">{t('search:sortBy')}</span>
      <Formik>
        <Form>
          <RadioButtonGroup className="mb-2" moduleClassName="customRadio">
            <RadioButton
              name="queue-priority"
              value={t('dashboard:queuePriority')}
            >
              {t('dashboard:queuePriority')}
            </RadioButton>
            <RadioButton
              name="earliest-priority"
              value={t('dashboard:earliestPriority')}
            >
              {t('dashboard:earliestPriority')}
            </RadioButton>
            <RadioButton
              name="dilling-date"
              value={t('dashboard:fillingPriority')}
            >
              {t('dashboard:fillingPriority')}
            </RadioButton>
          </RadioButtonGroup>
        </Form>
      </Formik>
    </div>
  );
}

export default SortCards;
