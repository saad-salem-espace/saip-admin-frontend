import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ToggleButtonStyle from './ToggleButton.module.scss';

function ToggleButton({ handleToggleButton, isToggleButtonOn, text }) {
  return (
    <div>
      <Button
        onClick={handleToggleButton}
        className={`${ToggleButtonStyle['toggle-btn-container']} ${isToggleButtonOn ? ToggleButtonStyle.on : ToggleButtonStyle.off} p-0`}
      >
        <span className={`${ToggleButtonStyle['toggle-btn']} p-0`} />
      </Button>
      <span className="text-gray-700 ps-3">{text}</span>
    </div>
  );
}

ToggleButton.propTypes = {
  handleToggleButton: PropTypes.func.isRequired,
  isToggleButtonOn: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default ToggleButton;
