import { useTranslation, Trans } from 'react-i18next';
import notFound from '../../assets/images/errors/404.svg';
import SharedErrorPage from './SharedErrorPage';

const NotFoundError = () => {
  const { t } = useTranslation('error');
  return (
    <SharedErrorPage
      img={notFound}
      msg={
        <Trans
          i18nKey="notFoundMsg"
          ns="error"
          components={<span className="d-block" />}
        />
      }
      title={t('notFound')}
    />
  );
};

export default NotFoundError;
