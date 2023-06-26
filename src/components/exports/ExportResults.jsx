import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useCallback, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { exportCsv, exportXlsx } from 'utils/exports';
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

  const getExportsCounter = useCallback(() => {
    try {
      const currentExportsCount = JSON.parse(localStorage.getItem(LIMITS.CSV_EXPORT_LIMIT));
      if (typeof currentExportsCount === 'object' && currentExportsCount !== null && !Array.isArray(currentExportsCount)) {
        return currentExportsCount;
      }
    } catch (e) { /* empty */ }
    return {};
  }, []);

  const onServerError = () => {
    toastify(
      'error',
      <div>
        <p className="toastifyTitle">{t('error:serverErrors.server_error')}</p>
      </div>,
    );
  };

  const commonExport = useCallback((executor) => () => {
    const selectedItems = getSelectedItems();
    const currentCounter = getExportsCounter();
    const count = (currentCounter[workstream.workstreamName] || 0) + selectedItems.length - 1;

    const runExport = () => {
      executor(workstream.workstreamName, selectedItems, t(`workstreams.${workstream.workstreamName}`));

      if (isAuthenticated) {
        excuteLogging(exportDocumentsLoggerApi({
          workstreamId: workstream.id,
          type: 'csv',
          filingNumbers: selectedItems.map((item) => item.BibliographicData.FilingNumber),
        })).catch(() => {});
      } else {
        currentCounter[workstream.workstreamName] = count + 1;
        localStorage.setItem(LIMITS.CSV_EXPORT_LIMIT, JSON.stringify(currentCounter));
      }
    };

    if (isAuthenticated) {
      runExport();
      return;
    }

    executeAfterLimitValidation({
      data: { workstreamId: workstream.id, code: LIMITS.CSV_EXPORT_LIMIT, count },
      onSuccess: runExport,
      onRichLimit: () => { setReachedLimit(true); },
      onFailure: onServerError,
    });
  }, [workstream, getSelectedItems]);

  const allowedTypes = [
    { type: '.csv', action: commonExport(exportCsv) },
    { type: '.xlsx', action: commonExport(exportXlsx) },
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
