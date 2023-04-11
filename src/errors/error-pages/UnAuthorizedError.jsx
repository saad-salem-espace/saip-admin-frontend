import { useTranslation } from 'react-i18next';
import unauthorized from '../../assets/images/errors/401.svg';
import SharedErrorPage from './SharedErrorPage';

const UnAuthorizedError = () => {
  const { t } = useTranslation('error');
  return (
    <SharedErrorPage img={unauthorized} msg={t('noAuthorizationMsg')} title={t('noAuthorization')} />
  );
};

export default UnAuthorizedError;
