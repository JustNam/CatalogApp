/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import CreateItemModal from '../Modals/ItemInformationModal';
import SuccessModal from '../Modals/SuccessModal';


class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoModal: false,
      showSuccessModal: false,
    };
    console.log(props);
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

  getNewPage = (page) => {
    const { item } = this.props;
    console.log(item.categoryId);
    this.props.getItemsInCategoryWithPagination(item.categoryId, page);
  }

  createPagination = () => {
    const { item } = this.props;
    const paginations = [];
    if (item.data.length === 0) {
      return [];
    }
    [...Array(item.lastPage).keys()].forEach((index) => {
      const page = index + 1;
      if (page === item.currentPage) {
        paginations.push(<Pagination.Item key={page} active>{page}</Pagination.Item>);
      } else {
        paginations.push(<Pagination.Item onClick={() => this.getNewPage(page)} key={page}>{page}</Pagination.Item>);
      }
    });
    return <Pagination>{paginations}</Pagination>;
  }

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
        {this.createPagination()}
        <CreateItemModal
          currentCategoryId={currentCategory[0].id}
          show={showInfoModal}
          handleClose={this.handleInfoClose}
          showSuccessModal={this.handleSuccessShow}
        />
        <SuccessModal
          show={showSuccessModal}
          handleClose={this.handleSuccessClose}
        />
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
          <a className="preview-link">
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
