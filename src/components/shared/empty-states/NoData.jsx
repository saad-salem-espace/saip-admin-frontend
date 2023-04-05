import { useTranslation } from 'react-i18next';

const NoData = () => {
  const { t } = useTranslation();
  return <p className="md-text">{ t('noRelevantData')}</p>;
};

export default NoData;
