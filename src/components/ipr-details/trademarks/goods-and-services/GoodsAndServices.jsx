import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const GoodsAndServices = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('trademarks.goodsServices.niceClassification')}</th>
            <th>{t('trademarks.goodsServices.goodsServices')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

GoodsAndServices.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GoodsAndServices;
