import React, { useRef, useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import {Button} from '@material-ui/core'
import MainPageTable from '../molecules/MainPageTable'

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

function newList(title){
  db.collection("test1").add({
    datetime: new Date(),
    title: title
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

function Mainpage(){
  const [lists, setLists] = useState([]);

  useEffect(() => {
    db.collection("test1").onSnapshot((dataEntries) => {
      let rows = []
      dataEntries.forEach(doc => {
        const timeStamp = doc.data().datetime.toDate().toString()
        rows.push({
          docId: doc.id,
          timeStamp: timeStamp,
          title: doc.data().title,
        })
      })
      console.log(rows);
      setLists(rows);
    });
  }, []); // run use effect only once

    return(
        <div>
          <Button onClick={() => newList("test")}>New List</Button>
          <MainPageTable lists={lists} />
        </div>
    )
}
export default Mainpage
