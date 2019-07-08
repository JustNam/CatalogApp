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
  const props = {
    category: {
      data: [
        {
          id: 0,
        },
      ],
    },
    getItemsInCategoryWithPagination: jest.fn(() => {}),
  };
  const wrapper = shallow(<NavigationBar {...props} />);
  wrapper.find('Link').simulate('click');
  expect(props.getItemsInCategoryWithPagination).toBeCalled();
});