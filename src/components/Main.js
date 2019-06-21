import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Main extends Component {
    render() {
        return <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <h1>
                            <Link className="nav-link" to="/">Catalog App</Link>
                        </h1>
                    </li>
                </ul>
            </nav>
        </div>
    }
}

export default Main
