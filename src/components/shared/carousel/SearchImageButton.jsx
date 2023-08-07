import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import routes from 'components/routes/routes.json';
import { useNavigate, createSearchParams } from 'react-router-dom';
import searchImg from '../../../assets/images/icons/search-image.svg';

function SearchImageButton({ imgSrc }) {
  const navigate = useNavigate();
  const variableRegex = /.*\/attachments\/(.*)\/image\/(.*)\/(.*)/;
  const [, workstreamId, docId, fileName] = imgSrc.match(variableRegex);
  const searchByImage = () => {
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
      variant="transparent"
      className="border-0 icon"
      onClick={() => { searchByImage(); }}
    >
      <Image
        src={searchImg}
        className="fs-base"
      />
    </Button>
  );
}
SearchImageButton.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};

export default SearchImageButton;
