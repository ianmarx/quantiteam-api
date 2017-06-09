import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => (
  {
    user: state.profile.user,
  }
);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.displayFeed = this.displayFeed.bind(this);
  }
  displayFeed() {
    return (
      <div>This is the workout feed for {this.props.user.name}.</div>
    );
  }
  render() {
    return (
      <div>Homepage</div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(HomePage));
