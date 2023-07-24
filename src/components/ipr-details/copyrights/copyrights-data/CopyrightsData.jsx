import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';
import { highlightListener } from 'utils/eventListeners';
import Moment from 'moment';
import LabelValue from '../../shared/label-value/LabelValue';
import './copyrights.scss';
import { LONG_DATE } from '../../../../constants';

const CopyrightsData = ({
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
          label={t('ipr.filingNumber')}
          value={BibliographicData.FilingNumber}
          labelClassName="copyrights-label"
        />
        <LabelValue
          label={t('ipr.filingDate')}
          value={BibliographicData?.FilingDate
            && Moment(BibliographicData.FilingDate).format(LONG_DATE)}
          labelClassName="copyrights-label"
        />
        <LabelValue
          label={t('decisions.type')}
          value={BibliographicData?.ServiceType}
          labelClassName="copyrights-label"
        />
        <LabelValue
          label={t('ipr.publicationDate')}
          value={BibliographicData?.PublicationDate
            && Moment(BibliographicData?.PublicationDate).format(LONG_DATE)}
          labelClassName="copyrights-label"
        />
        <LabelValue
          label={t('copyrights.grantDate')}
          value={BibliographicData?.GrantDate
            && Moment(BibliographicData?.GrantDate).format(LONG_DATE)}
          labelClassName="copyrights-label"
        />
        <LabelValue
          label={t('ipr.description')}
          value={BibliographicData?.Description}
          labelClassName="copyrights-label"
        />
        <LabelValue
          label={t('ipr.authors')}
          value={BibliographicData?.Authors.join(' , ')}
          labelClassName="copyrights-label"
        />
        <LabelValue
          label={t('copyrights.claimants')}
          value={BibliographicData?.Claimants.join(' , ')}
          labelClassName="copyrights-label"
        />
        <LabelValue
          label={t('ipr.applicants')}
          value={BibliographicData?.Applicants.join(' , ')}
          labelClassName="copyrights-label"
        />
      </Col>
    </Row>
  );
};

CopyrightsData.propTypes = {
  document: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      FilingNumber: PropTypes.string,
      FilingDate: PropTypes.string,
      PublicationDate: PropTypes.string,
      GrantDate: PropTypes.string,
      ServiceType: PropTypes.string,
      Description: PropTypes.string,
      Authors: PropTypes.arrayOf(PropTypes.string),
      Claimants: PropTypes.arrayOf(PropTypes.string),
      Applicants: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

CopyrightsData.defaultProps = {
  examinerView: false,
};

export default CopyrightsData;
