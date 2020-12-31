import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore';
import {Button, Drawer, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import TopicList from '../molecules/TopicList'
import '../css/coursepage.scss'

const useStyles = makeStyles((theme) => ({
  topicTextArea: {
    width: '400px',
    
  },
  textAreaFont: {
    fontSize: '16pt',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600
  }
}))

function newTopic(db, title, docId){
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

  function newResource(db, docId, topic, title, description, url){
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
  
  function addToFavList(db, courseId, courseTitle){
    // db.collection(`testUserList/${firebase.auth().currentUser.uid}`).doc(favList).update({
    db.collection(`testUserList/${firebase.auth().currentUser.uid}/favList`).update({
      favourites: firebase.firestore.FieldValue.arrayUnion({
        datetime: new Date(),
        courseId: courseId,
        courseTitle: courseTitle
      })
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

function CoursePage(props){
    const db = props.db;
    const [courseTitle, setCoursetitle] = useState("")
    const [courseSubtitle, setCourseSubtitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [topics, setTopics] = useState([]);
    const [topicTitle, setTopicTitle] = useState("");

    const classes = useStyles()

    useEffect(() => {
      console.log("useEffect");
      db.collection('test1').doc(props.id).get().then(function(doc) {
        console.log(doc.data())
        const docData = doc.data()
        setCoursetitle(docData.title)
        if(docData.description) {
          setCourseSubtitle(docData.description)
        }
      })

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

    const getContent = (id) => {
      console.log(id)
    }

    const handleSubmit = e => {
      e.preventDefault();
      newTopic(db, topicTitle, props.id);
      setTopicTitle("");
    }

    return(
        <div className="coursePage">
          <div className="courseHeader">
            <div className="courseTitle">
              {courseTitle}
            </div>
            <div className="courseSubtitle">
              {courseSubtitle}
            </div>
          </div>
          <div className="courseButtons">
            <form onSubmit={handleSubmit} className="courseButtons">
              <TextField 
                placeholder="New Topic" 
                className={classes.topicTextArea} 
                value={topicTitle} 
                InputProps={{
                  classes: {
                    input: classes.textAreaFont
                  }
                }}
                onChange={(e) => setTopicTitle(e.target.value)}/>
              <Button variant="primary" type='submit'>Add Topic</Button>
            </form>
          </div>
          <TopicList db={db} topics={topics} newResource={newResource} docId={props.id} switchTopic={getContent}/>
        </div>
        
    )
}

export default CoursePage
