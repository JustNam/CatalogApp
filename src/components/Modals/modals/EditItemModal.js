import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editItemInCategory } from 'actions/item';
import { validateItemTitle } from 'utilities/validate';

export class EditItemModal extends Component {
  constructor(props) {
    super(props);
    const { item } = props;
    this.state = {
      isValidRequest: false,
      title: {
        value: item.title,
        isValid: false,
        errorMessages: [],
      },
      description: {
        value: item.description,
      },
      // Attribute for <input/> element
      titleInputProps: {
        isValid: null,
        isInvalid: null,
      },
      itemId: item.id,
    };
  }

  componentDidMount() {
    // Validate of current title
    this.validateData(this.state.title);
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
    const { title } = this.state;
    title.value = e.target.value;
    if (title.value === '') {
      this.resetTitleInputProps();
    } else {
      this.validateData(title);
    }
  };

  handleDescriptionChange = (e) => {
    if (e.target.value) {
      this.setState({ description: { value: e.target.value } });
    } else {
      this.setState({ description: { value: null } });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      isValidRequest,
      itemId,
    } = this.state;
    // Validate by front-end
    if (isValidRequest) {
      // Edit an item
      this.props
        .editItemInCategory(this.props.currentCategoryId, {
          id: itemId,
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
          <Modal.Title>Edit item</Modal.Title>
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
            <Button type="submit">Edit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapDispatchToProp = {
  editItemInCategory,
};

export default connect(
  null,
  mapDispatchToProp
)(EditItemModal);
