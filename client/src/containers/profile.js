import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser, fetchUserWorkouts, updateWorkout,
  deleteWorkout, addTeam, fetchUserTeam } from '../actions';
import WorkoutPost from './workout-post';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.list,
    team: state.team.team,
    authenticated: state.auth.authenticated,
  }
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.displayFeed = this.displayFeed.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    if (!this.props.authenticated) {
      console.log('should redirect to signin');
      this.props.history.replace('/signin');
    }
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
  }
  onDeleteClick(workoutId, userId) {
    this.props.deleteWorkout(workoutId, userId);
    console.log('Workout deleted successfully'); // added b/c message in deleteWorkout action not showing up
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }
  displayFeed() {
    this.props.workouts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return (
      <div className="workout-feed">
        {this.props.workouts.map((workout, i) => {
          return (
            <div key={`workout-${i}`}>
              <WorkoutPost userId={workout._creator} workout={workout} index={i}
                onDeleteClick={this.onDeleteClick} updateWorkout={this.props.updateWorkout}
              />
            </div>
          );
        })}
      </div>
    );
  }
  displayInfo() {
    return (
      <div className="user-info">
        <div className="user-name">{this.props.user.name}</div>
        <div className="user-description">
          <div className="team-name">{this.props.team.name}</div>
          <div className="user-location">Home Location</div>
          <div className="user-bio" rows="2" cols="32">
            This is a test user bio.
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="profile-page">
        <div className="profile-column">
          {this.displayInfo()}
        </div>
        <div className="profile-column">
          <div id="feed-title">My Workouts</div>
          {this.displayFeed()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, fetchUserWorkouts,
  updateWorkout, deleteWorkout, addTeam, fetchUserTeam })(Profile));
