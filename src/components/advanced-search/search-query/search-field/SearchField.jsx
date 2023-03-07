/* eslint-disable react-perf/jsx-no-new-array-as-prop */
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import formStyle from '../../../shared/form/form.module.scss';
import Select from '../../../shared/form/select/Select';
import style from '../SearchQuery.module.scss';
import Button from '../../../shared/button/Button';
import Input from '../../../shared/form/input/Input';
import DatePicker from '../../../shared/date-picker/AppDatePicker';

function SearchField() {
  const { t } = useTranslation('search');
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
        <DatePicker />
      </div> */}
      {/* for datepicker range */}
      <div className={style.dateWrapper}>
        <DatePicker range />
      </div>
    </div>
  );
}

export default SearchField;
