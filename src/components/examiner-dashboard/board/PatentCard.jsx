import { Card, Button as BootstrapButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';
import Button from 'components/shared/button/Button';
import PropTypes from 'prop-types';
import { TbRefresh } from 'react-icons/tb';
import { BsPinAngle, BsPinFill, BsPlusLg } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { FaCommentAlt } from 'react-icons/fa';
import './PatentCard.scss';
import { calculateDifference, formatLongDate, dateFormatSubstring } from 'utils/dates';
import useAxios from 'hooks/useAxios';
import togglePinned from 'apis/dashboard/togglePinned';
import { useEffect } from 'react';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import Image from 'react-bootstrap/Image';
import { useDrag } from 'react-dnd';
import focusIcon from '../../../assets/images/icons/focus.svg';
import unfocusIcon from '../../../assets/images/icons/unfocused.svg';

const PatentCard = ({
  assignment, setToggle, setActiveDocument,
  setActiveTab, isInProgress, SetSelectedCard,
  active, selectedFocusArea, SetSelectedFocusArea, updateFocusArea, showFocusArea,
  activeWorkstream,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: assignment,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), []);
  const removeFromFocusArea = () => {
    updateFocusArea(false);
    localStorage.removeItem('FocusDoc');
    SetSelectedFocusArea(null);
  };

  const { t } = useTranslation('dashboard', 'common');
  const [pinnedData, executeToggle] = useAxios(
    togglePinned({ Ids: [assignment.id] }),
    { manual: true },
  );

  useEffect(() => {
    SetSelectedFocusArea(JSON.parse(localStorage.getItem('FocusDoc'))?.doc?.filingNumber);
  }, []);
  const addToFocusArea = () => {
    updateFocusArea(true);
    const assignmentObj = {
      workstreamId: activeWorkstream,
      doc: assignment,
    };
    localStorage.setItem('FocusDoc', JSON.stringify(assignmentObj));
    SetSelectedFocusArea(JSON.parse(localStorage.getItem('FocusDoc'))?.doc?.filingNumber);
  };

  const handleFocusClick = () => {
    if (selectedFocusArea) {
      removeFromFocusArea();
    } else {
      addToFocusArea();
    }
  };

  useEffect(() => {
    if (!showFocusArea) {
      removeFromFocusArea();
    }
  }, [showFocusArea]);

  useEffect(() => {
    if (pinnedData.data && pinnedData.data.status === 200) setToggle(true);
  }, [pinnedData]);

  const isPinned = assignment.pinned;
  const currentLang = i18n.language;

  const cardStyle = [isDragging && 'is-dragging-card invisible', active && 'active'].filter(Boolean).join(' ');

  return (
    <Card ref={drag} className={`${cardStyle} patent-card mb-2`}>
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center border-bottom mb-2">
          <AppTooltip
            placement="top"
            tooltipContent={
              <>
                <span className="d-block">US • B1 • 2022.12.31</span>
                <span className="d-block">KR • B2 • 2021.12.31</span>
              </>
            }
            tooltipTrigger={
              <BootstrapButton variant="transparent" className="app-bg-secondary-tangerine me-2 rounded-circle py-1 px-2">
                <TbRefresh className="app-text-secondary-tangerine fs-18" />
              </BootstrapButton>
            }
          />
          <Button
            variant="link"
            className="text-decoration-none text-start p-0 font-regular w-75"
            onClick={() => {
              setActiveDocument(assignment.filingNumber); setActiveTab(1);
              SetSelectedCard(assignment.id);
              isInProgress(assignment.status === 'IN_PROGRESS');
            }}
            text={
              <p className="app-text-primary-dark fs-sm text-truncate mb-0">{`${assignment.filingNumber} • ${assignment.filingDate?.substring(0, dateFormatSubstring) || t('dashboard:notAvailable')}`}</p>
            }
          />
          <div className="d-flex">
            {
            assignment.status === 'IN_PROGRESS' && (
              <div className="icon-wrapper">
                <AppTooltip
                  placement="top"
                  tooltipContent={selectedFocusArea && (selectedFocusArea !== assignment.filingNumber) ? t('board.cannotFocus') : t('board.addtoFocus')}
                  tooltipTrigger={
                    <div>
                      <BootstrapButton
                        variant="link"
                        disabled={selectedFocusArea
                        && (selectedFocusArea !== assignment.filingNumber)}
                        onClick={() => handleFocusClick()}
                        className="p-2"
                      >
                        <Image src={selectedFocusArea === assignment.filingNumber
                          ? unfocusIcon : focusIcon}
                        />
                      </BootstrapButton>
                    </div>
                }
                />
              </div>
            )
          }
            <Button
              variant="link"
              className={`p-2 fs-15 text-${isPinned ? 'primary' : 'gray'} position-relative`}
              text={isPinned ? <BsPinFill /> : <BsPinAngle />}
              onClick={executeToggle}
            />
          </div>
        </div>
        <Button
          variant="link"
          className="text-decoration-none text-start p-0 font-regular d-block"
          onClick={() => {
            setActiveDocument(assignment.filingNumber); setActiveTab(1); isInProgress(true);
            SetSelectedCard(assignment.id);
          }}
          text={
            <p className="name-card text-black fs-base mb-1">
              {assignment.applicationTitle}
            </p>
          }
        />
        <AppTooltip
          tooltipContent={formatLongDate(assignment.statusChangeDate)}
          tooltipId={assignment.filingNumber}
          tooltipTrigger={
            <p className="submit-date text-gray fs-sm d-inline-block">
              {currentLang === 'ar' ? (
                <div>
                  {`${t('common:ago')} ${calculateDifference(assignment.statusChangeDate)} ${t('common:days')} `}
                </div>
              ) : (
                <div>
                  {`${calculateDifference(assignment.statusChangeDate)} ${t('common:days')} ${t('common:ago')}`}
                </div>
              )}
            </p>
          }
          placement="auto"
        />
        <div className="d-flex justify-content-between text-gray-700 border-bottom">
          <p className="fs-xs mb-2">
            <MdOutlineCalendarMonth className="text-muted me-1 fs-sm" />
            {t('dashboard:queue')}
            •
            {` ${assignment.queuePriorityDate?.substring(0, dateFormatSubstring) || t('dashboard:notAvailable')}`}
          </p>
          <p className="fs-xs mb-2">
            <MdOutlineCalendarMonth className="text-muted me-1 fs-sm" />
            {t('dashboard:priority')}
            •
            {` ${assignment.earliestPriorityDate?.substring(0, dateFormatSubstring) || t('dashboard:notAvailable')}`}
          </p>
        </div>
        <div className={`d-flex pt-3 ${assignment.status === 'IN_PROGRESS' ? 'justify-content-between' : 'justify-content-end'}`}>
          {
            assignment.status === 'IN_PROGRESS' && (
              <Button
                variant="link"
                onClick={() => {
                  setActiveDocument(assignment.filingNumber);
                  setActiveTab(2); isInProgress(true);
                  SetSelectedCard(assignment.id);
                }}
                className="p-1 fs-sm text-decoration-none"
                text={
                  <>
                    <BsPlusLg className="me-2 fs-base" />
                    {t('dashboard:addNote')}
                  </>
                }
              />
            )
          }
          <Button
            variant="link"
            className="p-1 fs-15 text-gray text-decoration-none"
            onClick={() => {
              setActiveDocument(assignment.filingNumber); setActiveTab(2); isInProgress(true);
              SetSelectedCard(assignment.id);
            }}
            text={
              <>
                <FaCommentAlt className="me-2" />
                {assignment.notesCount}
              </>
            }
          />
        </div>
      </Card.Body>
    </Card>
  );
};

PatentCard.propTypes = {
  assignment: PropTypes.instanceOf(Object).isRequired,
  setToggle: PropTypes.func.isRequired,
  SetSelectedCard: PropTypes.func,
  setActiveDocument: PropTypes.func.isRequired,
  isInProgress: PropTypes.bool.isRequired,
  setActiveTab: PropTypes.func,
  active: PropTypes.bool.isRequired,
  selectedFocusArea: PropTypes.string.isRequired,
  SetSelectedFocusArea: PropTypes.func.isRequired,
  updateFocusArea: PropTypes.func.isRequired,
  showFocusArea: PropTypes.bool.isRequired,
  activeWorkstream: PropTypes.number.isRequired,
};

PatentCard.defaultProps = {
  SetSelectedCard: null,
  setActiveTab: () => { },
};

export default PatentCard;
