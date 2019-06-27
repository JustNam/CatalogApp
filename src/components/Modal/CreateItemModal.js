import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class CreateItemModal extends Component {
  render() {
    const { show, title, description, handleTitleChange, handleDescriptionChange, handleClose, handleSubmit } = this.props;
    return (
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="input"
                name="title"
                onChange={handleTitleChange}
                value={title}
              />
              <Form.Text className="text-muted">
                Title only contain letters, numbers and spaces. Minimum length is 6 characters,
                maximum is 30.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                name="description"
                onChange={handleDescriptionChange}
                value={description}
              />
            </Form.Group>
            <Button type="submit">Create</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default CreateItemModal;
