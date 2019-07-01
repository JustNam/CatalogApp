import React, { Component } from './node_modules/react';
import { Modal, Button, Form } from './node_modules/react-bootstrap';
import { connect } from './node_modules/react-redux';
import { createItemInCategory, editItemInCategory } from '../../actions/item';
import { validateItemTitle } from '../../utilities/validate';

class ItemInformationModal extends Component {
  constructor(props) {
    super(props);
    const createItem = !props.item;
    const title = {
      value: '',
      isValid: false,
      errorMessages: [],
    };
    const description = {
      value: '',
    };
    let itemId = '';
    if (!createItem) {
      // Retrieve item information from another component
      const { item } = props;
      title.value = item.title;
      description.value = item.description;
      itemId = item.id;
    }
    this.state = {
      createItem,
      isValidRequest: false,
      title,
      description,
      // Attribute for <input/> element
      titleInputProps: {
        isValid: null,
        isInvalid: null,
      },
      itemId,
    };
  }

  componentDidMount() {
    // Only execute when edit item
    if (!this.state.createItem) {
      this.validateData(this.state.title);
    }
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
    this.setState({ description: { value: e.target.value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      createItem,
      title,
      description,
      isValidRequest,
      itemId,
    } = this.state;
    // Validate by front-end
    if (isValidRequest) {
      if (createItem === true) {
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
              //.. Reload user history push
              this.props.showSuccessModal();
              this.props.handleClose();
            }
          });
      } else {
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
              //.. Reload user history push
              this.props.showSuccessModal();
              this.props.handleClose();
            }
          });
      }
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
          {this.createItem ? (
            <Modal.Title>Create new item</Modal.Title>
          ) : (
            <Modal.Title>Edit item</Modal.Title>
          )}
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
            {this.createItem ? (
              <Button type="submit">Create</Button>
            ) : (
              <Button type="submit">Edit</Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

//.. Consider again
const mapDispatchToProp = {
  createItemInCategory,
  editItemInCategory,
};

export default connect(
  null,
  mapDispatchToProp
)(ItemInformationModal);
