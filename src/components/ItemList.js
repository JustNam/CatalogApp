/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateItemModal from './modals/ItemInformationModal';
import SuccessModal from './modals/SuccessModal';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoModal: false,
      showSuccessModal: false,
    };
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

  renderItems(currentCategory, item) {
    const { showInfoModal, showSuccessModal } = this.state;
    return (
      <div>
        <div>
          <div className="list-header">
            {currentCategory[0] && `category ${currentCategory[0].name}`}
            <div className="pull-xs-right">
              <button
                className="btn btn-sm btn-outline-primary"
                type="button"
                onClick={this.handleInfoShow}
              >
                Create
              </button>
            </div>
          </div>
        </div>
        {item.data.map((itemDetail) => (
          <div className="article-preview" key={itemDetail.id}>
            <Link
              className="preview-link"
              to={`/categories/${item.categoryId}/items/${itemDetail.id}`}
            >
              <h1>{itemDetail.title}</h1>
              <p>{itemDetail.description}</p>
              <span>Read more...</span>
            </Link>
          </div>
        ))}
        <CreateItemModal
          currentCategoryId={currentCategory[0].id}
          show={showInfoModal}
          handleClose={this.handleInfoClose}
          showSuccessModal={this.handleSuccessShow}
        />
        <SuccessModal show={showSuccessModal} handleClose={this.handleSuccessClose} />
      </div>
    );
  }

  render() {
    const { item, category } = this.props;
    const currentCategory = category.data.filter(
      (categoryDetail) => item.categoryId === categoryDetail.id
    );
    if (item.data.length !== 0) {
      return this.renderItems(currentCategory, item);
    }
    return (
      <div>
        <p>{currentCategory[0] && `category ${currentCategory[0].name}`}</p>
        <div className="article-preview">
          <a className="preview-link" href="cafe">
            <i>
              <span>
                This category is empty. Please select another category!
              </span>
            </i>
          </a>
        </div>
      </div>
    );
  }
}

export default ItemList;
