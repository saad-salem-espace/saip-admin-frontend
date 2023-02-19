import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import './style.scss';
import selectStyle from './SelectStyle';

function Select({
  className,
  options,
  placeholder,
  optionName,
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
};
Select.defaultProps = {
  className: null,
  placeholder: '',
};
export default Select;
