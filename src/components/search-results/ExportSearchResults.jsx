import { useFormikContext } from 'formik';
import { search } from 'utils/arrays';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ExportResults from '../exports/ExportResults';
import Checkbox from '../shared/form/checkboxes/checkbox/Checkbox';

const ExportSearchResults = ({ workstreams, workstreamId, data }) => {
  const { t } = useTranslation('search');
  const { isValid, values, setFieldValue } = useFormikContext();
  const selectedLength = useMemo(
    () => (Object.values(values.selectedCards).filter(Boolean).length),
    [values.selectedCards],
  );
  const clearSelection = () => {
    setFieldValue('selectedCards', {});
  };

  const selectAll = () => {
    const selectedKeys = data.reduce((acc, curr) => (
      Object.assign(acc, { [curr.BibliographicData.FilingNumber]: true })
    ), {});
    setFieldValue('selectedCards', selectedKeys);
  };

  useEffect(clearSelection, [data]);

  useEffect(() => {
    if (selectedLength === data.length && !values.allSelected && selectedLength > 0) {
      setFieldValue('allSelected', true);
    } else if (selectedLength !== data.length && values.allSelected) {
      setFieldValue('allSelected', false);
    }
  }, [selectedLength]);

  useEffect(() => {
    if (values.allSelected && selectedLength !== data.length) {
      selectAll();
    } else if (!values.allSelected && selectedLength === data.length) {
      clearSelection();
    }
  }, [values.allSelected]);

  const getSelectedItems = useCallback(() => {
    const selectedIds = Object.entries(values.selectedCards)
      .filter(([, val]) => val === true).map(([key]) => key);
    return data.filter(
      (item) => (selectedIds.includes(item.BibliographicData.FilingNumber)
      ),
    );
  }, [selectedLength]);

  return (
    <div>
      <div className="position-relative mb-8 d-flex align-items-end h-px-63 ms-5">
        <ExportResults
          workstream={search(workstreams.data, 'id', Number(workstreamId))}
          getSelectedItems={getSelectedItems}
          isValid={isValid}
        />
      </div>
      <div className="d-flex">
        <Checkbox name="allSelected" fieldFor="allSelected" text={t('selectedItems', { count: selectedLength })} />
      </div>
    </div>
  );
};

ExportSearchResults.propTypes = {
  workstreams: PropTypes.instanceOf(Object).isRequired,
  workstreamId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.arrayOf(Object),
};

ExportSearchResults.defaultProps = {
  data: [],
};

export default ExportSearchResults;
