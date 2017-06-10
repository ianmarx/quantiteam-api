import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../actions';


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
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }
  displayFeed() {
    return (
      <div>This is the workout feed for {this.props.user.name}.</div>
    );
  }
  render() {
    return (
      <div>
        This is the homepage.
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser })(HomePage));
