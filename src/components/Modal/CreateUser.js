import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function UserRegister() {
  <Modal animation={false} show={this.state.show} onHide={this.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create new item</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter username" />
          <Form.Text className="text-muted">
            Username only contain letters and number. Minimum length is 6 characters, maximum is 30.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Modal.Body>
  </Modal>;
}

export default UserRegister;