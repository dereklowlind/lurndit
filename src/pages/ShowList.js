import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore';
import {Button} from '@material-ui/core'
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
    db.collection("test1").doc(docId).collection("topics").add({
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

  function newResource(docId, topic, title, description, url){
    db.collection("test1").doc(docId).collection("topics").doc(topic).collection("resources").add({
      datetime: new Date(),
      title: title,
      description: description,
      url: url
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  

function ShowList(props){
    const [topics, setTopics] = useState([]);
    // useEffect(() => {
    //   db.collection(`test1/${props.id}/topics/*/resources`).onSnapshot((dataEntries) => {
    //     console.log(dataEntries)
    //     console.log("break");
    //     dataEntries.forEach(doc => {console.log(doc.data().url)});
    //   });
    // }, []); // run use effect only once

    // useEffect(() => {
    //   console.log("useEffect");
    //   db.collection("test1").doc(props.id).collection("topics").onSnapshot((dataEntries) => {
    //     console.log("snapshot");
    //       let rows = []
    //     dataEntries.forEach(doc => {
    //       let resources = []
    //       console.log(doc.id)
    //       db.collection("test1").doc(props.id).collection("topics").doc(doc.id).collection("resources").onSnapshot((resourceDocs) => {
    //           console.log("getting resources");
    //           resourceDocs.forEach(doc => {
    //             console.log("found resource");  
    //             resources.push({
    //                   resourceId: doc.id,
    //                   description: doc.data().description,
    //                   title: doc.data().title,
    //                   url: doc.data().url
    //               })
    //           })
    //       }); // db collect resources
    //       const timeStamp = doc.data().datetime.toDate().toString()
    //       rows.push({
    //         docId: doc.id,
    //         timeStamp: timeStamp,
    //         title: doc.data().title,
    //         resources: resources
    //       })
    //     }); // data entries for each
    //     console.log("rows", rows);
    //     setTopics(rows);
    //     console.log(topics);
    //     console.log("topic set");
    //   }); // db collect topics
    // }, []); // run use effect only once

    useEffect(() => {
      console.log("useEffect");
      db.collection("test1").doc(props.id).collection("topics").onSnapshot((dataEntries) => {
        console.log("snapshot");
          let rows = []
        dataEntries.forEach(doc => {
          // let resources = []
          // console.log(doc.id)
          // db.collection("test1").doc(props.id).collection("topics").doc(doc.id).collection("resources").onSnapshot((resourceDocs) => {
          //     console.log("getting resources");
          //     resourceDocs.forEach(doc => {
          //       console.log("found resource");  
          //       resources.push({
          //             resourceId: doc.id,
          //             description: doc.data().description,
          //             title: doc.data().title,
          //             url: doc.data().url
          //         })
          //     })
          // }); // db collect resources
          const timeStamp = doc.data().datetime.toDate().toString()
          rows.push({
            docId: doc.id,
            timeStamp: timeStamp,
            title: doc.data().title,
            resources: []
          })
        }); // data entries for each
        console.log("rows", rows);
        setTopics(rows);
        console.log(topics);
        console.log("topic set");
      }); // db collect topics
    }, []); // run use effect only once

    return(
        <div>
            <div>{props.id}</div>
            <Button onClick={() => newTopic("test topic", props.id)}>New Topic</Button>
            <ShowListTable db={db} topics={topics} newResource={newResource} docId={props.id}/>
        </div>
        
    )
}

export default ShowList
