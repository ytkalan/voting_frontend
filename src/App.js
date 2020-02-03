import React from 'react';
import './App.css';

import {
  Route,
  HashRouter as Router,
  Switch,
} from 'react-router-dom';

import Home from './component/Home';
import VoteDetail from './component/VoteDetail';

const App = () => (
  <Router>
    <Switch>
      <Route path="/:campaign_id">
        <VoteDetail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;
