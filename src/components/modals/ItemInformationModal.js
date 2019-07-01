import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
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
    // Edit the item
    if (!createItem) {
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
  }

  handleTitleChange = (e) => {
    const { title } = this.state;
    title.value = e.target.value;
    // Validate and process input
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
    const { createItem, title, description, isValidRequest, itemId } = this.state;
    if (isValidRequest) {
      // Send request
      if (createItem === true) {
        // Send POST request
        this.props
          .createItemInCategory(this.props.currentCategoryId, {
            title: title.value.trim(),
            description: description.value,
          })
          .then(() => {
            //.. Reload user history push
            this.props.showSuccessModal();
            this.props.handleClose();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Edit an item
        this.props
          .editItemInCategory(this.props.currentCategoryId, {
            id: itemId,
            title: title.value.trim(),
            description: description.value,
          })
          .then(() => {
            this.props.showSuccessModal();
            this.props.handleClose();
          })
          .catch((error) => {
            console.log(error);
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

          {this.createItem
            ? <Modal.Title>Create new item</Modal.Title>
            : <Modal.Title>Edit item</Modal.Title>
          }
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
            {this.createItem
              ? <Button type="submit">Create</Button>
              : <Button type="submit">Edit</Button>
            }
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
