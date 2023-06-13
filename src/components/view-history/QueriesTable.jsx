import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const QueriesTable = ({
  children,
}) => {
  const { t } = useTranslation('queries');
  return (
    <div className="table-responsive shadow mb-8">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('query')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};
QueriesTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QueriesTable;
