import React from 'react';
import { shallow } from 'enzyme';
import ConfirmModal from '../ConfirmModal';

describe('CreateItemModal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConfirmModal />);
  });
  it('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});