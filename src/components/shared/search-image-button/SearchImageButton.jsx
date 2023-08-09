import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import routes from 'components/routes/routes.json';
import { useNavigate, createSearchParams } from 'react-router-dom';
import searchImg from '../../../assets/images/icons/search-image.svg';

function SearchImageButton({
  imgSrc, btnClass, btnSize, btnVariant, children,
  setActiveDocument,
}) {
  const navigate = useNavigate();
  const variableRegex = /.*\/attachments\/(.*)\/image\/(.*)\/(.*)/;
  const [, workstreamId, docId, fileName] = imgSrc.match(variableRegex);
  const searchByImage = () => {
    setActiveDocument(null);
    navigate({
      pathname: routes.search,
      search: `?${createSearchParams({
        workstreamId,
        imageName: fileName,
        docImage: docId,
        sort: 'mostRelevant',
        page: '1',
        q: '',
      })}`,
    });
  };

  return (
    <Button
      variant={btnVariant}
      className={btnClass}
      size={btnSize}
      onClick={() => { searchByImage(); }}
    >
      {
         children || (<Image src={searchImg} className="fs-base" />)
      }
    </Button>
  );
}
SearchImageButton.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  children: PropTypes.node,
  btnClass: PropTypes.string,
  btnSize: PropTypes.string,
  setActiveDocument: PropTypes.func.isRequired,
  btnVariant: PropTypes.string,
};

SearchImageButton.defaultProps = {
  children: null,
  btnClass: 'border-0 icon',
  btnSize: '',
  btnVariant: 'transparent',
};

export default SearchImageButton;
