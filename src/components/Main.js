import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from 'components/LandingPage';
import CategoryList from 'components/HomePage';
import ItemDetail from 'components/Item';
import RegisterPage from 'components/LandingPage/Register';
import { connect } from 'react-redux';

export class Main extends Component {
  render() {
    // Redirect to /categories if the URL does not match any route
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
      <Redirect key="redirect-category" to="/categories" />,
    ];
    // Redirect to /login if the URL does not match with any route and current actor is guest
    const guestRoutes = [
      <Route
        path="/signup"
        key="register"
        render={() => (
          <RegisterPage />
        )}
      />,
      <Route
        path="/login"
        key="login"
        render={() => (
          <LoginPage />
        )}
      />,
      <Redirect key="redirect-login" to="/login" />,
    ];
    if (this.props.user.loggedIn) {
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

function mapStateToProp(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProp, null)(Main);
