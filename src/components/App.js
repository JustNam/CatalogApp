import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Main from './Main';
import { getCategories } from '../actions/category';
import { getItemsInCategory, getItemInCategory } from '../actions/item';

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
};

const App = withRouter(
  connect(
    mapStateToProp,
    mapDispatchToProp,
  )(Main),
);
export default App;
