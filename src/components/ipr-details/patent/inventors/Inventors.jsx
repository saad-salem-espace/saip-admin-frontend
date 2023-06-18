import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const Inventors = ({ children }) => {
  const { t } = useTranslation('search');
  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('patent.inventors.inventorName')}</th>
            <th>{t('ipr.countryCode')}</th>
            <th>{t('ipr.nationality')}</th>
            <th>{t('patent.inventors.inventorDetails')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

Inventors.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Inventors;
