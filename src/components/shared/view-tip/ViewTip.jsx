import React, { useState } from 'react';
import {
  Button,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { BsQuestionCircle } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import './viewtip.scss';

const ViewTip = ({
  Title,
  children,
  id,
}) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => {
    setShow((prev) => !prev);
  };
  const popover = (
    <Popover id={id} className="bg-primary-10 p-4">
      <Popover.Header className="bg-primary-10 border-0 p-0 m-0 d-flex justify-content-between align-items-center">
        <p className="fs-14 font-medium text-primary-dark mt-2 mb-0 col-2 text-truncate w-75">{Title}</p>
        <Button onClick={handleToggle} size="sm" variant="link" className="transparent p-0">
          <GrFormClose className="text-gray fs-22" />
        </Button>
      </Popover.Header>
      <Popover.Body className="p-0 d-flex flex-column fs-14 text-gray-700">
        <div className="my-4">
          {children}
        </div>
        <Button onClick={handleToggle} size="sm" variant="primary" className="appBtn ms-auto py-1 fs-14">
          <Trans
            i18nKey="gotIt"
            ns="common"
          />
        </Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      placement="auto"
      overlay={popover}
      show={show}
      onToggle={handleToggle}
    >
      <Button variant="link" className="btn-view-tip">
        <BsQuestionCircle className="text-primary" />
      </Button>
    </OverlayTrigger>
  );
};

ViewTip.propTypes = {
  id: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ViewTip;
