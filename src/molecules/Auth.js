// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {
  Button, Dialog, DialogContent, 
  DialogTitle, DialogActions, 
  } from '@material-ui/core';

// Configure Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyB_cIwxz8U3ZPZduCISW6K8eZW9Cree9o0",
    authDomain: "test-lurndit.firebaseapp.com",
    databaseURL: "https://test-lurndit.firebaseio.com",
    projectId: "test-lurndit",
    storageBucket: "test-lurndit.appspot.com",
    messagingSenderId: "571339658382",
    appId: "1:571339658382:web:6c18a6978988089f41e5df",
    measurementId: "G-Z2K9NQHKSW"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function Auth() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [open, setOpen] = useState(false);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setIsSignedIn(!!user);
        setOpen(false);
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    const signinDialog = (
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Signin/Signup</DialogTitle>
        <DialogContent>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {setOpen(false)}} color="primary">
                Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )

    if (!isSignedIn) {
      return (
        // <div>
        //   <h1>My App</h1>
        //   <p>Please sign-in:</p>
        //   <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        // </div>
        <div>
          {signinDialog}
          <Button onClick={() => setOpen(true)}>Signin/Signup</Button>
        </div>
      );
    }
    return (
      <div>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
      </div>
    );
}

export default Auth;