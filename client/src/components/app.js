import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './nav';
import FrontPage from '../containers/front-page';
import SignUp from '../containers/sign-up';
import SignIn from '../containers/sign-in';
import HomePage from '../containers/home-page';
import Profile from '../containers/profile';
import '../style.scss';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/home/:userId" component={HomePage} />
          <Route path="/profile/:userId" component={Profile} />
          <Route render={() => (<div>Page not found.</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
