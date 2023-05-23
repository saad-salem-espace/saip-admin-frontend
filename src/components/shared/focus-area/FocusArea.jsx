import IprModal from 'components/examiner-dashboard/board/ipr-modal/IprModal';
import './FocusArea.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Button from '../button/Button';

function FocusArea({
  hideFocusArea, filingNumber, applicationTitle,
}) {
  return (
    <div className="d-flex align-items-center focus-area rounded bg-gray-700">
      <div className="bg-dark p-2 d-flex buttons">
        <Button
          text={<FontAwesomeIcon icon={faXmark} />}
          onClick={hideFocusArea}
          className="fs-base close-icon ps-0 py-0 pe-2 text-white"
        />
        <IprModal
          documentId={filingNumber}
        />
      </div>
      <p className="mb-0 px-2 text">
        <span className="font-bold filing-number">{filingNumber}</span>
        {applicationTitle}
      </p>
    </div>
  );
}

FocusArea.propTypes = {
  hideFocusArea: PropTypes.func.isRequired,
  applicationTitle: PropTypes.string.isRequired,
  filingNumber: PropTypes.string.isRequired,
};

export default FocusArea;
