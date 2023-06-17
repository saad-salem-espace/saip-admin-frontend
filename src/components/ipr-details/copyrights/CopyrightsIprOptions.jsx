import { useTranslation } from 'react-i18next';

const CopyrightsIprOptions = () => {
  const { t } = useTranslation('search');

  const object = {
    options: [
      {
        label: t('copyrights.copyrightsData'),
        value: 'CopyrightsData',
      },
      {
        label: t('ipr.description'),
        value: 'Description',
      },
    ],
  };
  return object;
};

export default CopyrightsIprOptions;
