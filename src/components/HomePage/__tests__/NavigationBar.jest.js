import React from 'react';
import { shallow } from 'enzyme';
import { NavigationBar } from '../NavigationBar';

it('It should render correctly', () => {
  const wrapper = shallow(<NavigationBar />);
  expect(wrapper).toMatchSnapshot();
});

it('It should render with correct content', () => {
  const wrapper = shallow(<NavigationBar />);
  expect(wrapper.find('DropdownItem').text()).toContain('Log out');
});

it('It should delete all data saved in localStorage', () => {
  localStorage.setItem('accessToken', 'test');
  localStorage.setItem('username', 'test');
  localStorage.setItem('userId', 1);

  const historyMock = { push: jest.fn() };
  const wrapper = shallow(<NavigationBar history={historyMock} />);
  wrapper.find('DropdownItem').simulate('click');
  expect(localStorage.getItem('accessToken')).toBe(null);
  expect(localStorage.getItem('username')).toBe(null);
  expect(localStorage.getItem('userId')).toBe(null);
});