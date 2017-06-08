import React, { Component } from 'react';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    this.props.history.push('/signup');
  }
  render() {
    return (
      <div className="site-welcome">
        <h1>Quantiteam</h1>
        <h3>Quantitative data solutions for coaches and athletes</h3>
        <div className="site-blurb">
          Designed for sports where results are measured in time and distance,
          Quantiteam allows coaches and athletes to centralize their training records
          and analyze progress over time.
        </div>
        <button id="signup-button" onClick={this.onSubmit}>Get started</button>
      </div>
    );
  }
}

export default FrontPage;
