import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import '../../../../assets/styles/common/table.scss';
import PropTypes from 'prop-types';

const Applicants = ({ children }) => {
  const { t } = useTranslation('search');

  return (
    <div className="table-responsive shadow">
      <Table className="appTable">
        <thead>
          <tr className="text-uppercase">
            <th>{t('ipr.applicant.applicantName')}</th>
            <th>{t('ipr.countryCode')}</th>
            <th>{t('ipr.nationality')}</th>
            <th>{t('ipr.applicantDetails')}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  );
};

Applicants.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Applicants;
