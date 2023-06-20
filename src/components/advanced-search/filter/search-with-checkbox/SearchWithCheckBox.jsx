import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Badge from 'components/shared/badge/Badge';
import PropTypes from 'prop-types';
import { IoIosSearch } from 'react-icons/io';
import './SearchWithCheckBox.scss';
import Checkbox from 'components/shared/form/checkboxes/checkbox/Checkbox';

const SearchWithCheckBox = ({ name, options, filter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = (myoptions) => (
    myoptions.filter((option) => option.label.includes(searchTerm))
  );

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
        {filterOptions(options).map((option) => (
          <div className="d-flex justify-content-between mb-2" key={option.value}>
            <Checkbox
              labelClassName="d-flex align-items-center flex-row-reverse gap-2 option-label text-gray-700 font-regular"
              name={`selectedFilters.${filter.strId}.${option.value}`}
              fieldFor={`selectedFilters.${filter.strId}.${option.value}`}
              text={option.label}
            />
            <Badge
              className="app-bg-primary-10 app-text-primary"
              text={option?.count}
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
  filter: PropTypes.instanceOf(Object).isRequired,
};

export default SearchWithCheckBox;
