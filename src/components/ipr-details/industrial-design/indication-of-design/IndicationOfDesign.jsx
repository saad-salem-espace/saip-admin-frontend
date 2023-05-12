import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const IndicationOfDesign = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('industrialDesign.locarnoClassification')}</th>
            <th>{t('industrialDesign.description')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

IndicationOfDesign.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IndicationOfDesign;
