import React, { Component } from './node_modules/react';
import { Modal, Button } from './node_modules/react-bootstrap';

class ConfirmModal extends Component {
  render() {
    const { handleClose, handleConfirm } = this.props;
    return (
      <Modal
        animation={false}
        show={this.props.show}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>

          <Button variant="outline-success" size="sm" onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="outline-secondary" size="sm" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ConfirmModal;
