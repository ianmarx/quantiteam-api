import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../actions';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    authenticated: state.auth.authenticated,
  }
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.displayInfo = this.displayInfo.bind(this);
  }
  componentWillMount() {
    if (!this.props.authenticated) {
      console.log('should redirect to signin');
      this.props.history.replace('/signin');
    }
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }
  displayInfo() {
    return (
      <div> This is the profile for {this.props.user.name}.</div>
    );
  }
  render() {
    return (
      <div>
        This is the profile page.
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser })(Profile));
