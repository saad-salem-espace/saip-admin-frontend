import RadioButton from 'components/shared/form/radio-button/RadioButton';
import RadioButtonGroup from 'components/shared/form/radio-button/RadioButtonGroup';
import { Formik, Form } from 'formik';

function SortCards() {
  return (
    <div className="d-lg-flex align-items-center justify-content-end">
      <span className="d-inline-block ms-4 ms-lg-0">Sort by</span>
      <Formik>
        <Form>
          <RadioButtonGroup className="mb-2" moduleClassName="customRadio">
            <RadioButton
              name="queue-priority"
              value="Queue Priority"
            >
              Queue Priority
            </RadioButton>
            <RadioButton
              name="earliest-priority"
              value="Earliest Priority"
            >
              Earliest Priority
            </RadioButton>
            <RadioButton
              name="dilling-date"
              value="Filling Date"
            >
              Filling Date
            </RadioButton>
          </RadioButtonGroup>
        </Form>
      </Formik>
    </div>
  );
}

export default SortCards;
