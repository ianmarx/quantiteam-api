import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FrontPage from './front-page';
import '../style.scss';

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route render={() => (<div>Page not found.</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
