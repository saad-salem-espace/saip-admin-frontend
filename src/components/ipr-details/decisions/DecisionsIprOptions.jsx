import { useTranslation } from 'react-i18next';

const DecisionsIprOptions = () => {
  const { t } = useTranslation('search');

  const object = {
    options: [
      {
        label: t('decisions.judgementDecision'),
        value: 'JudgementDecision',
      },
      {
        label: t('decisions.references'),
        value: 'References',
      },
      {
        label: t('decisions.facts'),
        value: 'Facts',
      },
      {
        label: t('decisions.reasons'),
        value: 'Reasons',
      },
      {
        label: t('ipr.originalDocument'),
        value: 'OriginalDocuments',
      },
    ],
  };
  return object;
};

export default DecisionsIprOptions;
