import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import ItemList from './ItemList';

class CategoryList extends Component {
  state = { categoryId: 0 };

  getItems(e, categoryId) {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getItemsInCategory(categoryId);
    this.setState({ categoryId });
  }

  render() {
    // console
    const { category } = this.props;
    const { categoryId } = this.state;
    return (
      <div>
        <Tabs defaultTab="vertical-tab-one" vertical>
          <TabList>
            {category.data.map((category, index) => (
              <Tab
                tabFor={`vertical-tab-${index}`}
                key={category.id}
                onClick={e => this.getItems(e, category.id)}
              >
                <h3>{category.name}</h3>
              </Tab>
            ))}
            <br />
          </TabList>

          {category.data.map((category, index) => (
            <TabPanel tabId={`vertical-tab-${index}`} key={category.id}>
              {category.id === categoryId && <ItemList {...this.props} />}
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default CategoryList;
