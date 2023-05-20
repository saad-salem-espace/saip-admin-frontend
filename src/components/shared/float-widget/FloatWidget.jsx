import PropTypes from 'prop-types';
import ViewTip from '../view-tip/ViewTip';
import './float-widget.scss';

const FloatWidget = ({
  id,
  widgetTitle,
  widgetAction,
  widgetActionText,
  children,
  show,
  float,
}) => (
  <ViewTip
    id={id}
    widgetTitle={widgetTitle}
    widgetAction={widgetAction}
    widgetActionText={widgetActionText}
    show={show}
    float={float}
  >
    {children}
  </ViewTip>
);

FloatWidget.propTypes = {
  id: PropTypes.string.isRequired,
  widgetTitle: PropTypes.string,
  widgetAction: PropTypes.string,
  widgetActionText: PropTypes.string,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  float: PropTypes.bool,
};

FloatWidget.defaultProps = {
  widgetTitle: '',
  widgetAction: '',
  widgetActionText: '',
  float: true,
};
export default FloatWidget;
