import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts, fetchTeamSoloWorkouts,
  updateWorkout, updateUser, deleteWorkout, createTeam, joinTeam, fetchUserTeam,
  addTeamWorkout, fetchTeamWorkouts, fetchTeamWorkout, updateTeamWorkout, deleteTeamWorkout,
  addResult, fetchDistResults, fetchTimeResults, matchAthlete, deleteResult } from '../actions';
import WorkoutPost from './workout-post';
import TeamWorkoutPost from './team-workout-post';
import AddWorkoutForm from './forms/add-workout-form';
import AddTeamWorkoutForm from './forms/add-team-workout-form';
import CreateTeamForm from './forms/create-team-form';
import JoinTeamForm from './forms/join-team-form';
import AddResultForm from './forms/add-result-form';
import ResultsView from './results-view';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.list,
    teamSoloWorkouts: state.workouts.teamList,
    team: state.team.team,
    authenticated: state.auth.authenticated,
    teamWorkouts: state.teamWorkouts.list,
    currentTeamWorkout: state.teamWorkouts.current,
    currentResults: state.teamWorkouts.results,
    queryResults: state.profile.queryResults,
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
      showAddResultModal: false,
      showViewResultModal: false,
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
    this.onTeamWorkoutDeleteClick = this.onTeamWorkoutDeleteClick.bind(this);
    this.onAddResultModalOpen = this.onAddResultModalOpen.bind(this);
    this.onAddResultModalClose = this.onAddResultModalClose.bind(this);
    this.onViewResultModalOpen = this.onViewResultModalOpen.bind(this);
    this.onViewResultModalClose = this.onViewResultModalClose.bind(this);
    this.onResultAddClick = this.onResultAddClick.bind(this);
    this.onResultDeleteClick = this.onResultDeleteClick.bind(this);
    this.onViewResultsClick = this.onViewResultsClick.bind(this);
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
  onResultDeleteClick(workoutId, teamWorkoutId) {
    this.props.deleteResult(workoutId, teamWorkoutId);
    this.props.fetchResults(teamWorkoutId);
  }
  onTeamWorkoutDeleteClick(workoutId, teamId) {
    this.props.deleteTeamWorkout(workoutId, teamId);
    console.log('Team workout deleted successfully');
    this.props.fetchTeamWorkouts(this.props.match.params.userId);
  }
  onResultAddClick(teamWorkoutId, prevProps) {
    const promise = new Promise((resolve, reject) => {
      this.props.fetchTeamWorkout(teamWorkoutId);

      setTimeout(() => {
        if (teamWorkoutId === this.props.currentTeamWorkout._id) {
          resolve('State was changed');
        } else {
          reject('State was not changed');
        }
      }, 250);
    });
    promise.then((result) => {
      console.log(result);
      this.onAddResultModalOpen();
    })
    .catch((error) => {
      console.log(error);
    });
  }
  onViewResultsClick(teamWorkoutId, type) {
    console.log(type);
    this.props.fetchTeamWorkout(teamWorkoutId);
    if (type === 'distance') {
      this.props.fetchTimeResults(teamWorkoutId);
    } else if (type === 'time') {
      this.props.fetchDistResults(teamWorkoutId);
    }
    this.onViewResultModalOpen();
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
  onAddResultModalOpen(event) {
    this.setState({ showAddResultModal: true });
  }
  onAddResultModalClose(event) {
    this.setState({ showAddResultModal: false });
  }
  onViewResultModalOpen(event) {
    this.setState({ showViewResultModal: true });
  }
  onViewResultModalClose(event) {
    this.setState({ showViewResultModal: false });
  }
  displayFeed() {
    if (!this.props.team._id) {
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
  }
  displayTeamFeed() {
    return (
      <div className="workout-posts">
        {this.props.teamWorkouts.map((workout, i) => {
          return (
            <div key={`workout-${i}`}>
              <TeamWorkoutPost userId={workout._creator} teamWorkout={workout} index={i}
                onDeleteClick={this.onTeamWorkoutDeleteClick}
                updateTeamWorkout={this.props.updateTeamWorkout}
                onResultAddClick={this.onResultAddClick}
                onViewResultsClick={this.onViewResultsClick}
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
          <div id="feed-title">Solo Workouts</div>
          <div className="button-group">
            <button id="modal-button" onClick={this.onModalOpen}>Add Workout</button>
            {!this.props.user.team &&
              <button id="create-modal-button" onClick={this.onTeamModalOpen}>Create Team</button>
            }
            {!this.props.user.team &&
              <button id="join-modal-button" onClick={this.onJoinModalOpen}>Join Team</button>
            }
          </div>
          {this.displayFeed()}
        </div>
        {this.props.user.team &&
          <div className="workout-feed">
            <div id="feed-title">Team Workouts</div>
            <button id="team-workout-modal-button" onClick={this.onTeamWorkoutModalOpen}>Add Team Workout</button>
            {this.displayTeamFeed()}
          </div>
        }
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
        <ReactModal
          isOpen={this.state.showAddResultModal}
          contentLabel="Add Result"
          className="modal"
          overlayClassName="overlay"
        >
          {this.props.currentTeamWorkout._id !== undefined &&
            <AddResultForm
              teamWorkout={this.props.currentTeamWorkout}
              addResult={this.props.addResult}
              matchAthlete={this.props.matchAthlete}
              queryResults={this.props.queryResults}
              onModalClose={this.onAddResultModalClose}
            />
          }
        </ReactModal>
        <ReactModal
          isOpen={this.state.showViewResultModal}
          contentLabel="Workout Results"
          className="modal"
          overlayClassName="overlay"
        >
          {this.props.currentResults !== undefined &&
            <ResultsView
              results={this.props.currentResults}
              teamWorkoutId={this.props.currentTeamWorkout._id}
              onDeleteClick={this.onResultDeleteClick}
              updateWorkout={this.props.updateWorkout}
              onModalClose={this.onViewResultModalClose}
            />
          }
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,
  { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts, fetchTeamSoloWorkouts,
    updateWorkout, updateUser, deleteWorkout, createTeam, joinTeam, fetchUserTeam,
    addTeamWorkout, fetchTeamWorkouts, fetchTeamWorkout, updateTeamWorkout,
    deleteTeamWorkout, addResult, fetchDistResults, fetchTimeResults, matchAthlete,
    deleteResult })(HomePage));
