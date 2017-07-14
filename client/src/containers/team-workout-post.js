import React, { Component } from 'react';

class TeamWorkoutPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      activity: this.props.teamWorkout.activity,
      distance: this.props.teamWorkout.distance,
      distUnit: this.props.teamWorkout.distUnit,
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
    this.onLocalDeleteClick = this.onLocalDeleteClick.bind(this);
    this.onLocalEditClick = this.onLocalEditClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }
  onLocalEditClick(event) {
    this.setState({ isEditing: true });
  }
  onLocalDeleteClick(event) {
    this.props.onDeleteClick(this.props.teamWorkout._id, this.props.teamWorkout._team);
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
  onCancelClick(event) {
    this.setState({ isEditing: false });
  }
  onSubmit(event) {
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const teamWorkoutObject = { activity, distance, distUnit };
    this.props.updateTeamWorkout(this.props.teamWorkout._id, teamWorkoutObject);
  }
  renderContent() {
    if (this.state.isEditing) {
      return (
        <form className="workout-edit-form" onSubmit={this.onSubmit}>
          <div className="workout-div-column">
            <div className="workout-div-creator">
              <strong>{this.props.teamWorkout.teamName}</strong>
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
              <strong>{this.props.teamWorkout.teamName}</strong>
            </div>
          </div>
          <div className="workout-div-column">
            <div>{this.props.teamWorkout.distance} {this.props.teamWorkout.distUnit} {this.props.teamWorkout.activity}</div>
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
      <div className="team-workout-post">
        {this.renderContent()}
      </div>
    );
  }
}

export default TeamWorkoutPost;
