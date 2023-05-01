import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './sidebar.scss';

function Sidebar({ setActiveWorkstream, activeWorkstream, linksList }) {
  return (
    <div className="dashboard-sidebar justify-content-center bg-white shadow position-fixed top-0 start-0  w-px-65 vh-100">
      <div className="nav d-flex flex-column">
        {linksList.map((button) => (
          <AppTooltip
            placement="right"
            tooltipId={button.WorkStreamClass}
            tooltipContent={button.workStreamName}
            tooltipTrigger={
              <Button
                onClick={() => setActiveWorkstream(button)}
                variant="link"
                className={`nav-link ${button.id === activeWorkstream.id ? 'active' : ''} ${button.WorkStreamClass}`}
              >
                {button.workStreamName}
              </Button>
            }
          />
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  setActiveWorkstream: PropTypes.func.isRequired,
  activeWorkstream: PropTypes.number.isRequired,
  linksList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    workStreamName: PropTypes.string,
    WorkStreamClass: PropTypes.string,
    BoardName: PropTypes.string,
  })).isRequired,
};

export default Sidebar;
