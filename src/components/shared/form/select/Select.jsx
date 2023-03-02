import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import './style.scss';
import selectStyle from './SelectStyle';

function Select({
  className,
  options,
  placeholder,
  optionName,
  optionValue,
  selectedOption,
  setSelectedOption,
}) {
  return (
    <div className={className}>
      <ReactSelect
        defaultValue={null}
        onChange={setSelectedOption}
        options={options}
        styles={selectStyle}
        getOptionLabel={optionName}
        getOptionValue={optionValue}
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
  optionName: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired,
  selectedOption: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setSelectedOption: PropTypes.func,
};
Select.defaultProps = {
  className: null,
  placeholder: '',
  selectedOption: {},
  setSelectedOption: () => {},
};
export default Select;
