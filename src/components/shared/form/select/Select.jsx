import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import './style.scss';
import selectStyle from './SelectStyle';

function Select({
  className,
  options,
  placeholder,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className={className}>
      <ReactSelect
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={selectStyle}
        placeholder={placeholder}
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
