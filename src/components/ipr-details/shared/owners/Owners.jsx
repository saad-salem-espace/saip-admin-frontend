import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const Owners = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('ipr.owner.ownerName')}</th>
            <th>{t('ipr.countryCode')}</th>
            <th>{t('ipr.nationality')}</th>
            <th>{t('ipr.ownerDetails')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

Owners.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Owners;
