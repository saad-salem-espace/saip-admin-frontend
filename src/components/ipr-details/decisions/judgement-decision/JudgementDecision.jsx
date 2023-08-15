import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';
import { highlightListener } from 'utils/eventListeners';
import LabelValue from '../../shared/label-value/LabelValue';
import './judgementDecision.scss';

const JudgementDecision = ({
  document, handleClick,
  examinerView,
}) => {
  const { t } = useTranslation('search');
  const { BibliographicData } = document;
  const [left, setLeft] = useState();
  const [top, setTop] = useState();

  useEffect(() => {
    const handleSelectionChange = () => {
      highlightListener(setLeft, setTop);
    };
    if (examinerView) {
      window.document.addEventListener('selectionchange', handleSelectionChange);
    }
    return () => {
      window.document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const btnPosition = {
    left: `${left + 17}px`,
    top: `${top - 38}px`,
  };

  return (
    <Row>
      <Col id="col">
        <KeywordPlannerButton btnPosition={btnPosition} handleClick={handleClick} />
        <LabelValue
          label={t('decisions.decisionNumber')}
          value={BibliographicData?.FilingNumber}
          labelClassName="decision-label"
        />
        <LabelValue
          label={t('decisions.decisionCategory')}
          value={BibliographicData?.DecisionCategory}
          labelClassName="decision-label"
        />
        <LabelValue
          label={t('decisions.type')}
          value={BibliographicData?.Type}
          labelClassName="decision-label"
        />
        <LabelValue
          label={t('decisions.decisionDate')}
          value={BibliographicData?.DecisionDate}
          labelClassName="decision-label"
        />
        <LabelValue
          label={t('decisions.decision')}
          value={BibliographicData?.Decision}
          labelClassName="decision-label"
        />
        <LabelValue
          label={t('decisions.domain')}
          value={BibliographicData?.Domain}
          labelClassName="decision-label"
        />
        <LabelValue
          label={t('decisions.keywords')}
          value={BibliographicData?.Keywords}
          labelClassName="decision-label"
        />
        <LabelValue
          label={t('decisions.decisionBrief')}
          value={BibliographicData?.DecisionBrief}
          labelClassName="decision-label"
        />
      </Col>
    </Row>
  );
};

JudgementDecision.propTypes = {
  document: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      FilingNumber: PropTypes.string,
      DecisionCategory: PropTypes.string,
      DecisionDate: PropTypes.string,
      Domain: PropTypes.string,
      Type: PropTypes.string,
      Keywords: PropTypes.string,
      DecisionBrief: PropTypes.string,
      Decision: PropTypes.string,
    }).isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

JudgementDecision.defaultProps = {
  examinerView: false,
};

export default JudgementDecision;
