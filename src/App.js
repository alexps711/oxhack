import React from 'react';
import firebase from "./firebase";
import './components/Firebase/firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Client from './screens/Client/Client'
import User from './screens/User/User'
import LogIn from './components/LogIn';

import Error from './components/Error/Error';


import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogin: true,
      useruid: null
    }
    this.checkIfLogged2 = this.checkIfLogged.bind(this)
  }

  componentWillMount() {
    this.checkIfLogged(firebase.auth().currentUser);
  }
  checkIfLogged(user) {
    if (user != null) {
      this.setState({ ...this.state, showLogin: false, useruid: user.uid })
      return
    }
    var currentThis = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        currentThis.setState({ ...currentThis.state, showLogin: false, useruid: user.uid })
      } else {
        currentThis.setState({ ...currentThis.state, showLogin: true })
      }

    });

  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="">
            {this.state.showLogin ? <LogIn onSubmit={this.checkIfLogged} /> : <User uid={this.state.useruid} />}
          </Route>
          <Route path="/client/:userid/:clientid">
            <Client />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
        </Switch>
      </Router>
    )

  }


}

export default App;