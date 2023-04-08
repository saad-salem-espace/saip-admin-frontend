import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const Exhibitions = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('trademarks.exhibition.exhibitionName')}</th>
            <th>{t('trademarks.exhibition.exhibitionDate')}</th>
            <th>{t('trademarks.exhibition.exhibitionDetails')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

Exhibitions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Exhibitions;
