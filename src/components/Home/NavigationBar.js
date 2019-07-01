import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/login.css';
import { NavDropdown } from 'react-bootstrap';

class NavigationBar extends Component {
   logOut = () => {
     const { history } = this.props;
     localStorage.removeItem('accessToken');
     localStorage.removeItem('username');
     localStorage.removeItem('userId');
     history.push('/login');
   }

   render() {
     const username = localStorage.getItem('username');
     return (
       <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
         <ul className="navbar-nav">
           <li className="nav-item active">
             <h1>
               <a className="navbar-brand" href="/categories">
                 Catalog App
               </a>
             </h1>
           </li>
         </ul>
         <ul className="navbar-nav ml-auto">
           <NavDropdown title={username} id="basic-nav-dropdown">
             <NavDropdown.Divider />
             <NavDropdown.Item onClick={this.logOut}>Log out</NavDropdown.Item>
           </NavDropdown>
         </ul>
       </nav>
     );
   }
}
export default withRouter(NavigationBar);