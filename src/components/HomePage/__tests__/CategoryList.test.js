import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from 'components/HomePage/CategoryList';
import { category } from 'utilities/sampleData';

// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });
describe('/components/CategoryList', () => {
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
    wrapper = shallow(<CategoryList {...props} />);
  });

  it('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('It should get the items in first category', () => {
    expect(props.getItemsInCategoryWithPagination).toBeCalled();
  });
  it('It should get the items in another category when another tab is clicked', () => {
    wrapper.find('[tabFor="vertical-tab-0"]').simulate('click', {
      preventDefault: () => {},
    });
    expect(props.getItemsInCategoryWithPagination.mock.calls.length).toBe(2);
  });
});
