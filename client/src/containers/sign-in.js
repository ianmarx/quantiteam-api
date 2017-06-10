import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signInUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  onSubmit(event) {
    console.log('Sign in request submitted');
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    const userObject = { email, password };
    this.props.signInUser(userObject, this.props.history);
  }
  render() {
    return (
      <div className="signin-form">
        <form onSubmit={this.onSubmit}>
          <h2>Sign In</h2>
          <div id="email-field">
            <h3>Email</h3>
            <input onChange={this.onEmailChange} value={this.state.email}
              type="text" required
            />
          </div>
          <div className="password-field">
            <h3>Password</h3>
            <input onChange={this.onPasswordChange} value={this.state.password}
              type="password" required
            />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signInUser })(SignIn));
