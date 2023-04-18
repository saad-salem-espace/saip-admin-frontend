import { useTranslation } from 'react-i18next';
import badRequest from '../../assets/images/errors/400.svg';
import SharedErrorPage from './SharedErrorPage';

const InvalidState = () => {
  const { t } = useTranslation('error');
  return (
    <SharedErrorPage
      img={badRequest}
      msg={t('badRequestMsg')}
      title={t('badRequest')}
    />
  );
};
export default InvalidState;
