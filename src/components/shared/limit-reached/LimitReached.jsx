import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ModalAlert from '../modal-alert/ModalAlert';

const LimitReached = ({ reachedLimit, setReachedLimit }) => {
  const { t } = useTranslation();
  return (
    <ModalAlert
      handleConfirm={() => {
        // TODO to be written once receive URL
      }}
      title={t('common:limitReached.register_now')}
      hideAlert={() => { setReachedLimit(false); }}
      msg={t('common:limitReached.register_now_msg')}
      confirmBtnText={t('common:register')}
      showModal={reachedLimit}
      classIcon="text-warning"
    />
  );
};

LimitReached.propTypes = {
  reachedLimit: PropTypes.bool.isRequired,
  setReachedLimit: PropTypes.func.isRequired,
};

export default LimitReached;
