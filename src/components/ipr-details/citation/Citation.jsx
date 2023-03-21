import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const Citation = ({ children }) => {
  const { t } = useTranslation('citaion');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('citationOrigin')}</th>
            <th>{t('publication')}</th>
            <th>{t('title')}</th>
            <th>{t('earliestPriorityDate')}</th>
            <th>{t('publicationDate')}</th>
            <th>{t('applicants')}</th>
            <th>{t('ipc')}</th>
            <th>{t('cpc')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

Citation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Citation;
