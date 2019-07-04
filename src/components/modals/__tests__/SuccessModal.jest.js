import React from 'react';
import { shallow } from 'enzyme';

import SuccessModal from '../SuccessModal';

it('It should render correctly', () => {
  const wrapper = shallow(<SuccessModal />);
  expect(wrapper).toMatchSnapshot();
});

it('It should render with correct content', () => {
  const wrapper = shallow(<SuccessModal />);
  expect(wrapper.find('ModalTitle').text()).toContain('Success!');
});