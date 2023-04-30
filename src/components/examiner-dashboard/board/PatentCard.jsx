import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Button from 'components/shared/button/Button';
import PropTypes from 'prop-types';
import { BsPinAngle, BsPinFill, BsPlusLg } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { FaCommentAlt } from 'react-icons/fa';
import './PatentCard.scss';
import { calculateDifference } from 'utils/dates';
import useAxios from 'hooks/useAxios';
import togglePinned from 'apis/dashboard/togglePinned';
import { useEffect } from 'react';

function PatentCard({ assignment, setToggle, setActiveDocument }) {
  const { t } = useTranslation('dashboard');
  const [pinnedData, executeToggle] = useAxios(
    togglePinned({ Ids: [assignment.id] }),
    { manual: true },
  );
  useEffect(() => {
    if (pinnedData.data && pinnedData.data.status === 200) setToggle(true);
  }, [pinnedData]);

  const dateFormatSubstring = 10;
  const isPinned = assignment.pinned;

  return (
    <Card className="patent-card mb-2" onClick={() => { setActiveDocument(assignment.filingNumber); }}>
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between border-bottom mb-2">
          <p className="text-primary-dark w-80 fs-14 text-truncate mb-0">{`${assignment.filingNumber} • ${assignment.filingDate.substring(0, dateFormatSubstring)}`}</p>
          <Button
            variant="link"
            className={`p-1 fs-15 text-${isPinned ? 'primary' : 'gray'}`}
            text={isPinned ? <BsPinFill /> : <BsPinAngle />}
            onClick={executeToggle}
          />
        </div>
        <p className="name-card">
          {assignment.applicationTitle}
        </p>
        <p className="submit-date text-gray fs-14">
          {`${calculateDifference(assignment.statusChangeDate, dateFormatSubstring)} days ago`}
        </p>
        <div className="d-flex justify-content-between gray-700 border-bottom">
          <p className="fs-12 mb-2">
            <MdOutlineCalendarMonth className="text-muted me-1 fs-14" />
            {t('dashboard:queue')}
            •
            {` ${assignment.queuePriorityDate.substring(0, dateFormatSubstring)}`}
          </p>
          <p className="fs-12 mb-2">
            <MdOutlineCalendarMonth className="text-muted me-1 fs-14" />
            {t('dashboard:priority')}
            •
            {` ${assignment.earliestPriorityDate.substring(0, dateFormatSubstring)}`}
          </p>
        </div>
        <div className="d-flex justify-content-between pt-3">
          <Button
            variant="link"
            className="p-1 fs-14 text-decoration-none"
            text={
              <>
                <BsPlusLg className="me-2 fs-18" />
                {t('dashboard:addNote')}
              </>
            }
          />
          <Button
            variant="link"
            className="p-1 fs-15 text-gray text-decoration-none"
            text={
              <>
                <FaCommentAlt className="me-2" />
                3
              </>
            }
          />
        </div>
      </Card.Body>
    </Card>
  );
}

PatentCard.propTypes = {
  assignment: PropTypes.instanceOf(Object).isRequired,
  setToggle: PropTypes.func.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
};

export default PatentCard;
