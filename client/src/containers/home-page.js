import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts,
  updateWorkout, updateUser, deleteWorkout, addTeam } from '../actions';
import WorkoutPost from './workout-post';
import AddWorkoutForm from './forms/add-workout-form';
import AddTeamForm from './forms/add-team-form';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.list,
    authenticated: state.auth.authenticated,
  }
);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showTeamModal: false,
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onTeamModalOpen = this.onTeamModalOpen.bind(this);
    this.onTeamModalClose = this.onTeamModalClose.bind(this);
    this.displayFeed = this.displayFeed.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }
  // this is called in <WorkoutPost> by onLocalDeleteClick(event)
  // did it this way so two IDs could be passed in
  onDeleteClick(workoutId, userId) {
    this.props.deleteWorkout(workoutId, userId);
    console.log('Workout deleted successfully'); // added b/c message in deleteWorkout action not showing up
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }
  onModalOpen(event) {
    this.setState({ showModal: true });
  }
  onModalClose(event) {
    this.setState({ showModal: false });
  }
  onTeamModalOpen(event) {
    this.setState({ showTeamModal: true });
  }
  onTeamModalClose(event) {
    this.setState({ showTeamModal: false });
  }
  displayFeed() {
    return (
      <div className="workout-posts">
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
  render() {
    return (
      <div className="home-page">
        <div className="workout-feed">
          <div id="feed-title">Workout Feed</div>
          <div className="button-group">
            <button className="modal-button" onClick={this.onModalOpen}>Add Workout</button>
            <button className="team-modal-button" onClick={this.onTeamModalOpen}>Create Team</button>
          </div>
          {this.displayFeed()}
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Add Workout"
          className="modal"
          overlayClassName="overlay"
        >
          <AddWorkoutForm
            addWorkout={this.props.addWorkout}
            userId={this.props.match.params.userId}
            onModalClose={this.onModalClose}
          />
        </ReactModal>
        <ReactModal
          isOpen={this.state.showTeamModal}
          contentLabel="Create Team"
          className="modal"
          overlayClassName="overlay"
        >
          <AddTeamForm
            addTeam={this.props.addTeam}
            userId={this.props.match.params.userId}
            onTeamModalClose={this.onTeamModalClose}
          />
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,
  { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts,
    updateWorkout, updateUser, deleteWorkout, addTeam })(HomePage));
