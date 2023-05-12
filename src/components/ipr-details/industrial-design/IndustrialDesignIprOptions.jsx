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
        label: t('ipr.applicantDetails'),
        value: 'ApplicantsDetails',
      },
      {
        label: t('industrialDesign.designerDetails'),
        value: 'DesignerDetails',
      },
      {
        label: t('ipr.representativeDetails'),
        value: 'Representative',
      },
      {
        label: t('industrialDesign.indicationDesign'),
        value: 'IndicationOfDesign',
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

export default IndustrialDesignIprOptions;
