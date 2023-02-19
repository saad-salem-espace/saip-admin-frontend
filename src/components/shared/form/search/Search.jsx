import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
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

  return (
    <div className={`position-relative ${className} ${style[moduleClassName]}`}>
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
      <Button variant="link" text={<FontAwesomeIcon icon={faTimes} className={`${style['clear-icon']}`} />} onClick={() => setInputValue('')} />
      <Button
        variant="link"
        type="submit"
        onClick={onSubmit}
        text={<FontAwesomeIcon icon={faSearch} className={`${style['search-icon']}`} />}
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
