import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import PropTypes from 'prop-types';
import './AppTooltip.scss';

function AppTooltip({
  placement,
  tooltipTrigger,
  tooltipContent,
  tooltipId,
  className,
}) {
  const renderTooltip = (props) => (
    <Tooltip id={`tooltip-${tooltipId}`} className={className} {...props}>
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
  tooltipId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

AppTooltip.defaultProps = {
  placement: 'top',
  className: '',
};

export default AppTooltip;
