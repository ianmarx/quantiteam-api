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

/* Navbar component */
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
          <li>
            <div id="name-logo">Quantiteam</div>
          </li>
          <li>
            <NavLink to={`/home/${localStorage.getItem('userId')}`}>
              <div id="home-button" className="nav-button">Home</div>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${localStorage.getItem('userId')}`}>
              <div id="profile-button" className="nav-button">Profile</div>
            </NavLink>
          </li>
          <li>
            <div id="signout-button" onClick={this.signOut} className="nav-button">
              Sign Out
            </div>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navigation">
          <li>
            <div id="name-logo">Quantiteam</div>
          </li>
          <li>
            <NavLink to={'/'}>
              <div id="home-button-deauth" className="nav-button">Home</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/signin">
              <div id="signin-button" className="nav-button">Sign In</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup">
              <div id="signup-button" className="nav-button">Sign Up</div>
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
