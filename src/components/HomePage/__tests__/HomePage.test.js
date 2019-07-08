import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from 'components/HomePage/HomePage';
import { category } from 'utilities/sampleData';

describe('/components/HomePage', () => {
  let wrapper;
  let props;
  const setup = () => {
    props = {
      category,
      getCategories: jest.fn(() => Promise.resolve()),
      getItems: jest.fn(() => Promise.resolve()),
      getItemsInCategoryWithPagination: jest.fn(() => Promise.resolve()),
    };
  };
  beforeEach(() => {
    setup();
    wrapper = shallow(<HomePage {...props} />);
  });

  it('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('It should get the items in first category', () => {
    expect(props.getItemsInCategoryWithPagination).toBeCalled();
  });
  it('It should get the items in another category when another tab is clicked', () => {
    wrapper.find('[tabFor="vertical-tab-1"]').simulate('click', {
      preventDefault: () => {},
    });
    expect(props.getItemsInCategoryWithPagination.mock.calls.length).toBe(2);
  });
});
