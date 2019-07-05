import React from 'react';
import { shallow } from 'enzyme';
import Register from '../Register';

describe('Register with input validations', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      signUp: jest.fn(() => Promise.resolve({
        payload: {
          data: '',
        },
      })),
    };
  };
  beforeEach(() => {
    setup();
    wrapper = shallow(<Register {...props} />);
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
    expect(wrapper.state().username.value).toBe('test');
    instance.handleUsernameChange({
      target: {
        value: '',
      },
    });
    expect(wrapper.state().usernameInputProps.isValid).toBe(null);
    expect(wrapper.state().usernameInputProps.isInvalid).toBe(null);
  });
  it('It should change password in state when password input is changed', () => {
    wrapper.setState({ confirmPassword: 'test' });
    instance.handlePasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().password).toBe('test');
    expect(wrapper.state().passwordInputProps.isValid).toBe(true);
    instance.handlePasswordChange({
      target: {
        value: '',
      },
    });
    expect(wrapper.state().passwordInputProps.isValid).toBe(null);
    expect(wrapper.state().passwordInputProps.isInvalid).toBe(null);
  });
  it('It should change confirm password in state when confirm password input is changed', () => {
    wrapper.setState({ password: 'test1' });
    instance.handleConfirmPasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().confirmPassword).toBe('test');
    expect(wrapper.state().passwordInputProps.isValid).toBe(false);
    instance.handleConfirmPasswordChange({
      target: {
        value: '',
      },
    });
    expect(wrapper.state().passwordInputProps.isValid).toBe(null);
    expect(wrapper.state().passwordInputProps.isInvalid).toBe(null);
  });
  it('It should redirect when user signs up sucessfully', async () => {
    wrapper.setState({
      isValidRequest: true,
    });
    await instance.handleSubmit({
      preventDefault: () => {},
    });
    expect(wrapper.state().redirect).toBe(true);
  });
  // handleConfirmPasswordChange
  it('It should set the isValidRequest to true if username is valid, confirm password and password are identical', () => {
    wrapper.setState({
      password: 'test',
      username: {
        isValid: true,
        errorMessages: [],
      },
    });
    // Set confirm password
    instance.handleConfirmPasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().passwordInputProps.isValid).toBe(true);
  });
  it('It should set the isValidRequest to false if username is valid, confirm password and password are identical', () => {
    wrapper.setState({
      password: 'test',
      username: {
        isValid: false,
        errorMessages: [],
      },
    });
    // Set confirm password
    instance.handleConfirmPasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().isValidRequest).toBe(false);
  });
  it('It should set the isValidRequest to false if username is valid, confirm password and password are identical', () => {
    wrapper.setState({
      password: 'test1',
      username: {
        isValid: true,
        errorMessages: [],
      },
    });
    // Set confirm password
    instance.handleConfirmPasswordChange({ 
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().isValidRequest).toBe(false);
  });
  it('It should set the isValidRequest to false if username is valid, confirm password and password are identical', () => {
    wrapper.setState({
      username: {
        isValid: true,
        errorMessages: [],
      },
    });
    // Set confirm password
    instance.handleConfirmPasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().isValidRequest).toBe(false);
  });

  // handlePasswordChange
  it('It should set the isValidRequest to true if username is valid, confirm password and password are identical', () => {
    wrapper.setState({
      confirmPassword: 'test',
      username: {
        isValid: true,
        errorMessages: [],
      },
    });
    // Set password
    instance.handlePasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().passwordInputProps.isValid).toBe(true);
  });
  it('It should set the isValidRequest to false if username is valid, confirm password and password are identical', () => {
    wrapper.setState({
      confirmPassword: 'test',
      username: {
        isValid: false,
        errorMessages: [],
      },
    });
    // Set password
    instance.handlePasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().isValidRequest).toBe(false);
  });
  it('It should set the isValidRequest to false if username is valid, confirm password and password are identical', () => {
    wrapper.setState({
      confirmPassword: 'test1',
      username: {
        isValid: true,
        errorMessages: [],
      },
    });
    // Set password
    instance.handlePasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().isValidRequest).toBe(false);
  });
  it('It should set the isValidRequest to false if username is valid, confirm password and password are identical', () => {
    wrapper.setState({
      username: {
        isValid: true,
        errorMessages: [],
      },
    });
    // Set password
    instance.handlePasswordChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().isValidRequest).toBe(false);
  });
});

describe('Register with wrong input validations', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      signUp: jest.fn(() => Promise.resolve({
        payload: {
          error: '1',
        },
      })),
      username: {
        value: '',
        errorMessages: [],
      },
      isValidRequest: true,
    };
  };

  beforeEach(() => {
    setup();
    wrapper = shallow(<Register {...props} />);
    instance = wrapper.instance();
  });
  it('It should redirect when user signs up sucessfully', async () => {
    wrapper.setState({ isValidRequest: true });
    await instance.handleSubmit({
      preventDefault: () => {},
    });
    expect(wrapper.state().username.errorMessages[0]).toBe('The username already exists');
  });
  it('It should show errors when user input is invalid', () => {
    instance.handleUsernameChange({
      target: {
        value: 'af_',
      },
    });
    expect(wrapper.state().username.errorMessages[0]).toBe('Given username contains invalid character');
  });
  it('It should not call API if the data is considered invalid in front end', async () => {
    wrapper.setState({
      isValidRequest: false,
    });
    await instance.handleSubmit({
      preventDefault: () => {},
    });
    expect(props.signUp).not.toHaveBeenCalled();
  });
});