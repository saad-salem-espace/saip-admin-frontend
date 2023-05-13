import { useTranslation } from 'react-i18next';

const TrademarkIprOptions = () => {
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
        label: t('patent.citations'),
        value: 'Citations',
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
        label: t('ipr.applicantDetails'),
        value: 'ApplicantsDetails',
      },
      {
        label: t('inventors'),
        value: 'Inventors',
      },
      {
        label: t('ipr.ownerDetails'),
        value: 'OwnersDetails',
      },
      {
        label: t('ipr.representativeDetails'),
        value: 'Representative',
      },
      {
        label: t('ipr.officeActions'),
        value: 'OfficeActions',
      },
      {
        label: t('patent.patentFamility.patentFamility'),
        value: 'PatentFamility',
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

export default TrademarkIprOptions;
