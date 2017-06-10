import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

class FrontPage extends Component {
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
        <h1>Quantiteam</h1>
        <h3>Quantitative data solutions for coaches and athletes</h3>
        <div className="site-blurb">
          Designed for sports where results are measured in time and distance,
          Quantiteam allows coaches and athletes to centralize their training records
          and analyze progress over time.
        </div>
        <button id="signup-button" onClick={this.onSignUpClick}>Sign Up</button>
        <button id="signin-button" onClick={this.onSignInClick}>Sign In</button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(FrontPage));
