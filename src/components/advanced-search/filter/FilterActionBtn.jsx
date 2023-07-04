import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '../../shared/button/Button';

function FilterActionBtn({ applyAction, clearAction }) {
  const { t } = useTranslation('search');
  return (
    <div className="d-flex justify-content-end pt-4 pb-8 mt-6">
      <Button
        variant="outline-primary"
        className="appBtn me-4"
        size="sm"
        onClick={clearAction}
        text={t('clear')}
      />
      <Button
        variant="primary"
        className="appBtn"
        type="submit"
        size="sm"
        onClick={applyAction}
        text={t('apply')}
      />
    </div>
  );
}
FilterActionBtn.propTypes = {
  applyAction: PropTypes.func.isRequired,
  clearAction: PropTypes.func.isRequired,
};

export default FilterActionBtn;
