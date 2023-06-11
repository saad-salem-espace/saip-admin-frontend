import getLimitApi from 'apis/limits/getLimitApi';

const LIMITS = {
  BOOKMARKS_LIMIT: 'bookmarks_limit',
  DOWNLOAD_LIMIT: 'download_limit',
  SAVED_QUERY_LIMIT: 'saved_query_limit',
  SEARCH_HISTORY_LIMIT: 'search_history_limit',
  CSV_EXPORT_LIMIT: 'csv_export_limit',
};

const executeAfterLimitValidation = ({
  data, onSuccess, onRichLimit, onFailure,
}) => {
  getLimitApi(data).then((response) => {
    const limitValue = response.data?.data?.[0]?.limitValue || 0;
    if (data.count < limitValue) onSuccess();
    else onRichLimit(limitValue);
  }).catch(onFailure);
};

export { LIMITS, executeAfterLimitValidation };
