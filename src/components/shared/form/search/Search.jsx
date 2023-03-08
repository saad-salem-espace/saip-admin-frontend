import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Input from '../input/Input';
import style from './style.module.scss';
import Button from '../../button/Button';
// import UploadImage from '../../upload-image/UploadImage';
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
  handleUploadImg,
  searchWithImg,
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
        isClearable && <Button className={`${style.clearIcon} text-gray p-0`} variant="link" text={<FontAwesomeIcon icon={faTimes} />} onClick={clearInput} />
      }
      {
        searchWithImg && (
        <Button variant="transparent" className={`border-0 rounded-0 p-0 ${style.uploadIcon}`} text={<span className="icon-camera f-26 ps-4 border-start" />} onClick={() => handleUploadImg()} />
        )
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
  handleUploadImg: PropTypes.func,
  searchWithImg: PropTypes.bool,
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
  handleUploadImg: null,
  searchWithImg: false,
};

export default Search;
