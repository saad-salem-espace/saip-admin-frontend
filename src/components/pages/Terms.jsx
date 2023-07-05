import InnerPage from 'components/layout/InnerPage';
import { useTranslation, Trans } from 'react-i18next';

function Terms() {
  const { t } = useTranslation();
  return (
    <InnerPage dir="rtl">
      <h2 className="app-text-primary mb-7">
        {t('pages:terms.title')}
      </h2>
      <Trans
        i18nKey="terms.content"
        ns="pages"
        components={{ bold: <b />, break: <br />, title: <p className="h5 my-3" /> }}
      />
    </InnerPage>
  );
}

export default Terms;
