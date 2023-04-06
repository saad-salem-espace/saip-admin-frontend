import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const PatentFamility = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('patent.publicationNumber')}</th>
            <th>{t('patent.publicationDate')}</th>
            <th>{t('patent.publicationTitle')}</th>
            <th>{t('patent.patentFamility.applicationNumber')}</th>
            <th>{t('patent.applicants')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

PatentFamility.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PatentFamility;
