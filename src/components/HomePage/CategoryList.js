import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import ItemList from 'components/HomePage/ItemList';
import NavigationBar from 'components/HomePage/NavigationBar';
import { getItemsInCategoryWithPagination } from 'actions/item';
import { getCategories } from 'actions/category';

export class CategoryList extends Component {
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
      let id = parseInt(localStorage.getItem('categoryId'));
      if (!id) {
        id = category.data[0].id;
      }
      this.props.getItemsInCategoryWithPagination(id, 1);
      this.setState({ categoryId: id });
    });
  }

  getItems(e, categoryId) {
    // Get items in chosen category
    e.preventDefault();
    localStorage.setItem('categoryId', categoryId);
    this.props.getItemsInCategoryWithPagination(categoryId, 1);
    this.setState({ categoryId });
  }

  render() {
    // category variable contains the general information about categories
    const { category } = this.props;
    if (category.data.length === 0) {
      return (
        <div>
          <NavigationBar />
          <div className="container page welcome">
            There is no category here. We will update soon!
          </div>
        </div>
      );
    }
    const { categoryId } = this.state;
    return (
      <div>
        <NavigationBar />
        <div className="container page">
          <Tabs defaultTab={`vertical-tab-${categoryId}`} vertical>
            <TabList>
              {category.data.map(category => (
                <Tab
                  tabFor={`vertical-tab-${category.id}`}
                  key={category.id}
                  onClick={e => this.getItems(e, category.id)}
                >
                  <h3>{category.name}</h3>
                </Tab>
              ))}
              <br />
            </TabList>
            {category.data.map(category => (
              <TabPanel tabId={`vertical-tab-${category.id}`} key={category.id}>
                {category.id === categoryId && <ItemList getItems={this.getItems} />}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    category: state.category,
    item: state.item,
  };
}

const mapDispatchToProp = {
  getItemsInCategoryWithPagination,
  getCategories,
};


export default connect(mapStateToProp, mapDispatchToProp)(CategoryList);