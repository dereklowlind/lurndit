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

  const [lists, setLists] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [recentTitle, setRecentTitle] = useState("")
  const [recentId, setRecentId] = useState("")
  const [routeTrigger, setRouteTrigger] = useState(false)

  //on component mount
  useEffect(() => {
    db.collection("test1").onSnapshot((dataEntries) => {
      let rows = []
      dataEntries.forEach(doc => {
        if(doc.data().title == undefined) {
          return
        }
        if(doc.data().title == recentTitle) {
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
      console.log(rows)
    });
  }, [submitSuccess]);

  const triggerRender = () => {
    console.log(routeTrigger)
    setRouteTrigger(!routeTrigger)
  }

  return (
    <div className="App">
      <Helmet>
        <title>Lurndit</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700;800&display=swap" rel="stylesheet"/>
      </Helmet>
      <Router>
        <HeaderBar lists={lists} triggerRender={triggerRender}/>
        <div className="pageContainer">
          <DrawerMenu />
            <Switch>
              <Route path="/course/:id" render={({ match }) => <CoursePage id={match.params.id} db={db} key={window.location.pathname}/>} /> 
              <Route path="/" render={(props) => (<Mainpage db={db} lists={lists} submitSuccess={submitSuccess} setSubmitSuccess={setSubmitSuccess} setRecentTitle={setRecentTitle} recentTitle={recentTitle} recentId={recentId}/>)}/>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
