import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createItemInCategory } from 'actions/item';
import { validateItemTitle } from 'utilities/validate';

class CreateItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidRequest: false,
      title: {
        value: '',
        isValid: false,
        errorMessages: [],
      },
      description: {
        value: '',
      },
      // Attribute for <input/> element
      titleInputProps: {
        isValid: null,
        isInvalid: null,
      },
    };
  }

  // Update UI of title input
  updateTitleInputProps = (validity) => {
    this.setState({
      titleInputProps: {
        isValid: validity,
        isInvalid: !validity,
      },
    });
  };

  resetTitleInputProps = () => {
    this.setState({
      titleInputProps: {
        isValid: '',
        isInvalid: '',
      },
    });
  };

  // Validate title of item and then save it to state
  validateData = (title) => {
    const validation = validateItemTitle(title);
    this.setState({
      isValidRequest: validation.isValid,
      title: {
        ...title,
        ...validation,
      },
    });
    this.updateTitleInputProps(validation.isValid);
  };

  // Update title from input and trigger validadtions
  handleTitleChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      this.setState({
        title: {
          value: '',
          isValid: false,
          errorMessages: [],
        },
      });
      this.resetTitleInputProps();
    } else {
      // Can not use this assignment when the input is empty
      const newTitle = {
        ...this.state.title,
        value,
      };
      this.validateData(newTitle);
    }
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: { value: e.target.value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      isValidRequest,
    } = this.state;
    // Validate by front-end
    if (isValidRequest) {
      // Submit new item information
      this.props
        .createItemInCategory(this.props.currentCategoryId, {
          title: title.value.trim(),
          description: description.value,
        })
        .then((response) => {
          // Validate by back-end
          if (response.payload.error) {
            this.setState({
              title: {
                ...title,
                errorMessages: ['The given title already exists'],
              },
            });
            this.updateTitleInputProps(false);
          } else {
            this.props.showSuccessModal();
            this.props.handleClose();
          }
        });
    }
  };

  render() {
    const { title, titleInputProps, description } = this.state;
    return (
      <Modal
        animation={false}
        show={this.props.show}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                required
                onChange={this.handleTitleChange}
                value={title.value}
                {...titleInputProps}
              />
              <Form.Text className="text-muted">
                Title only contain letters, numbers and spaces. Maximum length
                is 30 characters.
              </Form.Text>
              {/* Show error detais */}
              <Form.Control.Feedback type="invalid">
                {title.errorMessages.map((errorMessage, index) => (
                  <div key={index}>{errorMessage}</div>
                ))}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={this.handleDescriptionChange}
                value={description.value}
              />
            </Form.Group>
            <Button type="submit">Create</Button>

          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapDispatchToProp = {
  createItemInCategory,
};

export default connect(
  null,
  mapDispatchToProp
)(CreateItemModal);
export { CreateItemModal };