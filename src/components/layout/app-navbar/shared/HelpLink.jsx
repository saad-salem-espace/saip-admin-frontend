import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import AppModal from 'components/shared/app-modal/AppModal';
import UserManual from 'components/user-manual/UserManual';

function HelpLink() {
  const { t } = useTranslation('layout');
  return (
    <div className="help-link-wrapper">
      <AppModal
        modalHeader={
          <h4 className="app-text-primary-dark">
            <AiOutlineQuestionCircle className="icon me-5 app-text-primary fs-44" />
            {t('help:title')}
          </h4>
        }
        classNameModalHeader="border-0"
        variantTriggerBtn="link"
        classNameTriggerBtn="appBtn font-regular with-hover mx-auto"
        triggerContent={
          <AiOutlineQuestionCircle className="fs-22 app-text-primary-dark" />
        }
        className="user-manual"
        size="xl"
      >
        <UserManual />
      </AppModal>
    </div>
  );
}

export default HelpLink;
