import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { validateUsername } from '../../utilities/validate';

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
      username: {
        ...usernameValidation,
      },
      isValidRequest: usernameValidation.isValid && this.state.passwordMatch,
    });
    this.updateUsernameInputProps(usernameValidation.isValid);
  };

  // Validate username and trigger update of username object
  handleUsernameChange = (e) => {
    const { username } = this.state;
    username.value = e.target.value;
    if (username.value === '') {
      this.resetUsernameInputProps();
    } else {
      this.validateUsernameData(username);
    }
  };

  // Update password value, compare with confirmPassword and update validadtions
  handlePasswordChange = (e) => {
    const { confirmPassword, username } = this.state;
    const password = e.target.value;
    if (password === '') {
      this.resetPasswordInputProps();
      this.setState({ password: '' });
    } else {
      const passwordMatch = password === confirmPassword;
      this.setState({
        password,
        passwordMatch,
        isValidRequest: username.isValid && passwordMatch,
      });
      if (confirmPassword) {
        this.updatePasswordInputProps(passwordMatch);
      }
    }
  };

  // Update confirmPassword value, compare with password and update validadtions
  handleConfirmPasswordChange = (e) => {
    const { password, username } = this.state;
    const confirmPassword = e.target.value;
    if (confirmPassword === '') {
      this.resetPasswordInputProps();
      this.setState({ confirmPassword: '' });
    } else {
      const passwordMatch = password === confirmPassword;
      this.setState({
        confirmPassword,
        passwordMatch,
        isValidRequest: username.isValid && passwordMatch,
      });
      if (password) {
        this.updatePasswordInputProps(passwordMatch);
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, isValidRequest } = this.state;
    if (isValidRequest) {
      this.props.signUp(username.value, password)
        .then((response) => {
          if (response.payload.error) {
            this.setState({
              username: {
                ...username,
                errorMessages: ['The username already exists'],
              },
            });
            this.updateUsernameInputProps(false);
          } else {
            this.setState({ redirect: true });
          }
        });
    }
  };

  render() {
    const {
      username,
      password,
      confirmPassword,
      redirect,
      usernameInputProps,
      passwordInputProps,
    } = this.state;
    if (redirect) {
      return (
        <Redirect to={{
          pathname: '/login',
          signUpSuccess: true,
        }}
        />
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-username text-center">Catalog App</h5>
                <div className="minor-title">Register new account</div>
                <form
                  className="form-signin"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-label-group">
                    <Form.Control
                      type="text"
                      id="inputUsername"
                      placeholder="Username"
                      minLength="6"
                      maxLength="30"
                      value={username.value}
                      onChange={this.handleUsernameChange}
                      {...usernameInputProps}
                      required
                    />
                    <label htmlFor="inputUsername">Username</label>
                    <Form.Control.Feedback type="invalid">
                      {username.errorMessages.map((errorMessage, index) => (
                        <div key={index}>{errorMessage}</div>
                      ))}
                    </Form.Control.Feedback>

                  </div>
                  <div className="form-label-group">

                    <Form.Control
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={this.handlePasswordChange}
                      minLength="6"
                      {...passwordInputProps}
                      required
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <div className="form-label-group">
                    <Form.Control
                      type="password"
                      id="inputConfirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={this.handleConfirmPasswordChange}
                      required
                      {...passwordInputProps}
                    />
                    <label htmlFor="inputConfirmPassword">
                      Confirm Password
                    </label>
                    <Form.Control.Feedback type="invalid">
                    Confirm password does not match
                    </Form.Control.Feedback>
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"

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