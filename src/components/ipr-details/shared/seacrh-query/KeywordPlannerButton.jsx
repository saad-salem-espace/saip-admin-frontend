import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import addIcon from '../../../../assets/images/icons/add.svg';

function KeywordPlannerButton({
  handleClick,
}) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="keyword-planner-btn">
      <AppTooltip
        className="w-auto"
        placement="top"
        tooltipContent={t('board.addtoKeywordPlanner')}
        tooltipTrigger={
          <div>
            <Button
              variant="primary"
              className="px-2 py-1"
              onClick={handleClick}
            >
              <Image src={addIcon} />
            </Button>
          </div>
      }
      />
    </div>
  );
}

KeywordPlannerButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default KeywordPlannerButton;
