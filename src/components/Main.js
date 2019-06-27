import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CategoryList from './CategoryList';
import ItemDetail from './ItemDetail';

class Main extends Component {
  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <h1>
                <a className="navbar-brand" href="/categories">
                  catalog app
                </a>
              </h1>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sign up
              </a>
            </li>
          </ul>
        </nav>
        <div className="container page">
          <Route
            exact
            path="/categories/:categoryId/items/:itemId"
            render={params => <ItemDetail {...this.props} {...params} />}
          />
          <Route exact path="/categories" render={() => <CategoryList {...this.props} />} />
        </div>
      </div>
    );
  }
}

export default Main;
