import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CategoryList from './CategoryList';
import ItemDetail from './ItemDetail';
import NavigationBar from './NavigationBar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';


class Main extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div>
        <Route
          path="/signup"
          render={() => (
            <RegisterPage {...this.props} />
          )}
        />
        <Route
          path="/login"
          render={() => (
            <LoginPage {...this.props} />
          )}
        />

        <Route
          path="/categories"
          render={() => (
            <NavigationBar />
          )}
        />

        <div className="container page">
          <Route
            exact
            path="/categories/:categoryId/items/:itemId"
            render={params => <ItemDetail {...this.props} {...params} />}
          />
          <Route
            exact
            path="/categories"
            render={() => <CategoryList {...this.props} />}
          />
        </div>
      </div>
    );
  }
}

export default Main;
