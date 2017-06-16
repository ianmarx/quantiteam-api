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
      hours: '',
      minutes: '',
      seconds: '',
    };
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
    this.displayFeed = this.displayFeed.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }
  onDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }
  onHoursChange(event) {
    this.setState({ hours: event.target.value });
  }
  onMinutesChange(event) {
    this.setState({ minutes: event.target.value });
  }
  onSecondsChange(event) {
    this.setState({ seconds: event.target.value });
  }
  onSubmit(event) {
    console.log('Workout add submitted');
    const distance = this.state.distance;
    const time = this.timeConvert();
    const workoutObject = { distance, time };
    this.props.addWorkout(workoutObject, this.props.match.params.userId, this.props.history);
  }
  timeConvert() {
    return ((parseFloat(this.state.hours, 10) * 3600) +
            (parseFloat(this.state.minutes, 10) * 60) +
            (parseFloat(this.state.seconds, 10).toPrecision(3) * 1));
  }
  displayFeed() {
    return (
      <div>
        {this.props.workouts.map((workout, i) => {
          return (
            <div className="workout-div" key={`workout-${i}`}>
              <div className="description">
                {workout.creatorName}
              </div>
              <ul>
                <li>
                  <div>{workout.distance}m</div>
                </li>
                <li>
                  <div>{workout.timeString}</div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div className="workout-page">
        <div className="workout-feed">
          <h1>Workout Feed: {this.props.user.name}</h1>
          {this.displayFeed()}
        </div>
        <div className="indiv-workout-form">
          <form onSubmit={this.onSubmit}>
            <ul>
              <li>
                <div>Add a Workout</div>
              </li>
              <li id="distance-field">
                <h3>Distance</h3>
                <input onChange={this.onDistanceChange} value={this.state.distance}
                  type="text" required
                />
              </li>
              <li id="time-field">
                <h3>Hours</h3>
                <input onChange={this.onHoursChange} value={this.state.hours}
                  type="text" required
                />
                <h3>Minutes</h3>
                <input onChange={this.onMinutesChange} value={this.state.minutes}
                  type="text" required
                />
                <h3>Seconds</h3>
                <input onChange={this.onSecondsChange} value={this.state.seconds}
                  type="text" required
                />
              </li>
              <button type="submit" className="workout-submit">Add Workout</button>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,
  { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts })(HomePage));
