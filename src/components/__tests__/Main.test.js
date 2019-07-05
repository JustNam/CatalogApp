import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import Main from '../Main';
import Register from '../LandingPage/Register';
import Login from '../LandingPage/Login';
import ItemDetail from '../Item/ItemDetail';
import CategoryList from '../HomePage/CategoryList';

let pathMap = {};
describe('Main for guests', () => {
  beforeAll(() => {
    const component = shallow(<Main />);
    pathMap = component.find(Route).reduce((accumulator, route) => {
      const routeProps = route.props();
      accumulator[routeProps.path] = routeProps.render().type;
      return accumulator;
    }, {});
  });
  let wrapper;
  it('It should render correctly', () => {
    wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });
  it('It should show components for guests', () => {
    expect(pathMap['/signup']).toBe(Register);
    expect(pathMap['/login']).toBe(Login);
  });
});
describe('Main for users', () => {
  const pathMap = {};
  beforeAll(() => {
    localStorage.setItem('accessToken', 'test');
    const component = shallow(<Main />);
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
    wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });
  it('It should show components for guests', () => {
    expect(pathMap['/categories/:categoryId/items/:itemId']).toBe(ItemDetail);
    expect(pathMap['/categories']).toBe(CategoryList);
  });
});