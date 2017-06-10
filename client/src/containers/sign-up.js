import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signUpUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  onSubmit(event) {
    console.log('Sign up request submitted');
    event.preventDefault();
    event.stopPropagation();

    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;

    const userObject = { name, email, password };
    this.props.signUpUser(userObject, this.props.history);
  }
  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.onSubmit}>
          <h2>Sign Up</h2>
          <div id="name-field">
            <h3>Name</h3>
            <input onChange={this.onNameChange} value={this.state.name}
              type="text" required
            />
          </div>
          <div className="email-field">
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
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signUpUser })(SignUp));
