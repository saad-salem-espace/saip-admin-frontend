import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Select from 'components/shared/form/select/Select';
import 'components/shared/form/form.scss';
import { useTranslation } from 'react-i18next';
import style from './ipr-details.module.scss';

function IprData({
  options,
  onChangeSelect,
  selectedView,
  renderSelectedView,
}) {
  const { t } = useTranslation('search');
  return (
    <div className="px-6 pt-4">
      <Formik>
        {() => (
          <Form>
            <div className="position-relative">
              <span className="ps-2 position-absolute f-12 saip-label select2">{t('viewSection')}</span>
              <Select
                options={options}
                setSelectedOption={onChangeSelect}
                selectedOption={selectedView}
                defaultValue={selectedView}
                id="sections"
                fieldName="sections"
                className={`${style.select} mb-5 select-2`}
              />
            </div>
          </Form>
        )}
      </Formik>
      {renderSelectedView()}
    </div>
  );
}

IprData.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
  selectedView: PropTypes.instanceOf(Object).isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  renderSelectedView: PropTypes.func.isRequired,
};

export default IprData;
