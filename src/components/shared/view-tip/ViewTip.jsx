import React, { useState } from 'react';
import {
  Button,
  OverlayTrigger,
  Popover,
  Image,
} from 'react-bootstrap';
import i18n from 'i18n';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsQuestionCircle, BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import surveyIcon from 'assets/images/icons/ic-survey.svg';
import './viewtip.scss';

const ViewTip = ({
  Title,
  children,
  id,
  gotIt,
  widgetTitle,
  widgetAction,
  widgetActionText,
  show,
  float,
}) => {
  const currentLang = i18n.language;
  const [display, setDisplay] = useState(show);
  const handleToggle = () => {
    setDisplay((prev) => !prev);
  };
  const popover = (
    <Popover id={id} className={`bg-primary-10 ${gotIt ? 'p-4' : 'pb-0'}  ${float ? 'float-widget' : ''}`}>
      <Popover.Header className="bg-primary-10 border-0 p-0 m-0 d-flex justify-content-between align-items-center">
        {
          gotIt && <p className="fs-14 font-medium text-primary-dark mt-2 mb-0 col-2 text-truncate w-75">{Title}</p>
        }
        <Button onClick={handleToggle} size="sm" variant="link" className="transparent btn-dismiss p-0">
          <GrFormClose className="text-gray fs-22" />
        </Button>
      </Popover.Header>
      <Popover.Body className="p-0 d-flex flex-column fs-14 text-gray-700">
        <div className={`${gotIt ? 'my-4' : 'p-3 pt-0 text-center widget-title'}`}>
          {
            float && (
              <>
                <Image src={surveyIcon} className="d-block mx-auto my-3" />
                <p className="fs-base font-medium text-black my-3">{widgetTitle}</p>
              </>
            )
          }
          {children}
        </div>
        {
          gotIt && (
            <Button
              onClick={handleToggle}
              size="sm"
              variant="primary"
              className="appBtn ms-auto py-1 fs-14"
            >
              <Trans i18nKey="gotIt" ns="common" />
            </Button>
          )
        }
        {
          widgetAction && (
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
          )
        }
      </Popover.Body>
    </Popover>
  );
  return (
    <div>
      {
        gotIt ? (
          <OverlayTrigger
            trigger="click"
            placement="auto"
            overlay={popover}
            show={display}
            onToggle={handleToggle}
          >
            <Button variant="link" className="btn-view-tip">
              <BsQuestionCircle className="text-primary" />
            </Button>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            trigger="click"
            placement="auto"
            overlay={popover}
            show={display}
          >
            <span />
          </OverlayTrigger>
        )
      }
    </div>
  );
};

ViewTip.propTypes = {
  id: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  gotIt: PropTypes.bool,
  float: PropTypes.bool,
  widgetTitle: PropTypes.string,
  widgetAction: PropTypes.string,
  widgetActionText: PropTypes.string,
};

ViewTip.defaultProps = {
  gotIt: false,
  widgetTitle: '',
  widgetAction: '',
  widgetActionText: '',
  show: false,
  float: false,
};

export default ViewTip;
