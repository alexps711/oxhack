import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import Client from './screens/Client'
import User from './screens/User'

import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
      <Route path="/client" exact component={Client}/>
      <Route path="/user" exact component={User}/>
      </Router>
    </div>
  );
}

export default App;
