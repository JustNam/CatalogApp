import React from 'react';
import { shallow } from 'enzyme';
import ItemList from '../ItemList';
import { item, category, itemWithEmptyCategory } from '../../../utilities/sampleData';

describe('ItemList with full items', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      categoryId: 1,
      category,
      getItemsInCategoryWithPagination: jest.fn(() => Promise.resolve()),
      getCategories: jest.fn(() => Promise.resolve()),
      item,
    };
  };
  it('It should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  beforeEach(() => {
    setup();
    wrapper = shallow(<ItemList {...props} />);
    instance = wrapper.instance();
  });
  it('It should show a CreateItemModal', () => {
    wrapper.find('button[id="createButton"]').simulate('click');
    expect(wrapper.state().showInfoModal).toEqual(true);
  });
  it('It should close CreateItemModal when handleInfoClose is called', () => {
    instance.handleInfoClose();
    expect(wrapper.state().showInfoModal).toEqual(false);
  });
  it('It should open SuccessModal when handleSuccessShow is called', () => {
    instance.handleSuccessShow();
    expect(wrapper.state().showSuccessModal).toEqual(true);
  });
  it('It should close SuccessModal when handleSuccessClose is called', () => {
    instance.handleSuccessClose();
    expect(wrapper.state().showInfoModal).toEqual(false);
  });
  it('It should change page when one of buttons in pagination pane is clicked', () => {
    wrapper.find('PageItem[id=2]').simulate('click');
    expect(props.getItemsInCategoryWithPagination).toBeCalled();
  });
});


describe('ItemList with shortage items', () => {
  let wrapper;
  let props;
  const setup = () => {
    props = {
      categoryId: 2,
      category,
      getItemsInCategoryWithPagination: jest.fn(() => Promise.resolve()),
      getCategories: jest.fn(() => Promise.resolve()),
      item: itemWithEmptyCategory,
    };
  };
  beforeEach(() => {
    setup();
    wrapper = shallow(<ItemList {...props} />);
  });

  it('It should show description which notifys that this category is empty', () => {
    expect(wrapper.find('a[className="preview-link"]').text()).toContain('This category is empty.');
  });
});
