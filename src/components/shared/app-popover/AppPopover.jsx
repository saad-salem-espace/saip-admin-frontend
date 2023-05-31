import React, { useState, useEffect } from 'react';
import {
  Button,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import i18n from 'i18n';
import PropTypes from 'prop-types';
import { GrFormClose } from 'react-icons/gr';
import './AppPopover.scss';

const AppPopover = ({
  Title,
  children,
  id,
  btnText,
  className,
  variant,
  popoverTrigger,
  btnVariant,
  placement,
  handleCallback,
}) => {
  const [show, setShow] = useState();
  const handleToggle = () => {
    setShow((prev) => !prev);
  };
  const handleDismiss = () => {
    setShow(false);
  };
  const currentLang = i18n.language;
  useEffect(() => {
    setShow(false);
  }, [currentLang]);
  const popover = (
    <Popover id={id} className={`app ${className} ${variant} p-4`}>
      <Popover.Header className={`${variant} border-0 p-0 m-0 d-flex justify-content-between align-items-center`}>
        <p className="fs-14 font-medium text-primary-dark mt-2 mb-0 title">{Title}</p>
        <Button onClick={handleDismiss} size="sm" variant="link" className="transparent btn-dismiss p-0">
          <GrFormClose className="text-gray fs-22" />
        </Button>
      </Popover.Header>
      <Popover.Body className="p-0 d-flex flex-column fs-14 text-gray-700">
        <div className="my-4 fixed-content">
          {children}
        </div>
        { btnText && (
          <Button
            onClick={() => { handleDismiss(); handleCallback(); }}
            size="sm"
            variant={btnVariant}
            className="appBtn ms-auto py-1 fs-14"
          >
            {btnText}
          </Button>
        )}
      </Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      placement={placement}
      overlay={popover}
      onToggle={handleToggle}
      show={show}
    >
      {popoverTrigger}
    </OverlayTrigger>
  );
};

AppPopover.propTypes = {
  id: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  popoverTrigger: PropTypes.node.isRequired,
  btnText: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  btnVariant: PropTypes.string,
  placement: PropTypes.string,
  handleCallback: PropTypes.func,
};

AppPopover.defaultProps = {
  btnText: '',
  className: '',
  variant: '',
  btnVariant: 'primary',
  placement: 'auto',
  handleCallback: () => {},
};

export default AppPopover;
