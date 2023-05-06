import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Badge from 'components/shared/badge/Badge';
import './board.scss';
import PatentCard from './PatentCard';

function StatusColumn({
  status, className, data, setActiveDocument, setToggle,
  activeDocument, setActiveTab, isInProgress,
  SetSelectedCard,
}) {
  const { t } = useTranslation('dashboard');
  const pinned = !!data.length;
  const others = !!data.length;
  return (
    <Col md={6} lg={4} xl={3} className="mb-5">
      <p className={`${className} h-px-24 border-start border-3 text-uppercase ps-3`}>
        {status}
        <Badge varient="primary-10" className="ms-2 text-primary p-2" text={data.length} />
      </p>
      <div className="cards-container bg-gray-200 px-3 py-5">
        { pinned && (
          <p className="text-primary-dark fs-sm fw-bold">{t('dashboard:pinned')}</p>
        )}
        {data.map((assignment) => (
          assignment.pinned
          && <PatentCard
            assignment={assignment}
            setToggle={setToggle}
            setActiveDocument={setActiveDocument}
            activeDocument={activeDocument}
            status={status}
            setActiveTab={setActiveTab}
            isInProgress={isInProgress}
            SetSelectedCard={SetSelectedCard}
            active={activeDocument === assignment.filingNumber}
          />
        ))}
        { others && (
          <p className="text-primary-dark fs-sm fw-bold">{t('dashboard:others')}</p>
        )}
        {data.map((assignment) => (
          !(assignment.pinned)
          && <PatentCard
            assignment={assignment}
            setToggle={setToggle}
            setActiveDocument={setActiveDocument}
            status={status}
            setActiveTab={setActiveTab}
            isInProgress={isInProgress}
            SetSelectedCard={SetSelectedCard}
            active={activeDocument === assignment.filingNumber}
          />
        ))}
      </div>
    </Col>
  );
}

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
};

StatusColumn.defaultProps = {
  SetSelectedCard: null,
  setActiveTab: () => {},
};

export default StatusColumn;
