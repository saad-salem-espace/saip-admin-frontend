import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  isClearable,
  clearInput,
}) {
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
      />
      {
        isClearable && <Button className={`${style.clearIcon} text-gray`} variant="link" text={<FontAwesomeIcon icon={faTimes} />} onClick={clearInput} />
      }
      <Button
        type="submit"
        {...(onSubmit && { onClick: onSubmit })}
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
  onSubmit: PropTypes.func,
  moduleClassName: PropTypes.string,
  isClearable: PropTypes.bool,
  clearInput: PropTypes.func,
};

Search.defaultProps = {
  name: null,
  className: null,
  children: null,
  placeholder: null,
  moduleClassName: null,
  isClearable: false,
  onSubmit: null,
  clearInput: () => {},
};

export default Search;
