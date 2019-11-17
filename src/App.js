import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Client from './screens/Client/Client';
import User from './screens/User/User';
import Error from './components/Error/Error';


import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/client/:id">
          <Client />
        </Route>
        <Route path="/error">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
