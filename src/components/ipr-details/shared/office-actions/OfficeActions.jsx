import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const OfficeActions = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('trademarks.officeActions.officeAction')}</th>
            <th>{t('trademarks.officeActions.dateTime')}</th>
            <th>{t('trademarks.officeActions.examinerName')}</th>
            <th>{t('trademarks.officeActions.examinerDetails')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

OfficeActions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OfficeActions;
