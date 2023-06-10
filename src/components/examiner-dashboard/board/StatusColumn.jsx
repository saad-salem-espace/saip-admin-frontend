import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Badge from 'components/shared/badge/Badge';
import './board.scss';
import { useState } from 'react';
import PatentCard from './PatentCard';

const StatusColumn = ({
  status, className, data, setActiveDocument, setToggle,
  activeDocument, setActiveTab, isInProgress,
  SetSelectedCard, updateFocusArea, showFocusArea, activeWorkstream,
}) => {
  const { t } = useTranslation('dashboard');
  const pinned = !!data.length;
  const others = !!data.length;

  const [selectedFocusArea, setSelectedFocusArea] = useState();
  const SetSelectedFocusArea = (i) => {
    setSelectedFocusArea(i);
  };
  return (
    <Col md={6} lg={4} xl={3} className="mb-5">
      <p className={`${className} h-px-24 assignment-status text-uppercase ps-3`}>
        {status}
        <Badge className="ms-2 app-text-primary p-2 app-bg-primary-01" text={data.length} />
      </p>
      <div className="cards-container px-3 py-5">
        { pinned && (
          <p className="app-text-primary-dark fs-sm fw-bold">{t('dashboard:pinned')}</p>
        )}
        {data.map((assignment) => (
          assignment.pinned
          && <PatentCard
            assignment={assignment}
            setToggle={setToggle}
            setActiveDocument={setActiveDocument}
            activeDocument={activeDocument}
            setActiveTab={setActiveTab}
            isInProgress={isInProgress}
            SetSelectedCard={SetSelectedCard}
            active={activeDocument === assignment.filingNumber}
            SetSelectedFocusArea={SetSelectedFocusArea}
            selectedFocusArea={selectedFocusArea}
            updateFocusArea={updateFocusArea}
            showFocusArea={showFocusArea}
            activeWorkstream={activeWorkstream}
          />
        ))}
        { others && (
          <p className="app-text-primary-dark fs-sm fw-bold">{t('dashboard:others')}</p>
        )}
        {data.map((assignment) => (
          !(assignment.pinned)
          && <PatentCard
            assignment={assignment}
            setToggle={setToggle}
            setActiveDocument={setActiveDocument}
            setActiveTab={setActiveTab}
            isInProgress={isInProgress}
            SetSelectedCard={SetSelectedCard}
            active={activeDocument === assignment.filingNumber}
            SetSelectedFocusArea={SetSelectedFocusArea}
            selectedFocusArea={selectedFocusArea}
            updateFocusArea={updateFocusArea}
            showFocusArea={showFocusArea}
            activeWorkstream={activeWorkstream}
          />
        ))}
      </div>
    </Col>
  );
};

StatusColumn.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  SetSelectedCard: PropTypes.func,
  activeDocument: PropTypes.string.isRequired,
  isInProgress: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func,
  updateFocusArea: PropTypes.func.isRequired,
  showFocusArea: PropTypes.bool.isRequired,
  activeWorkstream: PropTypes.number.isRequired,

};

StatusColumn.defaultProps = {
  SetSelectedCard: null,
  setActiveTab: () => {},
};

export default StatusColumn;
