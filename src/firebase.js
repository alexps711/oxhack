import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAuuQHlOFs37T232kNn0_mFDWY2oaLjd1E",
    authDomain: "oxhack-1fda3.firebaseapp.com",
    databaseURL: "https://oxhack-1fda3.firebaseio.com",
    projectId: "oxhack-1fda3",
    storageBucket: "oxhack-1fda3.appspot.com",
    messagingSenderId: "189630870939",
    appId: "1:189630870939:web:e492af7ea36b7ca356dd3e",
    measurementId: "G-ZXCC81YXKM"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
