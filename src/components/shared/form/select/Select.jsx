import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
// import style from './style.module.scss';

function Select({
  className,
  options,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className={className}>
      <ReactSelect
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};
Select.defaultProps = {
  className: null,
};
export default Select;
