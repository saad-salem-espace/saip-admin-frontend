import { useTranslation } from 'react-i18next';
import serverError from '../../assets/images/errors/500.svg';
import SharedErrorPage from './SharedErrorPage';

const ServerError = () => {
  const { t } = useTranslation('error');
  return (
    <SharedErrorPage img={serverError} msg={t('serverErrorMsg')} title={t('serverError')} />
  );
};
export default ServerError;
