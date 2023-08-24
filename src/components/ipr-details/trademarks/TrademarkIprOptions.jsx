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
        label: t('ipr.goodsServices'),
        value: 'GoodsAndServices',
      },
      {
        label: t('ipr.figurativeClassification'),
        value: 'FigurativeClassification',
      },
      {
        label: t('ipr.priorities'),
        value: 'Priorities',
      },
    ],
  };
  return object;
};

export default TrademarkIprOptions;
