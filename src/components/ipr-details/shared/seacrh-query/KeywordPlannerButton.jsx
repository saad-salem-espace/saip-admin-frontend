import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import addIcon from '../../../../assets/images/icons/add.svg';

function KeywordPlannerButton({
  ShowSearchQueryMenu,
}) {
  const { t } = useTranslation('dashboard');

  return (
    <AppTooltip
      className="w-auto"
      placement="top"
      tooltipContent={t('board.addtoKeywordPlanner')}
      tooltipTrigger={
        <div>
          <Button
            variant="primary"
            className="px-2 py-1"
            onClick={() => ShowSearchQueryMenu()}
          >
            <Image src={addIcon} />
          </Button>
        </div>
      }
    />
  );
}

KeywordPlannerButton.propTypes = {
  ShowSearchQueryMenu: PropTypes.func.isRequired,
};

export default KeywordPlannerButton;
