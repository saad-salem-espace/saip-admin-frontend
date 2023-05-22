import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';
import SavedQueryRow from './SavedQueryRow';

const SavedQueriesTable = ({ data, selectedWorkStream, updateIprModal }) => {
  const { t } = useTranslation('queries');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('query')}</th>
            <th>{t('date')}</th>
            <th>{t('resultsFound')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((query) => (
              <SavedQueryRow
                query={query}
                selectedWorkStream={selectedWorkStream}
                updateIprModal={updateIprModal}
              />
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};

SavedQueriesTable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  selectedWorkStream: PropTypes.number.isRequired,
  updateIprModal: PropTypes.func,
};

SavedQueriesTable.defaultProps = {
  updateIprModal: () => { },
};

export default SavedQueriesTable;
