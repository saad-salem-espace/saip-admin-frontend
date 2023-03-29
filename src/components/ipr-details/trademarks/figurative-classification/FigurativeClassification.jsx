import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const FigurativeClassification = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('trademarks.figurativeClassification.viennaCode')}</th>
            <th>{t('trademarks.figurativeClassification.description')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

FigurativeClassification.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FigurativeClassification;
