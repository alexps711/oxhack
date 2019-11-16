import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Client from './screens/Client'
import User from './screens/User/User'

import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/client">
          <Client />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
