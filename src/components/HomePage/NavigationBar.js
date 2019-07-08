import React, { Component } from 'react';
import 'styles/login.css';
import { connect } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { getItemsInCategoryWithPagination } from 'actions/item';
import { withRouter, Link } from 'react-router-dom';
import { logOut } from 'actions/user';

export class NavigationBar extends Component {
   reload = () => {
     const { category } = this.props;
     let id = parseInt(localStorage.getItem('categoryId'));
     if (!id) {
       id = category.data[0].id;
     }
     this.props.getItemsInCategoryWithPagination(id, 1);
   }

   render() {
     const username = localStorage.getItem('username');
     return (
       <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
         <ul className="navbar-nav">
           <li className="nav-item active">
             <h1>
               <Link className="navbar-brand" onClick={this.reload} to="/categories">
                 Catalog App
               </Link>
             </h1>
           </li>
         </ul>
         <ul className="navbar-nav ml-auto">
           <NavDropdown title={username} id="basic-nav-dropdown">
             <NavDropdown.Divider />
             <NavDropdown.Item onClick={this.props.logOut}>Log out</NavDropdown.Item>
           </NavDropdown>
         </ul>
       </nav>
     );
   }
}
function mapStateToProps(state) {
  return {
    category: state.category,
  };
}
const mapDispatchToProp = {
  getItemsInCategoryWithPagination,
  logOut,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(NavigationBar));