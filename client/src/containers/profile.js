import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser, fetchUserWorkouts } from '../actions';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.list,
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
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }
  displayInfo() {
    return (
      <div> This is the profile for {this.props.user.name}.</div>
    );
  }
  render() {
    return (
      <div>
        {this.displayInfo()}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, fetchUserWorkouts })(Profile));
