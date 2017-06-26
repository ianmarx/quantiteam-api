import React, { Component } from 'react';

class CreateTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userType: '',
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }
  onTypeChange(event) {
    this.setState({ userType: event.target.value });
  }
  onSubmit(event) {
    console.log('New team submitted');
    const name = this.state.name;
    const userType = this.state.userType;
    console.log(name);
    console.log(userType);
    const teamObject = { name, userType };
    this.props.addTeam(teamObject, this.props.userId);
  }
  render() {
    return (
      <div className="form-container">
        <form className="modal-form" id="addTeam" onSubmit={this.onSubmit}>
          <div className="form-title">Add Team</div>
          <div className="column-group">
            <ul id="team-form-column">
              <li>
                <h3>Team Name</h3>
                <input id="teamName" onChange={this.onNameChange} value={this.state.name}
                  type="text" required
                />
              </li>
              <li>
                <h3>Your Role</h3>
                <select id="userType" onChange={this.onTypeChange} value={this.state.userType}>
                  <option default>Select</option>
                  <option value="athlete">Athlete</option>
                  <option value="coach">Coach</option>
                </select>
              </li>
              <div className="button-group">
                <button type="submit" className="modal-submit">Submit</button>
                <button className="modal-close" onClick={this.props.onTeamModalClose}>Close</button>
              </div>
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTeamForm;
