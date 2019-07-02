import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import successImage from '../../images/checked.svg';

class SuccessModal extends Component {
  render() {
    return (
      <Modal
        animation={false}
        show={this.props.show}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="notification" alt="success" src={successImage} />
        </Modal.Body>
      </Modal>
    );
  }
}
export default SuccessModal;
