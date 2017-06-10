import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onSignInClick = this.onSignInClick.bind(this);
  }
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push(`/home/${localStorage.getItem('userId')}`);
    }
  }
  onSignUpClick() {
    this.props.history.push('/signup');
  }
  onSignInClick() {
    this.props.history.push('/signin');
  }
  render() {
    return (
      <div className="site-welcome">
        <div className="tagline">
          Make your workouts work for you.
        </div>
        <div className="button-group">
          <button id="signup-button" onClick={this.onSignUpClick}>Join Quantiteam</button>
        </div>
        <div className="already-user">
          Already a user? <NavLink to="/signin">Sign in here.</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(LandingPage));
