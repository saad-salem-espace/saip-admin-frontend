import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Button from 'components/shared/button/Button';

const OriginalDocumentsNavButtons = ({ backward, forward }) => (
  <div dir="ltr" className="text-center mb-5">
    <Button
      variant="link"
      className="shadow rounded-circle mx-2"
      onClick={backward.onClick}
      disabled={backward.isDisabled}
      text={<FontAwesomeIcon
        icon={faChevronLeft}
        className="app-text-primary fs-18"
      />}
      size="sm"
    />
    <Button
      variant="link"
      className="shadow rounded-circle mx-2"
      onClick={forward.onClick}
      disabled={forward.isDisabled}
      text={<FontAwesomeIcon
        icon={faChevronRight}
        className="app-text-primary fs-18"
      />}
      size="sm"
    />
  </div>
);

OriginalDocumentsNavButtons.propTypes = {
  backward: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
  }).isRequired,
  forward: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
  }).isRequired,
};

export default OriginalDocumentsNavButtons;
