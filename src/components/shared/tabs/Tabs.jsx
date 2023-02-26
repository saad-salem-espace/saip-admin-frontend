import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import tabsStyle from './tabs.module.scss';

function Tabs({
  tabsItems,
  activeKey,
  handleActiveTab,
}) {
  return (
    <div>
      <div className={`${tabsStyle.tabs}`}>
        {
        tabsItems.map((item) => (
          <Button
            className={`${tabsStyle.tab} ${activeKey === item.id ? tabsStyle.active : ''}`}
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
          <div>
            {
              i.id === activeKey && (
              <div>
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
};

Tabs.defaultProps = {
  handleActiveTab: () => {},
};

export default Tabs;
