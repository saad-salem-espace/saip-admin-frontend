import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Button from 'components/shared/button/Button';
import style from './ipr-details.module.scss';

function IprControlAction({
  collapseIPR,
  onClose,
  isIPRExpanded,
}) {
  return (
    <>
      <Button
        variant="link"
        onClick={collapseIPR}
        className="p-0 pe-5 d-md-inline-block d-none"
        data-testid="expand-ipr-detail-button"
        text={<FontAwesomeIcon icon={isIPRExpanded ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} className={`f-17 text-gray ${style['expand-icon']}`} />}
      />
      <Button
        variant="link"
        data-testid="close-ipr-detail-button"
        onClick={onClose}
        className="p-0"
        text={<FontAwesomeIcon icon={faTimes} className="f-20 text-gray border-start ps-5" />}
      />
    </>
  );
}

IprControlAction.propTypes = {
  collapseIPR: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  isIPRExpanded: PropTypes.bool.isRequired,
};

IprControlAction.defaultProps = {
  onClose: () => { },
};

export default IprControlAction;
