import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import { ItemDetail } from 'components/Item/ItemDetail';
import { LoginPage } from 'components/LandingPage/Login';
import { RegisterPage } from 'components/LandingPage/Register';
import { Main } from 'components/Main';
import { CategoryList } from '../HomePage/CategoryList';

let pathMap = {};
describe('Main for guests', () => {
  const props = {
    user: {
      loggedIn: false,
    },
  };
  beforeAll(() => {
    const component = shallow(<Main {...props} />);
    pathMap = component.find(Route).reduce((accumulator, route) => {
      const routeProps = route.props();
      accumulator[routeProps.path] = routeProps.render().type;
      return accumulator;
    }, {});
  });
  let wrapper;
  it('It should render correctly', () => {
    wrapper = shallow(<Main {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('It should show components for guests', () => {
    expect(pathMap['/signup'].WrappedComponent).toBe(RegisterPage);
    expect(pathMap['/login'].WrappedComponent).toBe(LoginPage);
  });
});
describe('Main for users', () => {
  const props = {
    user: {
      loggedIn: true,
    },
  };
  const pathMap = {};
  beforeAll(() => {
    localStorage.setItem('accessToken', 'test');
    const component = shallow(<Main {...props} />);
    const routes = component.find(Route);
    routes.forEach((route, index) => {
      if (index !== routes.length) {
        const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.render().type;
      }
    });
  });
  let wrapper;
  it('It should render correctly', () => {
    wrapper = shallow(<Main {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('It should show components for guests', () => {
    expect(pathMap['/categories/:categoryId/items/:itemId'].WrappedComponent).toBe(ItemDetail);
    expect(pathMap['/categories'].WrappedComponent).toBe(CategoryList);
  });
});