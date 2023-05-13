import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const LocarnoClassification = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('industrialDesign.locarnoClassification')}</th>
            <th>{t('industrialDesign.indicationDesign')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

LocarnoClassification.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocarnoClassification;
