import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../actions';

const mapStateToProps = state => (
  {
    user: state.profile.user,
  }
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.displayInfo = this.displayInfo.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }
  displayInfo() {
    return (
      <div> This is the profile for {this.props.user.name}.</div>
    );
  }
  render() {
    return (
      <div>
        This is the profile page.
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser })(Profile));
