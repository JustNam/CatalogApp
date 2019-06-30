import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Main from './Main';
import { getCategories } from '../actions/category';
import {
  getItemsInCategory,
  getItemInCategory,
  createItemInCategory,
} from '../actions/item';

function mapStateToProp(state) {
  return {
    category: state.category,
    item: state.item,
  };
}

const mapDispatchToProp = {
  getCategories,
  getItemsInCategory,
  getItemInCategory,
  createItemInCategory,
};

const App = withRouter(
  connect(
    mapStateToProp,
    mapDispatchToProp
  )(Main)
);
export default App;
