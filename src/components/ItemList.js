/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import CreateItemModal from '../components/Modal/CreateItemModal';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.state.title);
    console.log(this.state.description);
  };

  renderItems() {

    return (
      <div>
        <div>
          <p>
            {currentCategory[0] && `category ${currentCategory[0].name}`}
            <div className="pull-xs-right">
              <button
                className="btn btn-sm btn-outline-primary"
                type="button"
                onClick={this.handleShow}
              >
                Create
              </button>
            </div>
          </p>
        </div>
        {item.data.map(itemDetail => (
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

        <CreateItemModal show={this.state.show} />
      </div>
      
    );
  }

  render() {
    const { item, category } = this.props;
    const { show, title, description } = this.state;
    const currentCategory = category.data.filter(
      categoryDetail => item.categoryId === categoryDetail.id,
    );
    if (item.data.length !== 0) {
      return this._renderItems();
    }
    return (
      <div>
        <p>{currentCategory[0] && `category ${currentCategory[0].name}`}</p>
        <div className="article-preview">
          <a className="preview-link" href="cafe">
            <i>
              <span>This category is empty. Please select another category!</span>
            </i>
          </a>
        </div>
      </div>
    );
  }
}

export default ItemList;
