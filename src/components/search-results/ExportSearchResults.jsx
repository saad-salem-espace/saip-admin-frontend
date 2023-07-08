import { useFormikContext } from 'formik';
import { search } from 'utils/arrays';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ExportResults from '../exports/ExportResults';
import Checkbox from '../shared/form/checkboxes/checkbox/Checkbox';

const ExportSearchResults = ({
  workstreams, workstreamId, data, withCheckbox, setSelectedItemsCount,
}) => {
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
    setSelectedItemsCount(selectedLength);
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
    <div className="d-flex justify-content-between flex-row-reverse align-items-center">
      <div className="position-relative mb-8 d-flex align-items-end h-px-63 ms-5">
        <ExportResults
          workstream={search(workstreams.data, 'id', Number(workstreamId))}
          getSelectedItems={getSelectedItems}
          isValid={isValid}
        />
      </div>
      { withCheckbox && (
        <Checkbox name="allSelected" labelClassName="d-flex justify-content-end flex-row-reverse ms-1 mb-5 gap-3 font-medium text-gray-700" fieldFor="allSelected" text={t('selectedItems', { count: selectedLength })} />
      )}
    </div>
  );
};

ExportSearchResults.propTypes = {
  workstreams: PropTypes.instanceOf(Object).isRequired,
  workstreamId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.arrayOf(Object),
  withCheckbox: PropTypes.bool,
  setSelectedItemsCount: PropTypes.func,
};

ExportSearchResults.defaultProps = {
  data: [],
  withCheckbox: true,
  setSelectedItemsCount: () => {},
};

export default ExportSearchResults;
