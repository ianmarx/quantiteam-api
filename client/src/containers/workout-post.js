import React, { Component } from 'react';
import round from 'lodash.round';

class WorkoutPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      activity: this.props.workout.activity,
      distance: this.props.workout.distance,
      distUnit: this.props.workout.distUnit,
      hours: '',
      minutes: '',
      seconds: '',
      strokeRate: this.props.workout.strokeRate || '',
      watts: this.props.workout.watts || '',
      avgHR: this.props.workout.avgHR || '',
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
    this.onLocalDeleteClick = this.onLocalDeleteClick.bind(this);
    this.onLocalEditClick = this.onLocalEditClick.bind(this);
    this.displayAvgHR = this.displayAvgHR.bind(this);
    this.displayStrokeRate = this.displayStrokeRate.bind(this);
    this.displayWatts = this.displayWatts.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    /* split up the time value into separate units for editing mode */
    const h = Math.floor(this.props.workout.time / 3600);
    const remainder = this.props.workout.time % 3600;
    const m = Math.floor(remainder / 60);
    const s = round((remainder % 60), 1);
    this.setState({
      hours: h,
      minutes: m,
      seconds: s,
    });
  }
  onLocalEditClick(event) {
    this.setState({ isEditing: true });
  }
  onLocalDeleteClick(event) {
    this.props.onDeleteClick(this.props.workout._id, this.props.userId);
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
  onStrokeRateChange(event) {
    this.setState({ strokeRate: event.target.value });
  }
  onWattsChange(event) {
    this.setState({ watts: event.target.value });
  }
  onHeartRateChange(event) {
    this.setState({ avgHR: event.target.value });
  }
  onCancelClick(event) {
    this.setState({ isEditing: false });
  }
  onSubmit(event) {
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const strokeRate = this.state.strokeRate;
    const watts = this.state.watts;
    const avgHR = this.state.avgHR;
    const workoutObject = { activity, distance, distUnit, time, strokeRate, watts, avgHR };
    this.props.updateWorkout(this.props.workout._id, workoutObject);
  }
  /* Only display HR, stroke rate, and watts if the values exist */
  displayAvgHR() {
    if (this.props.workout.avgHR) {
      return <div><hr />{this.props.workout.avgHR} bpm</div>;
    } else {
      return <div />;
    }
  }
  displayStrokeRate() {
    if (this.props.workout.strokeRate) {
      return <div><hr />{this.props.workout.strokeRate} s/m</div>;
    } else {
      return <div />;
    }
  }
  displayWatts() {
    if (this.props.workout.watts) {
      return <div><hr />{this.props.workout.watts} watts</div>;
    } else {
      return <div />;
    }
  }
  /* convert the strings of each time values into the total number of seconds */
  timeConvert() {
    return ((parseFloat(this.state.hours, 10) * 3600) +
            (parseFloat(this.state.minutes, 10) * 60) +
            (parseFloat(this.state.seconds, 10).toPrecision(3) * 1));
  }
  renderContent() {
    if (this.state.isEditing) {
      return (
        <form className="workout-edit-form" onSubmit={this.onSubmit}>
          <div className="workout-div-column">
            <div className="workout-div-creator">
              <strong>{this.props.workout.creatorName}</strong>
            </div>
          </div>
          <div className="workout-div-column">
            <ul>
              <li>
                <div>Distance</div>
                <input onChange={this.onDistanceChange} value={this.state.distance} type="text" />
              </li>
              <li>
                <div>Hours</div>
                <input onChange={this.onHoursChange} value={this.state.hours} type="text" />
              </li>
              <li>
                <div>Minutes</div>
                <input onChange={this.onMinutesChange} value={this.state.minutes} type="text" />
              </li>
              <li>
                <div>Seconds</div>
                <input onChange={this.onSecondsChange} value={this.state.seconds} type="text" />
              </li>
              <li>
                <div>Average HR (bpm)</div>
                <input onChange={this.onHeartRateChange} value={this.state.avgHR}
                  type="text"
                />
              </li>
            </ul>
          </div>
          <div className="workout-div-column">
            <ul>
              <li>
                <div>Activity</div>
                <select value={this.state.activity} onChange={this.onActivityChange}>
                  <option default>Select</option>
                  <option value="erg">Ergometer</option>
                  <option value="row">Rowing</option>
                  <option value="run">Running</option>
                  <option value="bike">Cycling</option>
                </select>
              </li>
              <li>
                <div>Distance Units</div>
                <select value={this.state.distUnit} onChange={this.onDistUnitChange}>
                  <option default>Select</option>
                  <option value="m">m</option>
                  <option value="km">km</option>
                  <option value="mi">mi</option>
                </select>
              </li>
              <li>
                <div>Stroke Rate</div>
                <input onChange={this.onStrokeRateChange} value={this.state.strokeRate}
                  type="text"
                />
              </li>
              <li>
                <div>Watts</div>
                <input onChange={this.onWattsChange} value={this.state.watts}
                  type="text"
                />
              </li>
              <button type="button" className="workout-edit-cancel" onClick={this.onCancelClick}>Cancel</button>
              <button type="submit" className="workout-edit-submit">Save</button>
            </ul>
          </div>
        </form>
      );
    } else {
      return (
        <div className="workout-content">
          <div className="workout-div-column">
            <div className="workout-div-creator">
              <strong>{this.props.workout.creatorName}</strong>
            </div>
          </div>
          <div className="workout-div-column">
            <div>{this.props.workout.distance} {this.props.workout.distUnit} {this.props.workout.activity}</div>
            {this.displayStrokeRate()}
            {this.displayAvgHR()}
          </div>
          <div className="workout-div-column">
            <div>{this.props.workout.timeString}</div>
            {this.displayWatts()}
          </div>
          <div className="workout-div-column">
            <div className="icon">
              <i onClick={this.onLocalEditClick} className="fa fa-pencil-square-o" />
            </div>
            <div className="icon">
              <i onClick={this.onLocalDeleteClick} className="fa fa-trash-o" />
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="workout-post">
        {this.renderContent()}
      </div>
    );
  }
}

export default WorkoutPost;
