import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
      error: false,
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password).then((response) => {
      if (response.payload.error) {
        this.setState({ error: true });
      } else {
        this.setState({ redirect: true });
      }
    });
  };

  render() {
    const { username, password, redirect, error } = this.state;
    if (redirect) {
      return <Redirect to="/categories" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-username text-center">Catalog App</h5>
                <form className="form-signin">
                  {this.props.location.signUpSuccess && (
                    <div className="success-message">
                      Sign up successfully, log in with your new account!
                    </div>
                  )}
                  {error && (
                    <div className="invalid-credential">
                      Invalid username or password
                    </div>
                  )}
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputUsername"
                      className="form-control"
                      placeholder="Email address"
                      value={username}
                      onChange={this.handleUsernameChange}
                      required
                    />
                    <label htmlFor="inputUsername">Username</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={this.handlePasswordChange}
                      required
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={this.handleSubmit}
                    type="submit"
                  >
                    Log in
                  </button>
                  <Button
                    href="/signup"
                    className="btn btn-lg btn-outline-secondary btn-block text-uppercase"
                    type="button"
                  >
                    Sign up
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
