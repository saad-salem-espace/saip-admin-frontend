import { useTranslation } from 'react-i18next';

const PatentIprOptions = () => {
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
        label: t('patent.claims'),
        value: 'Claims',
      },
      {
        label: t('patent.drawings'),
        value: 'Drawings',
      },
      {
        label: t('ipr.legalStatus'),
        value: 'LegalStatus',
      },
      {
        label: t('ipr.priorities'),
        value: 'PrioritiesDetails',
      },
      {
        label: t('ipr.originalDocument'),
        value: 'OriginalDocuments',
      },
    ],
  };
  return object;
};

export default PatentIprOptions;
