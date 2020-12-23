import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore';
import {Button, TextField} from '@material-ui/core'
import ShowListTable from '../molecules/ShowListTable'

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

function newTopic(title, docId){
    db.collection(`test1/${docId}/topics`).add({
      datetime: new Date(),
      title: title,
      resources: []
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  function newResource(docId, topic, title, description, url){
    db.collection(`test1/${docId}/topics`).doc(topic).update({
      resources: firebase.firestore.FieldValue.arrayUnion({
        datetime: new Date(),
        title: title,
        description: description,
        url: url
      })
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  

function ShowList(props){
    const [courseTitle, setCourseTitle] = useState("");
    const [topics, setTopics] = useState([]);
    const [topicTitle, setTopicTitle] = useState("");

    useEffect(() => {
      console.log("useEffect");
      db.collection(`test1`).doc(props.id).get().then((doc) => {
        setCourseTitle(doc.data().title);
    }); // db get course title
      
      db.collection(`test1/${props.id}/topics`).onSnapshot((dataEntries) => {
          let rows = []
        dataEntries.forEach(doc => {
          const timeStamp = doc.data().datetime.toDate().toString()
          rows.push({
            docId: doc.id,
            timeStamp: timeStamp,
            title: doc.data().title,
            resources: doc.data().resources
          })
        }); // data entries for each
        setTopics(rows);
      }); // db collect topics
    }, []); // run use effect only once

    const handleSubmit = e => {
      e.preventDefault();
      newTopic(topicTitle, props.id);
      setTopicTitle("");
    }

    return(
        <div>
            <div>{courseTitle}  {props.id}</div>
            <form onSubmit={handleSubmit}>
              <TextField value={topicTitle} onChange={(e) => setTopicTitle(e.target.value)}/>
              <Button type='submit'>Add Topic</Button>
            </form>
            
            <ShowListTable db={db} topics={topics} newResource={newResource} docId={props.id}/>
        </div>
        
    )
}

export default ShowList
