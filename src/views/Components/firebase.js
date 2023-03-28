 import app from 'firebase/app';
 import 'firebase/auth';
 import 'firebase/firestore'
 import 'firebase/database'
 import 'firebase/storage'
 import * as app2 from 'firebase/app';
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const config = {
    apiKey: "AIzaSyACTAxDr5Spbc3_N4rjY-pT_nIi6oB4Uxg",
    authDomain: "intellectual-instructor.firebaseapp.com",
    projectId: "intellectual-instructor",
    storageBucket: "intellectual-instructor.appspot.com",
    messagingSenderId: "747601689275",
    appId: "1:747601689275:web:f31c9cbf405a2f04cc479e",
    measurementId: "G-TC6LFDK4EW"
  };
  // Initialize Firebase
  export const firebase = app.initializeApp(config);
  export var db = firebase.firestore();
  export var db1 = app;
  export const provider = new app.auth.GoogleAuthProvider();
  export const fbprovider = new app.auth.FacebookAuthProvider();
  export var storage = firebase.storage();
  // export default { firebase, db };