import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './nav';
import PrivateRoute from './private-route';
import FrontPage from '../containers/front-page';
import SignUp from '../containers/sign-up';
import SignIn from '../containers/sign-in';
import HomePage from '../containers/home-page';
import Profile from '../containers/profile';
import '../style.scss';

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/home/:userId" component={HomePage} isAuthenticated={props.authenticated} />
          <PrivateRoute path="/profile/:userId" component={Profile} isAuthenticated={props.authenticated} />
          <Route render={() => (<FrontPage />)} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps, null)(App);
