import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CategoryList from './HomePage/CategoryList';
import ItemDetail from './Item/ItemDetail';
import LoginPage from './LandingPage/Login';
import RegisterPage from './LandingPage/Register';
import NotFound from './LandingPage/NotFound';

class Main extends Component {
  render() {
    const userRoutes = [
      <Route
        exact
        key="item-detail"
        path="/categories/:categoryId/items/:itemId"
        render={params => <ItemDetail {...this.props} {...params} />}
      />,
      <Route
        exact
        key="category-list"
        path="/categories"
        render={() => <CategoryList {...this.props} />}
      />,
      <Route key="not-found" component={NotFound} />,
    ];
    const guestRoutes = [
      <Route
        path="/signup"
        key="register"
        render={() => (
          <RegisterPage {...this.props} />
        )}
      />,
      <Route
        path="/login"
        key="login"
        render={() => (
          <LoginPage {...this.props} />
        )}
      />,
      <Redirect key="redirect-login" to="/login" />,
    ];
    if (localStorage.getItem('accessToken')) {
      return (
        <Switch>
          {userRoutes}
        </Switch>
      );
    }
    return (
      <Switch>
        {guestRoutes}
      </Switch>
    );
  }
}

export default Main;
