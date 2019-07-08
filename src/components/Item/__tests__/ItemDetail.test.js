import React from 'react';
import { shallow } from 'enzyme';
import { ItemDetail } from 'components/Item/ItemDetail';
import { item, itemWithEmptyCategory, noDescriptionItem } from 'utilities/sampleData';


describe('ItemDetail with available item', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      match: {
        params: {
          categoryId: 1,
          itemId: 7,
        },
      },
      item: {
        data: [
          {
            id: 1,
          },
        ],
      },
      itemDetail: {
        created_on: 1,
      },
      showInfoModal: false,
      showSuccessModal: false,
      showConfirmModal: false,
      deleteItemInCategory: jest.fn(() => Promise.resolve()),
      getItemsInCategory: jest.fn(() => Promise.resolve()),
    };
  };
  beforeEach(() => {
    localStorage.setItem('userId', 1);
    setup();
    wrapper = shallow(<ItemDetail {...props} />);
    instance = wrapper.instance();
  });
  it('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('It should show a CreateItemModal', () => {
    wrapper.setState({
      ...wrapper.state(),
      itemDetail: {
        user: {
          id: 1,
        },
        created_on: 'test',
        updated_on: 'test',
      },
    });
    localStorage.setItem('userId', 1);
    wrapper.find('Button[id="editButton"]').simulate('click');
    expect(wrapper.state().showInfoModal).toEqual(true);
    localStorage.clear();
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
  it('It should redirect to homepage when handleSuccessClose is called from delete function', () => {
    wrapper.setState({
      backToHome: true,
    });
    instance.handleSuccessClose();
    expect(wrapper.state().showInfoModal).toEqual(false);
  });
  it('It should open ConfirmModal when handleConfirmShow is called', () => {
    instance.handleConfirmShow();
    expect(wrapper.state().showConfirmModal).toEqual(true);
  });
  it('It should close ConfirmModal when handleConfirmClose is called', () => {
    instance.handleConfirmClose();
    expect(wrapper.state().showConfirmModal).toEqual(false);
  });
  it('It should show SuccessModal when an item is deleted', () => {
    instance.deleteItem({
      preventDefault: () => {},
    });
    expect(wrapper.state().showConfirmModal).toEqual(false);
  });
});

describe('ItemDetail with item which does not exist', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      match: {
        params: {
          categoryId: 1,
          itemId: 7,
        },
      },
      item: itemWithEmptyCategory,
      showInfoModal: false,
      showSuccessModal: false,
      showConfirmModal: false,
      deleteItemInCategory: jest.fn(() => Promise.resolve()),
      getItemsInCategory: jest.fn(() => Promise.resolve()),
    };
  };
  beforeEach(() => {
    localStorage.setItem('userId', 1);
    setup();
    wrapper = shallow(<ItemDetail {...props} />);
    instance = wrapper.instance();
  });
  it('It should show SuccessModal when an item is deleted', async () => {
    await instance.deleteItem({
      preventDefault: () => {},
    });
    expect(wrapper.state().showSuccessModal).toEqual(true);
  });
});

describe('ItemDetail with item which does not have description', () => {
  let wrapper;
  let props;
  const setup = () => {
    props = {
      match: {
        params: {
          categoryId: 1,
          itemId: 7,
        },
      },
      item: noDescriptionItem,
      showInfoModal: false,
      showSuccessModal: false,
      showConfirmModal: false,
      deleteItemInCategory: jest.fn(() => Promise.resolve()),
      getItemsInCategory: jest.fn(() => Promise.resolve()),
      itemDetail: {
        user: {
          id: 1,
        },
        created_on: 'test',
        updated_on: 'test',
      },
    };
  };
  beforeEach(() => {
    localStorage.setItem('userId', 1);
    setup();
    wrapper = shallow(<ItemDetail {...props} />);
  });
  it('It should notify that the item does not have description', async () => {
    wrapper.setState({
      ...wrapper.state(),
      itemDetail: {
        user: {
          id: 1,
        },
        created_on: 'test',
        updated_on: 'test',
      },
    });
    expect(wrapper.find('i').text()).toContain('No description');
  });
});