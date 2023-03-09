/* eslint-disable react-perf/jsx-no-new-array-as-prop */
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
// import MultiSelect from 'components/shared/multi-select/MultiSelect';
import formStyle from '../../../shared/form/form.module.scss';
import Select from '../../../shared/form/select/Select';
import style from '../SearchQuery.module.scss';
import Button from '../../../shared/button/Button';
import Input from '../../../shared/form/input/Input';
// import DatePicker from '../../../shared/date-picker/AppDatePicker';

function SearchField() {
  const { t } = useTranslation(['search', 'translation']);
  const searchFieldsOptions = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
  ];

  const conditionsOptions = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
  ];

  // const options = [
  //   { label: 'Thing 1', value: 1 },
  //   { label: 'Thing 2', value: 2 },
  // ];

  return (
    <div className={`p-4 bg-primary-01 mb-2 ${style.wrapper}`}>
      <div className="d-flex mb-4">
        <div className={`position-relative mb-md-0 mb-3 me-2 ${style.searchFields}`}>
          <span className={`position-absolute ${formStyle.label} ${formStyle.smLabel}`}>{t('searchFields')}</span>
          <Select
            options={searchFieldsOptions}
            className="smSelect defaultSelect smWithLabel"
          />
        </div>
        <div className={`position-relative mb-md-0 mb-3 me-4 ${style.condition}`}>
          <span className={`position-absolute ${formStyle.label} ${formStyle.smLabel}`}>{t('condition')}</span>
          <Select
            options={conditionsOptions}
            className="smSelect defaultSelect smWithLabel"
          />
        </div>
        <Button
          variant="link"
          // onClick={}
          className="p-0"
          text={<FontAwesomeIcon icon={faTrashAlt} className="text-danger-dark" />}
        />
      </div>
      <div className={`position-relative me-2 ${style.criteria}`}>
        <span className={`position-absolute ${formStyle.label}
         ${formStyle.smLabel}`}
        >
          {t('criteria')}
        </span>
        <Input moduleClassName="smInput" />
      </div>
      {/* for datepicker */}
      {/* <div className={style.dateWrapper}>
       please add error class if date has error
        <DatePicker
          className="error"
          errorMsg={t('translation:noEmptyField')}
        />
      </div> */}
      {/* for datepicker range */}
      {/* please add error class if date has error */}
      {/* <div className={style.dateWrapper}>
        <DatePicker range className="error"
        errorMsg={t('translation:noEmptyField')}
/>
      </div> */}
      {/* <MultiSelect
        options={options}
        errorMsg={t('translation:noEmptyField')}
        // please add class has-value if the user selects any option
        // please add error class if select has error
        className={`smMultiSelect ${style.advancedSearchSelect}`}
        // please show the below label if the user selects any option
        // label={t('publicationCountry')}
      /> */}
      {/* <div className="border-top mt-7 pb-2 pt-5">
        <Button variant="link" className="font-regular px-0" text={t('clearAll')} />
      </div> */}
    </div>
  );
}

export default SearchField;
