import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import DatePicker from 'components/shared/date-picker/AppDatePicker';
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
  disabled,
  type,
  onChangeDate,
  imageSearch,
}) {
  const styleClassNames = classNames.bind(style);
  const searchClassName = styleClassNames(moduleClassName);
  const dataTypes = new Map();
  const dateField = () => <DatePicker className="datePickerWrapper" name={name} onChangeDate={onChangeDate} />;

  const textField = () => (
    <Input
      id={id}
      type="text"
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      imageSearch={imageSearch}
      className={`${disabled ? 'search-disabled' : ''}`}
    />
  );

  dataTypes.set('Text', textField);
  dataTypes.set('Number', textField);
  dataTypes.set('LKP', textField);
  dataTypes.set('Date', dateField);

  const getInputField = useMemo(() => dataTypes.get(type)(), [type, imageSearch,
    disabled, placeholder]);

  return (
    <div className={`position-relative ${className} ${searchClassName}`}>
      {/* please render the below children if the input has value */}
      {children}
      {
        getInputField
      }
      {
        isClearable && <Button className={`${style.clearIcon} resetSearch text-gray p-0`} variant="link" text={<FontAwesomeIcon icon={faTimes} />} onClick={clearInput} />
      }
      {
        false && searchWithImg && (
        <Button variant="transparent" className={`border-0 rounded-0 p-0 ${style.uploadIcon}`} text={<span className="icon-camera f-26 ps-4 border-start colored" />} onClick={() => handleUploadImg()} />
        )
      }
      <Button
        type="submit"
        {...(onSubmit && { onClick: onSubmit })}
        className={`${style.searchIcon}`}
        text={<FontAwesomeIcon icon={faSearch} />}
        data-testid="submit-simple-search"
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
  onChangeDate: PropTypes.func,
  searchWithImg: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  imageSearch: PropTypes.bool,
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
  disabled: false,
  type: 'Text',
  onChangeDate: null,
  imageSearch: false,
};

export default Search;
