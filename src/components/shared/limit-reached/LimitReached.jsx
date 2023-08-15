import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useAuth } from 'react-oidc-context';
import ModalAlert from '../modal-alert/ModalAlert';

const LimitReached = ({ reachedLimit, setReachedLimit }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <ModalAlert
      handleConfirm={() => auth.signinRedirect()}
      title={t('common:limitReached.login_now')}
      hideAlert={() => { setReachedLimit(false); }}
      msg={t('common:limitReached.login_now_msg')}
      confirmBtnText={t('common:limitReached.login_now')}
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
