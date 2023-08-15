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
        label: t('ipr.mark'),
        value: 'Mark',
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
        label: t('ipr.ownerDetails'),
        value: 'OwnersDetails',
      },
      {
        label: t('ipr.representativeDetails'),
        value: 'RepresentativesDetails',
      },
      {
        label: t('ipr.goodsServices'),
        value: 'GoodsAndServices',
      },
      {
        label: t('ipr.figurativeClassification'),
        value: 'FigurativeClassification',
      },
      {
        label: t('ipr.exhibitionDetails'),
        value: 'ExhibitionInformation',
      },
      {
        label: t('ipr.priorities'),
        value: 'Priorities',
      },
      {
        label: t('ipr.officeActions'),
        value: 'OfficeActions',
      },
    ],
  };
  return object;
};

export default TrademarkIprOptions;
