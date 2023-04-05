import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const Priorities = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('trademarks.priorities.priorityDate')}</th>
            <th>{t('trademarks.priorities.priorityNumber')}</th>
            <th>{t('trademarks.priorities.priorityCountry')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

Priorities.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Priorities;
