import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { exportCSV } from 'utils/exports/exportSearchResults';
import PropTypes from 'prop-types';
import { executeAfterLimitValidation, LIMITS } from 'utils/manageLimits';
import LimitReached from 'components/shared/limit-reached/LimitReached';
import toastify from 'utils/toastify';
import useAuth from 'hooks/useAuth';
import useAxios from 'hooks/useAxios';
import exportDocumentsLoggerApi from 'apis/logs/exportDocumentsLoggerApi';

const ExportResults = ({ workstream, getSelectedItems, isValid }) => {
  const { t } = useTranslation('search', { keyPrefix: 'export' });
  const [reachedLimit, setReachedLimit] = useState(false);
  const { isAuthenticated } = useAuth();
  const [, excuteLogging] = useAxios(exportDocumentsLoggerApi({}), { manual: true, onError: 'custom' });

  const onServerError = () => {
    toastify(
      'error',
      <div>
        <p className="toastifyTitle">{t('error:serverErrors.server_error')}</p>
      </div>,
    );
  };

  const allowedTypes = [
    {
      type: '.csv',
      action: () => {
        const selectedItems = getSelectedItems();
        const currentCount = Number(localStorage.getItem(LIMITS.CSV_EXPORT_LIMIT)) || 0;
        const count = currentCount + selectedItems.length - 1;
        executeAfterLimitValidation({
          data: { workstreamId: workstream.id, code: LIMITS.CSV_EXPORT_LIMIT, count },
          onSuccess: () => {
            exportCSV(workstream.workstreamName, selectedItems, t(`workstreams.${workstream.workstreamName}`));
            localStorage.setItem(LIMITS.CSV_EXPORT_LIMIT, (count + 1).toString());
            if (isAuthenticated) {
              excuteLogging(exportDocumentsLoggerApi({
                workstreamId: workstream.id,
                type: 'csv',
                filingNumbers: selectedItems.map((item) => item.BibliographicData.FilingNumber),
              })).catch(() => {});
            }
          },
          onRichLimit: () => { setReachedLimit(true); },
          onFailure: onServerError,
        });
      },
    },
  ];

  return (
    <div className="export-results-wrapper">
      <Dropdown>
        <Dropdown.Toggle align="start" className="appBtn bg-primary-dark text-white" size="sm" disabled={!isValid}>
          <FiDownload className="fs-base me-2" />
          {t('title')}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {allowedTypes.map(({ action, type }) => (
            <Dropdown.Item onClick={action} disabled={!isValid}>
              {t('exportFileType', { fileType: type })}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <LimitReached setReachedLimit={setReachedLimit} reachedLimit={reachedLimit} />
    </div>
  );
};

ExportResults.propTypes = {
  workstream: PropTypes.shape({
    id: PropTypes.number.isRequired,
    workstreamName: PropTypes.string.isRequired,
  }).isRequired,
  getSelectedItems: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default ExportResults;
