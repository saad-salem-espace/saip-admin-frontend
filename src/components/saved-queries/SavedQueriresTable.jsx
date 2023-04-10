import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const SavedQueriresTable = ({ children }) => {
  const { t } = useTranslation('queries');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('query')}</th>
            <th>{t('date')}</th>
            <th>{t('resultsFound')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

SavedQueriresTable.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SavedQueriresTable;
