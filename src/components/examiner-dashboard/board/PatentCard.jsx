import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Button from 'components/shared/button/Button';
import { BsPinAngle, BsPinFill, BsPlusLg } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { FaCommentAlt } from 'react-icons/fa';
import './PatentCard.scss';

function PatentCard() {
  const pinned = true;
  const { t } = useTranslation('dashboard');
  return (
    <Card className="patent-card mb-2">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between border-bottom mb-2">
          <p className="text-primary-dark w-80 fs-14 text-truncate mb-0">SA1444020848 • 2022.12.31</p>
          <Button
            variant="link"
            className={`p-1 fs-15 text-${pinned ? 'primary' : 'gray'}`}
            text={pinned ? <BsPinFill /> : <BsPinAngle />}
          />
        </div>
        <p className="name-card">
          Process for the production of acetic acid production of acetic produc ...
        </p>
        <p className="submit-date text-gray fs-14">
          1 day ago
        </p>
        <div className="d-flex justify-content-between gray-700 border-bottom">
          <p className="fs-12 mb-2">
            <MdOutlineCalendarMonth className="text-muted me-1 fs-14" />
            {t('dashboard:queue')}
            • 2022.12.31
          </p>
          <p className="fs-12 mb-2">
            <MdOutlineCalendarMonth className="text-muted me-1 fs-14" />
            {t('dashboard:queue')}
            • 2022.12.31
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

export default PatentCard;
