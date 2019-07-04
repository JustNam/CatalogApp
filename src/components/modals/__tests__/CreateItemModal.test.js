import React from 'react';
import { shallow } from 'enzyme';
import { CreateItemModal } from '../CreateItemModal';

describe('CreateItemModal with valid data', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      isValidRequest: false,
      title: {
        value: '',
        isValid: false,
        errorMessages: [],
      },
      description: {
        value: '',
      },
      titleInputProps: {
        isValid: null,
        isInvalid: null,
      },
      createItemInCategory: jest.fn(() => Promise.resolve({
        payload: {
          data: '',
        },
      })),
      showSuccessModal: jest.fn(() => {}),
      handleClose: jest.fn(() => {}),
    };
  };
  beforeEach(() => {
    setup();
    wrapper = shallow(<CreateItemModal {...props} />);
    instance = wrapper.instance();
  });
  it('It should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('It should change description in state when description input is changed', () => {
    expect(wrapper.state().isValidRequest).toBe(false);
  });
  it('It should change username in state when username input is changed', () => {
    instance.handleTitleChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().title.value).toBe('test');
    expect(wrapper.state().titleInputProps.isInvalid).toBe(false);

    instance.handleTitleChange({
      target: {
        value: '',
      },
    });
    expect(wrapper.state().title.value).toBe('');
  });
  it('It should change description in state when description input is changed', () => {
    instance.handleDescriptionChange({
      target: {
        value: 'test',
      },
    });
    expect(wrapper.state().description.value).toBe('test');
  });
  it('It should show success modal if the data is valid', async () => {
    wrapper.setState({
      isValidRequest: true,
    });
    await instance.handleSubmit({
      preventDefault: () => {},
    });
    expect(props.showSuccessModal).toBeCalled();
  });
});

describe('CreateItemModal with valid data', () => {
  let wrapper;
  let props;
  let instance;
  const setup = () => {
    props = {
      isValidRequest: false,
      title: {
        value: '',
        isValid: false,
        errorMessages: [],
      },
      description: {
        value: '',
      },
      titleInputProps: {
        isValid: null,
        isInvalid: null,
      },
      createItemInCategory: jest.fn(() => Promise.resolve({
        payload: {
          error: '1',
        },
      })),
      showSuccessModal: jest.fn(() => {}),
      handleClose: jest.fn(() => {}),
    };
  };
  beforeEach(() => {
    setup();
    wrapper = shallow(<CreateItemModal {...props} />);
    instance = wrapper.instance();
  });
  it('It should show error if the data is considered invalid in back end', async () => {
    wrapper.setState({
      isValidRequest: true,
    });
    await instance.handleSubmit({
      preventDefault: () => {},
    });
    expect(wrapper.state().titleInputProps.isValid).toBe(false);
  });

  it('It should not call API if the data is considered invalid in front end', async () => {
    wrapper.setState({
      isValidRequest: false,
    });
    await instance.handleSubmit({
      preventDefault: () => {},
    });
    expect(props.createItemInCategory).not.toHaveBeenCalled();
  });
});