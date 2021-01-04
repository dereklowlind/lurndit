// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {
  Button, Dialog, DialogContent, 
  DialogTitle, DialogActions, 
  } from '@material-ui/core';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function Auth(props) {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [open, setOpen] = useState(false);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setIsSignedIn(!!user);
        setOpen(false);
        if(user){
          props.db.collection('testUserList').doc(user.uid).get().then(function(doc) {
            if (doc.data()!=undefined) {
              if (doc.data().favourites!=undefined) {
                console.log(doc.data().favourites)
                props.setFavList(doc.data().favourites)
              } else {
                props.setFavList([])
              }
            }
          })
        }else{
          props.setFavList([]);
        }
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
          <Button variant="outlined" onClick={() => setOpen(true)}>Sign in/up</Button>
        </div>
      );
    }
    return (
      <div>
        {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}
        <Button variant="outlined" onClick={() => firebase.auth().signOut()}>Sign-out</Button>
      </div>
    );
}

export default Auth;