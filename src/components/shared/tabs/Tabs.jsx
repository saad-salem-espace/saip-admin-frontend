import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './tabs.scss';

function Tabs({
  tabsItems,
  activeKey,
  handleActiveTab,
  className,
  tabClass,
}) {
  return (
    <div>
      <div className={`tabs ${className}`}>
        {
        tabsItems.map((item) => (
          <Button
            className={` ${activeKey === item.id ? 'active' : ''}`}
            onClick={() => handleActiveTab(item.id)}
            key={item.id}
          >
            {item.title}
          </Button>
        ))
      }
      </div>
      {
        tabsItems.map((i) => (
          <div className="tabs-content-wrapper">
            {
              i.id === activeKey && (
              <div className={`${tabClass} tab-content-wrapper`}>
                {i.content}
              </div>
              )
            }
          </div>
        ))
      }
    </div>
  );
}

Tabs.propTypes = {
  tabsItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  activeKey: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  handleActiveTab: PropTypes.func,
  className: PropTypes.string,
  tabClass: PropTypes.string,
};

Tabs.defaultProps = {
  handleActiveTab: () => {},
  className: '',
  tabClass: '',
};

export default Tabs;
