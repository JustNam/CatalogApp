import React, { Component } from 'react';
import EditItemModal from './modals/ItemInformationModal';
import SuccessModal from './modals/SuccessModal';

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    const { categoryId, itemId } = this.props.match.params;
    this.state = {
      showInfoModal: false,
      showSuccessModal: false,
      categoryId,
      itemId,
    };
  }

  componentDidMount() {
    const { categoryId, itemId } = this.state;
    this.props.getItemInCategory(categoryId, itemId);
  }

  handleInfoShow = () => {
    this.setState({ showInfoModal: true });
  };

  handleInfoClose = () => {
    this.setState({ showInfoModal: false });
  };

  handleSuccessShow = () => {
    this.setState({ showSuccessModal: true });
  };

  handleSuccessClose = () => {
    this.setState({ showSuccessModal: false });
  };

  render() {
    const { item } = this.props;
    const itemDetail = item.data[0];
    if (itemDetail) {
      const { showInfoModal, showSuccessModal, categoryId } = this.state;
      return (
        <div>
          <div className="article-preview">
            <div className="article-meta">
              <div className="info">
                <div className="author">
                  {itemDetail.user.username}
                </div>
                <span className="date">{`updated ${itemDetail.created_on.replace(',', ' at')}, created ${itemDetail.updated_on.replace(',', ' at')}`}</span>
              </div>
            </div>
            <div className="preview-link" href="#article/books-4kbydz">
              <h1>{itemDetail.title}</h1>
              <p>{itemDetail.description}</p>
              {!itemDetail.description && <p><i>No description</i></p>}
              <span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  type="button"
                  onClick={this.handleInfoShow}
                >
                Edit
                </button>
              </span>
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
        </div>
      );
    }
    return <div />;
  }
}
export default ItemDetail;