import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Button } from 'react-bootstrap';
import EditItemModal from 'components/Modals/EditItemModal';
import SuccessModal from 'components/Modals/SuccessModal';
import ConfirmModal from 'components/Modals/ConfirmModal';
import NavigationBar from 'components/HomePage/NavigationBar';
import { getItemInCategory, deleteItemInCategory } from 'actions/item';
import history from '../../history';

export class ItemDetail extends Component {
  constructor(props) {
    super(props);

    const { categoryId, itemId } = this.props.match.params;
    this.state = {
      showInfoModal: false,
      showSuccessModal: false,
      showConfirmModal: false,
      categoryId,
      itemId,
      backToHome: null,
      itemDetail: {},
    };
  }

  async componentDidMount() {
    // Prevent refresh from crashing
    const { categoryId, itemId } = this.props.match.params;
    await this.props.getItemInCategory(categoryId, itemId);
  }

  deleteItem = (e) => {
    e.preventDefault();
    const { categoryId, itemId } = this.state;
    this.props.deleteItemInCategory(categoryId, itemId).then(() => {
      this.handleConfirmClose();
      this.handleSuccessShow();
    });
  }

  handleInfoShow = () => {
    this.setState({ showInfoModal: true });
    this.setState({ backToHome: false });
  };

  handleInfoClose = () => {
    this.setState({ showInfoModal: false });
  };

  handleSuccessShow = () => {
    this.setState({ showSuccessModal: true });
  };

  handleSuccessClose = () => {
    const { categoryId, itemId } = this.state;
    this.setState({ showSuccessModal: false });
    if (this.state.backToHome) {
      history.push('/categories');
    } else {
      history.push(`/categories/${categoryId}/items/${itemId}`);
      this.componentDidMount();
    }
  };

  handleConfirmShow = () => {
    this.setState({ showConfirmModal: true });
    this.setState({ backToHome: true });
  };

  handleConfirmClose = () => {
    this.setState({ showConfirmModal: false });
  };

  render() {
    const { itemDetail } = this.state;
    const userId = localStorage.getItem('userId');
    if (itemDetail.user) {
      const { showInfoModal, showSuccessModal, showConfirmModal, categoryId } = this.state;
      return (
        <div>
          <NavigationBar />
          <div className="container page">
            <div className="article-preview">
              <div className="article-meta">
                <div className="info">
                  <div className="author">
                    {itemDetail.user.username}
                  </div>
                  <span className="date">{`updated ${itemDetail.created_on.replace(',', ' at')}, created ${itemDetail.updated_on.replace(',', ' at')}`}</span>
                </div>
              </div>
              <div className="preview-link">
                <h1>{itemDetail.title}</h1>
                <p>{itemDetail.description}</p>
                {!itemDetail.description && <p><i>No description</i></p>}
                {(parseInt(userId) === parseInt(itemDetail.user.id))
                  && (
                  <span>
                    <ButtonToolbar className="modal-footer">
                      <Button
                        id="editButton"
                        variant="outline-success"
                        size="sm"
                        onClick={this.handleInfoShow}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={this.handleConfirmShow}
                      >
                      Delete
                      </Button>
                    </ButtonToolbar>
                  </span>
                  )
                }
              </div>
            </div>
          </div>

          <EditItemModal
            currentCategoryId={categoryId}
            item={itemDetail}
            show={showInfoModal}
            handleClose={this.handleInfoClose}
            showSuccessModal={this.handleSuccessShow}
          />
          <SuccessModal show={showSuccessModal} handleClose={this.handleSuccessClose} />
          <ConfirmModal
            show={showConfirmModal}
            handleConfirm={this.deleteItem}
            handleClose={this.handleConfirmClose}
          />
        </div>
      );
    }

    return <div><NavigationBar /></div>;
  }
}

function mapStateToProp(state) {
  return {
    category: state.category,
    item: state.item,
  };
}

const mapDispatchToProp = {
  getItemInCategory,
  deleteItemInCategory,
};

export default connect(mapStateToProp, mapDispatchToProp)(ItemDetail);