import PropTypes from 'prop-types';
import BootstrapCarousel from 'react-bootstrap/Carousel';

function ItemThumb({
  children,
}) {
  return (
    <>
      {/*
        for some reason when the BootstrapCarousel structure separated into two files
        the carousel-item with active state not work
      */}
      <BootstrapCarousel.Item>
        <div className="d-flex carousel-thumbnails">
          { children }
        </div>
      </BootstrapCarousel.Item>
    </>
  );
}

ItemThumb.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ItemThumb;
