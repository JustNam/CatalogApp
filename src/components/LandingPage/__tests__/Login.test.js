import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';
import { item, itemWithEmptyCategory, noDescriptionItem } from '../../../utilities/sampleData';

describe('Login with input validations', () => {
  let wrapper;
  let props;
  let instance;
  const setup = (username, password) => {
    props = {
      location: {
        signUpSuccess: '',
      },
    };
  };
  beforeEach(() => {
    setup();
    wrapper = shallow(<Login {...props} />);
    instance = wrapper.instance();
  });
  it('It should change username in state when username input is changed', () => {
    instance.handleUsernameChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().username).toBe('test');
  });
  it('It should change password in state when password input is changed', () => {
    instance.handlePasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().password).toBe('test');
  });
});