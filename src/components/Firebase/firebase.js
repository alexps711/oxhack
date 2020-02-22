
import 'firebase/auth';

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}

class Firebase {

  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.auth = firebase.auth();
  }

  // *** Auth API ***
doCreateUserWithEmailAndPassword = (email, password) =>
this.auth.createUserWithEmailAndPassword(email, password);

doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

doSignOut = () => this.auth.signOut();

doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);

}
export default Firebase;




