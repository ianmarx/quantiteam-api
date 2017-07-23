import React, { Component } from 'react';
import ResultPost from './result-post';

class ResultsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderState: '',
    };
  }
  render() {
    return (
      <div className="results-container">
        <div className="results-view">
          <div className="results-title">
            Workout Results
          </div>
          <div className="results-feed">
            {this.props.results.map((workout, i) => {
              return (
                <div key={`workout-${i}`}>
                  <ResultPost workout={workout} index={i} teamWorkoutId={this.props.teamWorkoutId}
                    onDeleteClick={this.props.onDeleteClick} updateWorkout={this.props.updateWorkout}
                  />
                </div>
              );
            })}
          </div>
          <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default ResultsView;
