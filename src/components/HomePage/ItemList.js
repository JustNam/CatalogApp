/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import CreateItemModal from '../Modals/CreateItemModal';
import SuccessModal from '../Modals/SuccessModal';
import { historyWithRefresh } from '../../history';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoModal: false,
      showSuccessModal: false,
    };
  }

  componentDidMount() {
    this.props.getCategories();
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
    historyWithRefresh.push('/categories');
  };

  getNewPage = (page) => {
    const { item } = this.props;
    this.props.getItemsInCategoryWithPagination(item.categoryId, page);
  }

  createPagination = () => {
    const { item } = this.props;
    const paginations = [];
    [...Array(item.lastPage).keys()].forEach((index) => {
      const page = index + 1;
      if (page === item.currentPage) {
        paginations.push(
          <Pagination.Item id={page} key={page} active>
            {page}
          </Pagination.Item>
        );
      } else {
        paginations.push(
          <Pagination.Item
            id={page}
            onClick={() => this.getNewPage(page)}
            key={page}
          >
            {page}
          </Pagination.Item>
        );
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
                id="createButton"
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
              {(itemDetail.description && (
              <p>{(itemDetail.description.length > 100) ? `${itemDetail.description.substring(0, 100)}...` : itemDetail.description}</p>)
              )}
              <span>Read more</span>
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
      (categoryDetail) => parseInt(item.categoryId) === parseInt(categoryDetail.id)
    );
    if (item.data.length !== 0) {
      return this.renderItems(currentCategory, item);
    }
    return (
      <div>
        <div className="list-header">
          {currentCategory[0] && `category ${currentCategory[0].name}`}
          <div className="pull-xs-right">
            <button
              id="createButton"
              className="btn btn-sm btn-outline-primary"
              type="button"
              onClick={this.handleInfoShow}
            >
              Create
            </button>
          </div>
        </div>
        <div className="article-preview">
          <a className="preview-link">
            <i>
              <span>
                This category is empty. Please select another category!
              </span>
            </i>
          </a>
        </div>
        {currentCategory[0]
        && (
        <CreateItemModal
          currentCategoryId={currentCategory[0].id}
          show={this.state.showInfoModal}
          handleClose={this.handleInfoClose}
          showSuccessModal={this.handleSuccessShow}
        />
        )
        }
      </div>
    );
  }
}

export default ItemList;
