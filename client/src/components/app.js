import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FrontPage from '../containers/front-page';
import SignUp from '../containers/sign-up';
import HomePage from '../containers/home-page';
import '../style.scss';

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/home" component={HomePage} />
          <Route render={() => (<div>Page not found.</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
