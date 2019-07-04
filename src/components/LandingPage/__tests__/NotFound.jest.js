import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound';

it('It should render correctly', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});

it('It should render with correct content', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper.find('[className="not-found"]').text()).toContain('404: Page Not Found');
});
