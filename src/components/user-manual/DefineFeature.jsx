import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function DefineFeature({ data, onButtonClick }) {
  return (
    <>
      {data.map((item, index) => (
        <Button
          key={item.id}
          variant="light"
          onClick={() => onButtonClick(index)}
          className={`${item.active ? 'active' : ''} appBtn bg-white shadow text-start d-block mt-4 text-break`}
        >
          {item.title}
          <p className="tags d-flex mb-0 mt-1">
            <span className="text-gray-600 font-regular fs-sm">
              {item.tags}
            </span>
          </p>
        </Button>
      ))}
    </>
  );
}

DefineFeature.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      pdfLink: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default DefineFeature;
