import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import ItemList from 'components/HomePage/ItemList';
import NavigationBar from 'components/HomePage/NavigationBar';


class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 0,
    };
  }

  async componentDidMount() {
    // Load the data of default category
    await this.props.getCategories().then(() => {
      const { category } = this.props;
      const { id } = category.data[0];
      this.props.getItemsInCategoryWithPagination(id, 1);
      this.setState({ categoryId: id });
    });
  }

  getItems(e, categoryId) {
    // Get items in chosen category
    e.preventDefault();
    this.props.getItemsInCategoryWithPagination(categoryId, 1);
    this.setState({ categoryId });
  }

  render() {
    // category variable contains the general information about categories
    const { category } = this.props;
    const { categoryId } = this.state;
    return (
      <div>
        <NavigationBar />
        <div className="container page">
          <Tabs defaultTab="vertical-tab-0" vertical>
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
      </div>
    );
  }
}

export default CategoryList;
