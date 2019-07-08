import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage } from 'components/LandingPage/LandingPage';

describe('Login with correct credentials', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      location: {
        signUpSuccess: false,
      },
      login: jest.fn(() => Promise.resolve({
        payload: {
          data: '',
        },
      })),
      user: {
        loggedIn: false,
      },
    };
  };
  beforeEach(() => {
    setup();
    wrapper = shallow(<LandingPage {...props} />);
    instance = wrapper.instance();
  });
  it('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
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
  it('It should not show any error if the request is valid', async () => {
    await instance.handleSubmit({
      preventDefault: () => {},
    });
    await expect(wrapper.state().error).toBe('');
  });
});

describe('Login with input validations', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      location: {
        signUpSuccess: true,
      },
      login: jest.fn(() => Promise.resolve({
        payload: {
          error: 'test',
        },
      })),
    };
  };
  beforeEach(() => {
    setup();
    wrapper = shallow(<LandingPage {...props} />);
    instance = wrapper.instance();
  });
  it('It should show error when is request is invalid', async () => {
    await instance.handleSubmit({
      preventDefault: () => {},
    });
    await expect(wrapper.state().error).toBe('Can not get the data from server');
  });
});