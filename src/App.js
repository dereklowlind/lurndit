import './App.css'
import Mainpage from './pages/Mainpage'
import CoursePage from './pages/CoursePage'
import HeaderBar from './molecules/HeaderBar'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import DrawerMenu from './molecules/DrawerMenu'
import Helmet from 'react-helmet'
import firebase from 'firebase'
import 'firebase/firestore';
import { useEffect, useState } from 'react'
import ReactGA from 'react-ga';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFzMMueZ43a2HvkJMaXCJIG7HZywlSKs0",
  authDomain: "lurndit.firebaseapp.com",
  projectId: "lurndit",
  storageBucket: "lurndit.appspot.com",
  messagingSenderId: "106048239774",
  appId: "1:106048239774:web:5eb22d9b0aca85527ae38f",
  measurementId: "G-1XSHH9YMB8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


function App() {
  ReactGA.initialize('UA-177822253-1')
  ReactGA.pageview(window.location.pathname + window.location.search)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [openSigninDialog, setOpenSigninDialog] = useState(false);
  const [favList, setFavList] = useState([]);
  const [lists, setLists] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [recentTitle, setRecentTitle] = useState("")
  const [recentId, setRecentId] = useState("")
  const [routeTrigger, setRouteTrigger] = useState(false)
  const [courseListLoading, setCourseListLoading] = useState(true)


  //on component mount
  useEffect(() => {
    db.collection("Lists").onSnapshot((dataEntries) => {
      let rows = []
      dataEntries.forEach(doc => {
        if(doc.data().title === undefined) {
          return
        }
        if(doc.data().title === recentTitle) {
          setRecentId(doc.id)
        }
        rows.push({
          docId: doc.id,
          title: doc.data().title,
          subtitle: doc.data().description
        })
      })
      
      rows.sort(function(a, b) {
        return (a.title < b.title) ? -1 : 1
      })
      setLists(rows);
      setCourseListLoading(false)
    });
  }, [submitSuccess]);

  const triggerRender = () => {
    setRouteTrigger(!routeTrigger)
  }

  const updateFavList = (newTopic) => {

  }

  return (
    <div className="App">
      <Helmet>
        <title>Lurndit</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700;800&display=swap" rel="stylesheet"/>
      </Helmet>
      <Router>
        <HeaderBar lists={lists} triggerRender={triggerRender} db={db} setFavList={setFavList}
          isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}
          openSigninDialog={openSigninDialog} setOpenSigninDialog={setOpenSigninDialog}
        />
        <div className="pageContainer">
          <DrawerMenu favList={favList} isSignedIn={isSignedIn} setOpenSigninDialog={setOpenSigninDialog}/>
            <Switch>
              <Route path="/course/:id" render={({ match }) => <CoursePage id={match.params.id} favList={favList} db={db} key={window.location.pathname} setFavList={setFavList} />} /> 
              <Route path="/" render={(props) => (<Mainpage db={db} lists={lists} favList={favList} updateFavList={updateFavList} coursesLoading={courseListLoading} submitSuccess={submitSuccess} setSubmitSuccess={setSubmitSuccess} setRecentTitle={setRecentTitle} recentTitle={recentTitle} recentId={recentId}/>)}/>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
