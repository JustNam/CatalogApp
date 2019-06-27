import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ItemDetail extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { categoryId, itemId } = this.props.match.params;
    console.log(categoryId);
    console.log(itemId);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getItemInCategory(categoryId, itemId);
  }

  render() {
    const { item } = this.props;
    const itemDetail = item.data[0];
    if (itemDetail) {
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
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDetail));
