import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CategoryList from './Home/CategoryList';
import ItemDetail from './Item/ItemDetail';
import NavigationBar from './Home/NavigationBar';
import LoginPage from './LandingPage/Login';
import RegisterPage from './LandingPage/Register';


class Main extends Component {
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
