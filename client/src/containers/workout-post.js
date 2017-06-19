import React, { Component } from 'react';

class WorkoutPost extends Component {
  constructor(props) {
    super(props);
    this.onThisDeleteClick = this.onThisDeleteClick.bind(this);
  }
  onThisDeleteClick(event) {
    this.props.onDeleteClick(this.props.workout._id, this.props.userId);
  }
  render() {
    return (
      <div className="workout-div" key={`workout-${this.props.index}`}>
        <div className="workout-div-column">
          <div className="workout-div-creator">
            <strong>{this.props.workout.creatorName}</strong>
          </div>
        </div>
        <div className="workout-div-column">
          <div>{this.props.workout.distance}{this.props.workout.distUnit} {this.props.workout.activity}</div>
          <div>{this.props.workout.strokeRate} s/m</div>
          <div>{this.props.workout.avgHR} bpm</div>
        </div>
        <div className="workout-div-column">
          <div>{this.props.workout.timeString}</div>
          <div>{this.props.workout.watts} watts</div>
        </div>
        <div className="workout-div-column">
          <div className="icon">
            <i onClick={this.props.onEditClick} className="fa fa-pencil-square-o" />
          </div>
          <div className="icon">
            <i onClick={this.onThisDeleteClick}
              className="fa fa-trash-o"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WorkoutPost;
