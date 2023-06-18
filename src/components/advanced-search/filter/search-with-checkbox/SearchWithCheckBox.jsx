import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Badge from 'components/shared/badge/Badge';
import PropTypes from 'prop-types';
import { IoIosSearch } from 'react-icons/io';
import './SearchWithCheckBox.scss';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';

const SearchWithCheckBox = ({ name, options, count }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const filtered = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleCheckboxChange = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter((value) => value !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };

  return (
    <div>
      <div className="position-relative filter-search">
        <InputGroup>
          <Form.Control
            type="text"
            className="col-12 mb-4"
            placeholder={`Search ${name}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoIosSearch className="icon position-absolute" />
        </InputGroup>
      </div>
      <div>
        {filteredOptions.map((option) => (
          <div className="d-flex justify-content-between mb-2" key={option.value}>
            {/* <Form.Check
              id={option.value}
              type="checkbox"
              className="d-flex align-items-center gap-2"
              label={
                <>
                  <span className="option-label text-gray-700 font-regular">{option.label}</span>
                  {' '}
                </>
              }
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            /> */}
            <Checkbox
              checked
              labelClassName="d-flex align-items-center flex-row-reverse gap-2 option-label text-gray-700 font-regular"
              text={option.label}
              fieldFor={option.value}
              onChange={() => handleCheckboxChange(option.value)}
            />
            <Badge
              className="app-bg-primary-10 app-text-primary"
              text={count && selectedOptions.filter((value) => value === option.value).length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

SearchWithCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  count: PropTypes.bool,
};

SearchWithCheckBox.defaultProps = {
  count: false,
};

export default SearchWithCheckBox;
