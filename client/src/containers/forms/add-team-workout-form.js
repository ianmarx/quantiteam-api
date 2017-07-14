import React, { Component } from 'react';

class AddTeamWorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      distUnit: '',
      distance: '',
      hours: '',
      minutes: '',
      seconds: '',
    };
    this.onActivityChange = this.onActivityChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onDistUnitChange = this.onDistUnitChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
  }
  /* Handle changes in the add workout fields */
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
  /* Add a workout using the form */
  onSubmit(event) {
    console.log('Team Workout add submitted');
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const teamId = this.props.teamId;
    const workoutObject = { activity, distance, distUnit, time, teamId };
    this.props.addTeamWorkout(workoutObject, this.props.userId);
  }
  /* convert the strings of each time values into the total number of seconds */
  timeConvert() {
    return ((parseFloat(this.state.hours, 10) * 3600) +
            (parseFloat(this.state.minutes, 10) * 60) +
            (parseFloat(this.state.seconds, 10).toPrecision(3) * 1));
  }
  render() {
    return (
      <div className="form-container">
        <form className="modal-form" onSubmit={this.onSubmit}>
          <div className="form-title">Add Team Workout</div>
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
                  type="text"
                />
                <h3>Minutes</h3>
                <input onChange={this.onMinutesChange} value={this.state.minutes}
                  type="text"
                />
                <h3>Seconds</h3>
                <input onChange={this.onSecondsChange} value={this.state.seconds}
                  type="text"
                />
              </li>
            </ul>
            <ul className="form-column">
              <li>
                <h3>Activity</h3>
                <select value={this.state.activity} onChange={this.onActivityChange}>
                  <option default>Select</option>
                  <option value="erg">Ergometer</option>
                  <option value="row">Rowing</option>
                  <option value="run">Running</option>
                  <option value="bike">Cycling</option>
                </select>
              </li>
              <li>
                <h3>Distance Units</h3>
                <select value={this.state.distUnit} onChange={this.onDistUnitChange}>
                  <option default>Select</option>
                  <option value="m">m</option>
                  <option value="km">km</option>
                  <option value="mi">mi</option>
                </select>
              </li>
              <div className="button-group">
                <button type="submit" className="modal-submit">Submit</button>
                <button className="modal-close" onClick={this.props.onModalClose}>Close</button>
              </div>
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTeamWorkoutForm;
