import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import './style.scss';
import selectStyle from './SelectStyle';

function Select({
  className,
  options,
  placeholder,
  getOptionName,
  getOptionValue,
  selectedOption,
  setSelectedOption,
  defaultValue,
}) {
  return (
    <div className={className}>
      <ReactSelect
        defaultValue={defaultValue}
        onChange={setSelectedOption}
        options={options}
        styles={selectStyle}
        getOptionLabel={getOptionName}
        getOptionValue={getOptionValue}
        placeholder={placeholder}
        value={selectedOption}
      />
    </div>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  placeholder: PropTypes.string,
  getOptionName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  getOptionValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  selectedOption: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setSelectedOption: PropTypes.func,
  defaultValue: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
Select.defaultProps = {
  className: null,
  placeholder: '',
  selectedOption: {},
  setSelectedOption: () => {},
  defaultValue: null,
};
export default Select;
