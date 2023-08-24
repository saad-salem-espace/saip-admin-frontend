import { useTranslation } from 'react-i18next';

const IndustrialDesignIprOptions = () => {
  const { t } = useTranslation('search');

  const object = {
    options: [
      {
        label: t('ipr.bibliographic'),
        value: 'BibliographicData',
      },
      {
        label: t('ipr.drawings'),
        value: 'Drawings',
      },
      {
        label: t('ipr.description'),
        value: 'Description',
      },
      {
        label: t('ipr.legalStatus'),
        value: 'LegalStatus',
      },
      {
        label: t('ipr.priorities'),
        value: 'Priorities',
      },
    ],
  };
  return object;
};

export default IndustrialDesignIprOptions;
