import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getCategories } from 'actions/category';
import { login, signUp } from 'actions/user';
import {
  getItemsInCategory,
  getItemInCategory,
  createItemInCategory,
  deleteItemInCategory,
  getItemsInCategoryWithPagination,
} from 'actions/item';
import Main from './Main';

function mapStateToProp(state) {
  return {
    category: state.category,
    item: state.item,
  };
}

const mapDispatchToProp = {
  getItemsInCategoryWithPagination,
  getCategories,
  getItemsInCategory,
  getItemInCategory,
  createItemInCategory,
  deleteItemInCategory,
  login,
  signUp,
};

const App = withRouter(
  connect(
    mapStateToProp,
    mapDispatchToProp
  )(Main)
);
export default App;
