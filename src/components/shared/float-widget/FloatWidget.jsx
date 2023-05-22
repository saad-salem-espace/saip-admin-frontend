import React, { useState } from 'react';
import {
  Button,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import i18n from 'i18n';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import './float-widget.scss';

const FloatWidget = ({
  id,
  children,
  show,
  widgetTitle,
  widgetAction,
  widgetActionText,
  WidgetIcon,
  variant,
  className,
}) => {
  const currentLang = i18n.language;
  const [display, setDisplay] = useState(show);
  const handleDismiss = () => {
    setDisplay(false);
  };
  const popover = (
    <Popover id={id} className={`${className} ${variant} app float-widget p-0`}>
      <Popover.Header className={`${variant} border-0 p-0 m-0 d-flex justify-content-between align-items-center`}>
        <Button onClick={handleDismiss} size="sm" variant="link" className="transparent btn-dismiss p-0">
          <GrFormClose className="text-gray fs-22" />
        </Button>
      </Popover.Header>
      <Popover.Body className="p-0 d-flex flex-column fs-14 text-gray-700">
        <div className="p-3 pt-0 text-center widget-title">
          { WidgetIcon && WidgetIcon }
          <p className="fs-base font-medium text-black my-3">{widgetTitle}</p>
          {children}
        </div>
        <Link
          to={widgetAction}
          target="_blank"
          size="sm"
          className="appBtn btn btn-primary d-block fs-14 mt-3 py-2 widget-action"
        >
          {widgetActionText}
          {currentLang === 'ar' ? (
            <BsArrowLeft className="ms-3" />
          ) : (
            <BsArrowRight className="ms-3" />
          )}
        </Link>
      </Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      placement="auto"
      overlay={popover}
      show={display}
    >
      <span />
    </OverlayTrigger>
  );
};

FloatWidget.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  widgetTitle: PropTypes.string,
  widgetAction: PropTypes.string,
  widgetActionText: PropTypes.string,
  WidgetIcon: PropTypes.node,
  variant: PropTypes.string,
  className: PropTypes.string,
};

FloatWidget.defaultProps = {
  show: false,
  widgetTitle: '',
  widgetAction: '',
  widgetActionText: '',
  WidgetIcon: null,
  variant: '',
  className: '',
};

export default FloatWidget;
