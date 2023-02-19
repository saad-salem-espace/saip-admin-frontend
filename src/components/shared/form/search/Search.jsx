import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import classNames from 'classnames/bind';
import Input from '../input/Input';
import style from './style.module.scss';
import Button from '../../button/Button';

function Search({
  id,
  name,
  className,
  children,
  placeholder,
  onSubmit,
  moduleClassName,
}) {
  const [inputValue, setInputValue] = useState('');

  const styleClassNames = classNames.bind(style);
  const searchClassName = styleClassNames(moduleClassName);
  return (
    <div className={`position-relative ${className} ${searchClassName}`}>
      {/* please render the below children if the input has value */}
      {children}
      <Input
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        setInputValue={setInputValue}
      />
      <Button className={`${style.clearIcon} text-gray`} variant="link" text={<FontAwesomeIcon icon={faTimes} />} onClick={() => setInputValue('')} />
      <Button
        variant="link"
        type="submit"
        onClick={onSubmit}
        className={`${style.searchIcon}`}
        text={<FontAwesomeIcon icon={faSearch} />}
      />
    </div>
  );
}

Search.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  moduleClassName: PropTypes.string,
};

Search.defaultProps = {
  name: null,
  className: null,
  children: null,
  placeholder: null,
  moduleClassName: null,
};

export default Search;
