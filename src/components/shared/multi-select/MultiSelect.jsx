import PropTypes from 'prop-types';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
// import ErrorMessage from '../error-message/ErrorMessage';
import './MultiSelect.scss';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from '../button/Button';

function MultiSelect({
  options, className, label, name, isClearable,
  //  errorMsg,
}) {
  const { t } = useTranslation('search');
  return (
    <Field name={name}>
      {({ field, form }) => (
        <>
          <div className={`multiSelect ${className}`}>
            <span className="position-absolute label">{label}</span>
            <div>
              <ReactMultiSelectCheckboxes
                options={options}
                name={field.name}
                value={options.filter((option) => field.value?.includes(option.value.toString()))}
                onChange={(items) => {
                  form.setFieldValue(field.name, items.map((item) => item.value.toString()));
                }}
              />
            </div>
          </div>
          {/* <ErrorMessage msg={errorMsg} className="mt-2 mb-0" /> */}
          {isClearable && (
            <div className="border-top mt-7 pb-2 pt-5">
              <Button
                variant="link"
                className="font-regular px-0"
                text={t('clearAll')}
                onClick={() => { form.setFieldValue(field.name, []); }}
              />
            </div>
          )}
        </>
      )}

    </Field>
  );
}

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  isClearable: PropTypes.bool,
  // errorMsg: PropTypes.string,
};

MultiSelect.defaultProps = {
  label: null,
  isClearable: false,
  // errorMsg: null,
};

export default MultiSelect;
