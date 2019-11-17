import React from 'react';
import firebase from "./firebase";
import './firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Client from './screens/Client/Client'
import User from './screens/User/User'
import LogIn from './components/LogIn';

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogin: true
    }
    this.checkIfLogged2 = this.checkIfLogged.bind(this)
  }

  componentWillMount() {
    this.checkIfLogged(firebase.auth().currentUser);
  }
  checkIfLogged(user) {
    if (user != null) {
      currentThis.setState({ ...currentThis.state, showLogin: false })
      return
    }
    var currentThis = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        currentThis.setState({ ...currentThis.state, showLogin: false })
      } else {
        currentThis.setState({ ...currentThis.state, showLogin: true })
      }

    });

  }

  render() {
    var currentThis = this
    return (
      <Router>
        <Switch>
          <Route path="/user">
            {this.state.showLogin ? <LogIn onSubmit={this.checkIfLogged} /> : <User />}
          </Route>
          <Route path="/client">
            <Client />
          </Route>
        </Switch>
      </Router>
    )

  }

}

export default App;
