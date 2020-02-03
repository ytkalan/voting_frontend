import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './component/Home';
import VoteDetail from './component/VoteDetail';
import './App.css';


const App = () => (
  <Router>
    <Switch>
      <Route path='/:campaign_id'>
        <VoteDetail />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  </Router>
)

export default App;
