import React, { Component } from 'react';

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
    event.preventDefault();
    event.stopPropagation();

    const name = this.state.name;
    console.log(`${name} signed up`);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <form className="signup-form" onSubmit={this.onSubmit}>
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
              type="text" required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
