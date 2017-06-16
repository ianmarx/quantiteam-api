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
      activity: '',
      distUnit: '',
      distance: '',
      hours: '',
      minutes: '',
      seconds: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
    };
    this.onActivityChange = this.onActivityChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onDistUnitChange = this.onDistUnitChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
    this.displayFeed = this.displayFeed.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }
  onActivityChange(event) {
    this.setState({ activity: event.target.value });
  }
  onDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }
  onDistUnitChange(event) {
    this.setState({ distUnit: event.target.value });
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
  onStrokeRateChange(event) {
    this.setState({ strokeRate: event.target.value });
  }
  onWattsChange(event) {
    this.setState({ watts: event.target.value });
  }
  onHeartRateChange(event) {
    this.setState({ avgHR: event.target.value });
  }
  onSubmit(event) {
    event.stopPropagation();
    console.log('Workout add submitted');
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const strokeRate = this.state.strokeRate;
    const watts = this.state.watts;
    const avgHR = this.state.avgHR;
    const workoutObject = { activity, distance, distUnit, time, strokeRate,
      watts, avgHR };
    this.props.addWorkout(workoutObject, this.props.match.params.userId, this.props.history);
  }
  /* convert the strings of time values into the total number of seconds */
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
                <strong>{workout.creatorName}</strong>
              </div>
              <div>{workout.activity}</div>
              <div>{workout.distance}{workout.distUnit}</div>
              <div>{workout.timeString}</div>
              <div>{workout.strokeRate} s/m</div>
              <div>{workout.watts} watts</div>
              <div>{workout.avgHR} bpm</div>
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
          <div id="feed-title">Workout Feed</div>
          {this.displayFeed()}
        </div>
        <div className="indiv-workout-form">
          <form onSubmit={this.onSubmit}>
            <div className="form-title">Add Workout</div>
            <div className="column-group">
              <ul className="form-column">
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
                <li>
                  <h3>Average HR (bpm)</h3>
                  <input onChange={this.onHeartRateChange} value={this.state.avgHR}
                    type="text" required
                  />
                </li>
              </ul>
              <ul className="form-column">
                <li>
                  <h3>Activity</h3>
                  <select value={this.state.activity} onChange={this.onActivityChange}>
                    <option value="erg">Ergometer</option>
                    <option value="row">Rowing</option>
                    <option value="run">Running</option>
                    <option value="bike">Cycling</option>
                  </select>
                </li>
                <li>
                  <h3>Distance Units</h3>
                  <select value={this.state.distUnit} onChange={this.onDistUnitChange}>
                    <option value="m">m</option>
                    <option value="km">km</option>
                    <option value="mi">mi</option>
                  </select>
                </li>
                <li>
                  <h3>Stroke Rate</h3>
                  <input onChange={this.onStrokeRateChange} value={this.state.strokeRate}
                    type="text" required
                  />
                </li>
                <li>
                  <h3>Watts</h3>
                  <input onChange={this.onWattsChange} value={this.state.watts}
                    type="text" required
                  />
                </li>
                <button type="submit" className="workout-submit">Add Workout</button>
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,
  { fetchUser, addWorkout, fetchWorkout, fetchUserWorkouts })(HomePage));
