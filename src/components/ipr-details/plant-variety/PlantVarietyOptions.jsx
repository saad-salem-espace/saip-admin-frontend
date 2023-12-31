import { useTranslation } from 'react-i18next';

const PlantVarietyOptions = () => {
  const { t } = useTranslation('search');

  const object = {
    options: [
      {
        label: t('ipr.bibliographic'),
        value: 'BibliographicData',
      },
      {
        label: t('ipr.description'),
        value: 'Description',
      },
      {
        label: t('ipr.priorities'),
        value: 'Priorities',
      },
      {
        label: t('ipr.legalStatus'),
        value: 'LegalStatus',
      },
      {
        label: t('ipr.drawings'),
        value: 'Drawings',
      },
      {
        label: t('ipr.originalDocument'),
        value: 'OriginalDocuments',
      },
    ],
  };
  return object;
};

export default PlantVarietyOptions;
