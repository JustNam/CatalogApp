import React from 'react';
import '../styles/login.css';

export default function NavigationBar () {
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
    </nav>
  );
}