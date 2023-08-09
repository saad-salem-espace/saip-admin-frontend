import { useTranslation } from 'react-i18next';

const IcLayoutsIprOptions = () => {
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
        label: t('ipr.applicantDetails'),
        value: 'ApplicantsDetails',
      },
      {
        label: t('industrialDesign.designerDetails'),
        value: 'DesignersDetails',
      },
      {
        label: t('ipr.representativeDetails'),
        value: 'RepresentativesDetails',
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
    ],
  };
  return object;
};

export default IcLayoutsIprOptions;
