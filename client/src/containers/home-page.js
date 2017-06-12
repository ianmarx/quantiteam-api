import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser, addWorkout, fetchWorkout } from '../actions';


const mapStateToProps = state => (
  {
    user: state.profile.user,
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
    this.displayFeed = this.displayFeed.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }
  onDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }
  onTimeChange(event) {
    this.setState({ time: event.target.value });
  }
  onSubmit(event) {
    console.log('Workout add submitted');
    event.stopPropagation();

    const distance = this.state.distance;
    const time = this.state.time;

    const workoutObject = { distance, time };
    this.props.addWorkout(workoutObject, this.props.match.params.userId, this.props.history);
    this.props.fetchUser(this.props.match.params.userId);
  }
  displayFeed() {
    return (
      <div>
        <div>{this.props.user.workouts}</div>
      </div>
    );
  }
  render() {
    return (
      <div>
        This is the homepage for {this.props.user.name}.
        {this.displayFeed()}

        <div className="testForm">
          <form onSubmit={this.onSubmit}>
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

export default withRouter(connect(mapStateToProps, { fetchUser, addWorkout, fetchWorkout })(HomePage));
