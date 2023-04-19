import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import PropTypes from 'prop-types';
import './AppTooltip.scss';

function AppTooltip({ placement, tooltipTrigger, tooltipContent }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" className="tooltip-content" {...props}>
      {tooltipContent}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      overlay={renderTooltip}
    >
      {tooltipTrigger}
    </OverlayTrigger>
  );
}

AppTooltip.propTypes = {
  tooltipTrigger: PropTypes.node.isRequired,
  tooltipContent: PropTypes.node.isRequired,
  placement: PropTypes.string,
};

AppTooltip.defaultProps = {
  placement: 'top',
};

export default AppTooltip;
