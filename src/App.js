import './App.css'
import Mainpage from './pages/Mainpage'
import CoursePage from './pages/CoursePage'
import HeaderBar from './molecules/HeaderBar'

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import DrawerMenu from './molecules/DrawerMenu'
import Helmet from 'react-helmet'
import firebase from 'firebase'
import 'firebase/firestore';
import { useState } from 'react'

// Initialize Firebase
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

const db = firebase.firestore();


function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Lurndit</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700;800&display=swap" rel="stylesheet"/>
      </Helmet>
      <HeaderBar />
      <div className="pageContainer">
        <Router>
        <DrawerMenu />
          <Switch>
            <Route path="/course/:id" render={({ match }) => <CoursePage id={match.params.id} db={db}/>} /> 
            <Route path="/" render={(props) => (<Mainpage db={db}/>)}/>
          </Switch>
          
        </Router>
      </div>
    </div>
  );
}

export default App;
