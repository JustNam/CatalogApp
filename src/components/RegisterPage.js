import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { validateUsername } from '../utilities/validate';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidRequest: '',
      username: {
        value: '',
        errorMessages: [],
        isValid: false,
      },
      password: '',
      confirmPassword: '',
      passwordMatch: false,
      usernameInputProps: {
        isValid: null,
        isInvalid: null,
      },
      passwordInputProps: {
        isValid: null,
        isInvalid: null,
      },
      redirect: false,
      error: false,
    };
  }

  updateUsernameInputProps = (validity) => {
    this.setState({
      usernameInputProps: {
        isValid: validity,
        isInvalid: !validity,
      },
    });
  };

  resetUsernameInputProps = () => {
    this.setState({
      usernameInputProps: {
        isValid: '',
        isInvalid: '',
      },
    });
  };

  updatePasswordInputProps = (validity) => {
    this.setState({
      passwordInputProps: {
        isValid: validity,
        isInvalid: !validity,
      },
    });
  };

  resetPasswordInputProps = () => {
    this.setState({
      passwordInputProps: {
        isValid: '',
        isInvalid: '',
      },
    });
  };


  validateUsernameData = (username) => {
    const usernameValidation = validateUsername(username);
    this.setState({
      isValidRequest: usernameValidation.isValid && this.state.passwordMatch,
      username: {
        ...usernameValidation,
      },
    });
    this.updateusernameInputProps(usernameValidation.isValid);
  }

  handleUsernameChange = (e) => {
    const { username } = this.state;
    username.value = e.target.value;
    // Validate and process input
    if (username.value === '') {
      this.resetUsernameInputProps();
    } else {
      this.validateUsernameData(username);
    }
  };

  handlePasswordChange = (e) => {
    const { confirmPassword } = this.state;
    const password = e.target.value;
    // Validate and process input
    if (password === '') {
      this.resetPasswordInputProps();
    } else {
      this.vav(username);
    }
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      alert("Password don't match");
    } else {
      this.props
        .signUp(username, password)
        .then((response) => {
          if (response.payload.error) {
            this.setState({ error: true });
          } else {
            this.setState({ redirect: true });
          }
        });
    }
  };

  render() {
    const { username, password, confirmPassword, redirect, error, usernameInputProps, passwordInputProps } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-username text-center">Catalog App</h5>
                <div className="minor-username">Register new account</div>
                <form className="form-signin" autoComplete="off">
                  {error && (
                    <div className="invalid-credential">Invalid username or password</div>
                  )}
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputUsername"
                      className="form-control"
                      placeholder="Email address"
                      value={username}
                      onChange={this.handleUsernameChange}
                      {...usernameInputProps}
                      required
                    />
                    <label htmlFor="inputUsername">Username</label>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {username.errorMessages.map((errorMessage, index) => (
                      <div key={index}>{errorMessage}</div>
                    ))}
                  </Form.Control.Feedback>

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

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputConfirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={this.handleConfirmPasswordChange}
                      required
                      {...passwordInputProps}
                    />
                    <label htmlFor="inputConfirmPassword">Confirm Password</label>
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={this.handleSubmit}
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
