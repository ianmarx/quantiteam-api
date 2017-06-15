import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts } from '../actions';

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
      distance: '',
      time: '',
    };
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayFeed = this.displayFeed.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }
  onDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }
  onTimeChange(event) {
    this.setState({ time: event.target.value });
  }
  onSubmit(event) {
    console.log('Workout add submitted');
    const distance = this.state.distance;
    const time = this.state.time;
    const workoutObject = { distance, time };
    this.props.addWorkout(workoutObject, this.props.match.params.userId, this.props.history);
  }
  displayFeed() {
    return (
      <div>
        <h1>Workout Feed: {this.props.user.name}</h1>
        {this.props.workouts.map((workout, i) => {
          return (
            <div className="workout-div" key={`workout-${i}`}>
              <div className="distance">{workout.distance}</div>
              <div className="timeString">{workout.timeString}</div>
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="workout-feed">
          {this.displayFeed()}
        </div>
        <div className="testForm">
          <form onSubmit={this.onSubmit}>
            <h2>Add a Workout</h2>
            <div id="distance-field">
              <h3>Distance</h3>
              <input onChange={this.onDistanceChange} value={this.state.distance}
                type="text" required
              />
            </div>
            <div id="time-field">
              <h3>Time</h3>
              <input onChange={this.onTimeChange} value={this.state.time}
                type="text" required
              />
            </div>
            <button type="submit" className="workout-submit">Add Workout</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,
  { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts })(HomePage));
