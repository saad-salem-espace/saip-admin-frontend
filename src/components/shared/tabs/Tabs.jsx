import Button from 'react-bootstrap/Button';
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

export default Tabs;
