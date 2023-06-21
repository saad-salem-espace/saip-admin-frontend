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
        label: t('ipr.priorities'),
        value: 'Priorities',
      },
      {
        label: t('ipr.legalStatus'),
        value: 'LegalStatus',
      },
      {
        label: t('ipr.applicantDetails'),
        value: 'ApplicantsDetails',
      },
      {
        label: t('inventors'),
        value: 'InventorDetails',
      },
      {
        label: t('ipr.representativeDetails'),
        value: 'RepresentativesDetails',
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
