import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const Citations = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('patent.citation.type')}</th>
            <th>{t('patent.citation.citationOrigin')}</th>
            <th>{t('patent.publicationNumber')}</th>
            <th>{t('patent.publicationDate')}</th>
            <th>{t('patent.publicationTitle')}</th>
            <th>{t('patent.applicants')}</th>
            <th>{t('patent.citation.earliestPriorityDate')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

Citations.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Citations;
