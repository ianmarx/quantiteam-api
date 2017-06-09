import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signOutUser } from '../actions';

/* Connect to the auth prop */
const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

/* Nav bar component */
class Nav extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }
  signOut() {
    console.log('Sign out clicked');
    this.props.signOutUser(this.props.history);
  }
  /* Conditional button rendering based on authentication state of page */
  renderButtons() {
    if (this.props.authenticated) {
      return (
        <ul className="navigation">
          <li id="logo">
            <NavLink to="/">
              <i className="fa fa-heartbeat" aria-hidden="true" />
            </NavLink>
          </li>
          <li>
            <NavLink to={`/home/${localStorage.getItem('userId')}`}>
              <div id="home" className="nav-button">Home</div>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${localStorage.getItem('userId')}`}>
              <div id="profile" className="nav-button">Profile</div>
            </NavLink>
          </li>
          <li>
            <button id="sign-out-button" onClick={this.signOut} className="nav-button">
              Sign out
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navigation">
          <li id="logo">
            <NavLink to="/">
              <i className="fa fa-heartbeat" aria-hidden="true" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/signin">
              <div id="signin" className="nav-button">Sign In</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup">
              <div id="signup" className="nav-button">Sign Up</div>
            </NavLink>
          </li>
        </ul>
      );
    }
  }
  render() {
    return (
      <nav>
        {this.renderButtons()}
      </nav>
    );
  }
}

export default withRouter(connect(mapStateToProps, { signOutUser })(Nav));
