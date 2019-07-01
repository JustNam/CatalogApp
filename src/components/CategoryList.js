import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import ItemList from './ItemList';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: false,
      categoryId: 0,
    };
  }

  componentDidMount() {
    this.props.getCategories();
  }

  getItems(e, categoryId) {
    e.preventDefault();
    this.setState({
      categorySelected: true,
    });
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getItemsInCategory(categoryId);
    this.setState({ categoryId });
  }

  render() {
    // console
    const { category } = this.props;
    const { categoryId, categorySelected } = this.state;
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
          {!categorySelected && (
            <div className="welcome">
              Lets's explore our catalog!
              <br />
              Choose a category.
            </div>
          )}
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
