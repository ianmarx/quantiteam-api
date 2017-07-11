import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts, fetchTeamSoloWorkouts,
  updateWorkout, updateUser, deleteWorkout, createTeam, joinTeam, fetchUserTeam,
  addTeamWorkout, fetchTeamWorkouts } from '../actions';
import WorkoutPost from './workout-post';
import AddWorkoutForm from './forms/add-workout-form';
import AddTeamWorkoutForm from './forms/add-team-workout-form';
import CreateTeamForm from './forms/create-team-form';
import JoinTeamForm from './forms/join-team-form';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.list,
    teamSoloWorkouts: state.workouts.teamList,
    team: state.team.team,
    authenticated: state.auth.authenticated,
    teamWorkouts: state.teamWorkouts.list,
  }
);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showTeamModal: false,
      showJoinModal: false,
      showTeamWorkoutModal: false,
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onTeamModalOpen = this.onTeamModalOpen.bind(this);
    this.onTeamModalClose = this.onTeamModalClose.bind(this);
    this.onJoinModalOpen = this.onJoinModalOpen.bind(this);
    this.onJoinModalClose = this.onJoinModalClose.bind(this);
    this.onTeamWorkoutModalOpen = this.onTeamWorkoutModalOpen.bind(this);
    this.onTeamWorkoutModalClose = this.onTeamWorkoutModalClose.bind(this);
    this.displayFeed = this.displayFeed.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
    this.props.fetchTeamSoloWorkouts(this.props.match.params.userId);
    this.props.fetchTeamWorkouts(this.props.match.params.userId);
  }
  /* this is called in the WorkoutPost component by onLocalDeleteClick */
  /* this setup is used so that both ID's can be passed to deleteWorkout() */
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
  onJoinModalOpen(event) {
    this.setState({ showJoinModal: true });
  }
  onJoinModalClose(event) {
    this.setState({ showJoinModal: false });
  }
  onTeamWorkoutModalOpen(event) {
    this.setState({ showAddTeamWorkoutModal: true });
  }
  onTeamWorkoutModalClose(event) {
    this.setState({ showAddTeamWorkoutModal: false });
  }
  displayFeed() {
    if (!this.props.team._id) {
      this.props.workouts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
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
    } else {
      this.props.teamSoloWorkouts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      return (
        <div className="workout-posts">
          {this.props.teamSoloWorkouts.map((workout, i) => {
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
  }
  render() {
    return (
      <div className="home-page">
        <div className="workout-feed">
          <div id="feed-title">Workout Feed</div>
          <div className="button-group">
            <button className="modal-button" id="addWorkoutForm" onClick={this.onModalOpen}>Add Workout</button>
            {this.props.user.team &&
              <button className="team-workout-modal-button" onClick={this.onTeamWorkoutModalOpen}>Add Team Workout</button>
            }
            {!this.props.user.team &&
              <button className="create-modal-button" id="createTeamForm" onClick={this.onTeamModalOpen}>Create Team</button>
            }
            {!this.props.user.team &&
              <button className="join-modal-button" id="joinTeamForm" onClick={this.onJoinModalOpen}>Join Team</button>
            }
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
            onModalClosed={this.onModalClose}
          />
        </ReactModal>
        <ReactModal
          isOpen={this.state.showTeamModal}
          contentLabel="Create Team"
          className="modal"
          overlayClassName="overlay"
        >
          <CreateTeamForm
            createTeam={this.props.createTeam}
            userId={this.props.match.params.userId}
            onTeamModalClose={this.onTeamModalClose}
          />
        </ReactModal>
        <ReactModal
          isOpen={this.state.showJoinModal}
          contentLabel="Create Team"
          className="modal"
          overlayClassName="overlay"
        >
          <JoinTeamForm
            joinTeam={this.props.joinTeam}
            userId={this.props.match.params.userId}
            onJoinModalClose={this.onJoinModalClose}
          />
        </ReactModal>
        <ReactModal
          isOpen={this.state.showAddTeamWorkoutModal}
          contentLabel="Add Team Workout"
          className="modal"
          overlayClassName="overlay"
        >
          <AddTeamWorkoutForm
            addTeamWorkout={this.props.addTeamWorkout}
            userId={this.props.match.params.userId}
            teamId={this.props.team._id}
            onModalClose={this.onTeamWorkoutModalClose}
          />
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,
  { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts, fetchTeamSoloWorkouts,
    updateWorkout, updateUser, deleteWorkout, createTeam, joinTeam, fetchUserTeam,
    addTeamWorkout, fetchTeamWorkouts })(HomePage));
